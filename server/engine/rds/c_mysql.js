'use strict';

/***
 * 
 Pool을 사요하도록 하는 이유 : 
Mysql DB서버에 Connection을 맺고
계속 쿼리를 날렸었는데 , 오랫동안 서버가 켜져 있다 보니까
Connection이 끊어지면서 서버가 다운되는 현상이 있었습니다.

그래서 사전에 일정량의 Connection 객체를 만들어 모아두고,
사용이 끝난 Connection 객체를 나중에 다시 재사용 가능하도록 하는 Connection Pool을 이용해
속도도 향상시키고 서버가 다운되지도 않도록 해보았습니다.  

*/

class rds_Interface {
    /**
     *
     * @param {*} _args // [0]  Databases 연결
     */
    constructor(_dsn) {
        this._d = undefined; // 각 DB Driver가 접속하여 생성된 개체
        this._dsn = _dsn || undefined;
    }

    is_d() {
        if (this._d == undefined) {
            return false;
        }

        return true;
    }

    destroy() {
        return false;
    }
    init() {
        return false;
    }
    close() {
        return false;
    }

    //select 문
    row(_sql, _values, _callback) {
        return false;
    }
    rows(_sql, _values, _callback) {
        return false;
    }

    // update , insert 문 실행 할때
    execute(_sql, _values, _callback) {
        return false;
    }
}

class c_mysql extends rds_Interface {
    constructor(..._args) {
        super(_args[0] || undefined);

        //mysql의 경우 createConnection를 진행 하여도 실 DB에는 접속하지 않기 때문에,
        //클래스 생성시 실행해 둠.
        this.init();
    }

    destroy() {
        this.close();
    }

    init() {
        if (this._dsn == undefined) {
            return true;
        }

        var mysql = require('mysql');

        this._d = mysql.createPool({
            connectionLimit: 100, //important
            host: this._dsn.host,
            user: this._dsn.user,
            password: this._dsn.password,
            port: this._dsn.port,
            database: this._dsn.database,
        });

        if (this._d == undefined) {
            return false;
        }

        return true;
    }

    close() {
        if (this._d) {
            this._d.end();
        }
    }

    row(_sql, _values, _callback) {
        if (this.is_d() == false) {
            return null;
        }

        this._d.getConnection(function(err, conn) {
            if (err) {
                conn.release();
                return _callback(true, err);
            }

            conn.query(_sql, _values, function(err, rows) {
                conn.release();

                if (err) {
                    return _callback(true, err);
                }

                if (rows.length != 1) {
                    return _callback(true, []);
                }

                return _callback(err, rows[0]);
            });
        });
    }

    rows(_sql, _values, _callback) {
        if (this.is_d() == false) {
            return null;
        }

        this._d.getConnection(function(err, conn) {
            if (err) {
                conn.release();
                return _callback(true, err);
            }

            conn.query(_sql, _values, function(err, rows) {
                conn.release();

                if (err) {
                    return _callback(true, err);
                }

                return _callback(err, rows);
            });
        });
    }

    execute(_sql, _values, _callback) {
        if (this.is_d() == false) {
            return null;
        }

        this._d.getConnection(function(err, conn) {
            if (err) {
                conn.release(); //해제 하지 않는다면, 쿼리가 끝났다고 하더라도 connection은 계속 살아 있을 것이고,
                // 머지 않아 빠르게 connection이 full 나는 상황이 오게 될 겁니다.
                return _callback(true, err);
            }

            conn.query(_sql, _values, function(err, rows) {
                conn.release();

                if (err) {
                    return _callback(true, err);
                }

                return _callback(err, rows);
            });
        });
    }
}

module.exports = c_mysql;
