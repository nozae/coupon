/***
 * RDS : Relational Database Service
 *   - 설정된 환경에 따라, 그에 맞는 DataBase 연결 을 진행 한다.
 *
 ***/

'use strict';
var rds = {
    vars: {
        d: undefined,
        d_driver: undefined,

        dsn: undefined,
        dsn_key: undefined,
    },

    dsn_get(_dsn) {
        if (this.vars.dsn && this.vars.dsn_key == _dsn) {
            return true;
        }

        if (!(_dsn in config.dsn)) {
            return false;
        }

        this.rds_close();

        this.vars.dsn_key = _dsn;
        this.vars.dsn = config.dsn[_dsn];

        return true;
    },

    rds_close() {
        if (this.vars.d) {
            this.vars.d.destroy();
        }

        this.vars.d_driver = undefined;
        this.vars.d = undefined;
    },

    rds_init(_dsn) {
        if (this.vars.d && this.vars.d_driver == _dsn['driver']) {
            return true;
        }

        // 이전에 생성된 Drivier와 호출되는 drivier가 다른 경우 기존 driver를 종료 한다.
        this.rds_close();

        var d = undefined;

        if (_dsn['driver'] == 'mysql') {
            d = require('./c_mysql');
        }

        if (d == undefined) {
            return false;
        }

        this.vars.d_driver = _dsn['driver'];
        this.vars.d = new d(_dsn);

        return true;
    },

    row(_sql, _values, _dsn, _callback) {
        // database 접속 정보를 가져옴.
        if (this.dsn_get(_dsn) == false) {
            return -1;
        }

        // 접속정보에 해당하는 DB사용환경 구축
        if (this.rds_init(this.vars.dsn) == false) {
            return -2;
        }

        return this.vars.d.row(_sql, _values, _callback);
    },

    rows(_sql, _values, _dsn, _callback) {
        // database 접속 정보를 가져옴.
        if (this.dsn_get(_dsn) == false) {
            return -1;
        }

        // 접속정보에 해당하는 DB사용환경 구축
        if (this.rds_init(this.vars.dsn) == false) {
            return -2;
        }

        return this.vars.d.rows(_sql, _values, _callback);
    },

    execute(_sql, _values, _dsn, _callback) {
        // database 접속 정보를 가져옴.
        if (this.dsn_get(_dsn) == false) {
            return -1;
        }

        // 접속정보에 해당하는 DB사용환경 구축
        if (this.rds_init(this.vars.dsn) == false) {
            return -2;
        }

        return this.vars.d.execute(_sql, _values, _callback);
    },
};

module.exports = rds;
