'use strict';

/**
 * cookie-session 은 사용지 않음.  
 * memory: 기본설정 컴퓨터 메모리에 저장 .js 파일이 종료 하게 되면, 해당 값은 삭제 되기 때문에 유지성 면에서 좋지 않음.
 * session-file-store : 별도의 파일을 두어 관리
 * express-mysql-session : mysql 서버에 session 테이블을 생성해서 관리. 
 * connect-mongo : 망고 db mysql과 유사 db만 다름 [ 테스트 x ]
 * connect-redis : redis 서버가 있다면 가장 추천 하는 방식  [ 테스트 x ]
 * 
    xpress-session (bundled with express, uses MemoryStore)
    connect-redis https://github.com/visionmedia/connect-redis
    connect-mongodb https://github.com/masylum/connect-mongodb
    connect-couchdb https://github.com/tdebarochez/connect-couchdb
    connect-memcached https://github.com/balor/connect-memcached
    nstore-session https://github.com/creationix/nstore-session
    cookie-sessions (stores sessions in client-side cookies) https://github.com/caolan/cookie-sessions    
 */

var session = require('express-session');

var m_Session = {
    init(_app, _session) {
        if (!(_session in config.session)) {
            return false;
        }

        var info = config.session[_session];

        var cookie = {
            maxAge: 1000 * 60 * 60 * 12, // 쿠키 유효기간 12시간
        };

        if (info['driver'] == 'mysql') {
            var MySQLStore = require('express-mysql-session')(session);
            _app.use(
                session({
                    secret: info['secret'],
                    resave: info['resave'],
                    saveUninitialized: info['saveUninitialized'],
                    store: new MySQLStore({
                        host: info['host'],
                        port: info['port'],
                        user: info['user'],
                        password: info['password'],
                        database: info['database'],

                        clearExpired: true, // 만료 된 세션을 자동으로 확인하고 지울 것인지 여부 :
                        checkExpirationInterval: 600000, // 만료 된 세션이 삭제되는 빈도. 밀리 초
                        expiration: 86400000, // 유효한 세션의 최대 수명. 밀리 초 :
                        createDatabaseTable: true, // 세션 데이터베이스 테이블을 생성할지 여부 (없는 경우) :
                        connectionLimit: 1, // 연결 풀 생성시 연결 수
                    }),
                    cookie: cookie,
                })
            );
        } else if (info['driver'] == 'mongo') {
            var MongoStore = require('connect-mongo')(session);
            _app.use(
                session({
                    secret: info['secret'],
                    resave: info['resave'],
                    saveUninitialized: info['saveUninitialized'],
                    store: new MongoStore({
                        url: 'mongodb://localhost:27017/MyDb',
                        ttl: 60 * 60 * 24 * 7, // 7 days (default: 14days)
                        autoRemove: 'interval', //'disabled'
                        autoRemoveInterval: 10, // In minutes. Default
                    }),
                    cookie: cookie,
                })
            );
        } else if (info['driver'] == 'file') {
            var FileStore = require('session-file-store')(session);
            _app.use(
                session({
                    secret: info['secret'],
                    resave: info['resave'],
                    saveUninitialized: info['saveUninitialized'],
                    store: new FileStore(),
                    cookie: cookie,
                })
            );
        }
        // redis는 서버가 없기 때문에테스트 진행 하지 않음!! 사용시 확인
        else if (info['redis'] == 'redis') {
            var RedisStore = require('connect-redis')(session);
            _app.use(
                session({
                    secret: info['secret'],
                    resave: info['resave'],
                    saveUninitialized: info['saveUninitialized'],
                    store: new RedisStore({
                        host: info['host'],
                        port: info['port'],
                        logErrors: true,
                    }),
                    cookie: cookie,
                })
            );
        } else {
            _app.use(
                session({
                    secret: info['secret'], // session id 보안 아무 값이나 넣어도 된다.
                    resave: info['resave'], //session Id를 접속할 때마다 새로 발급을 하지 말라
                    saveUninitialized: info['saveUninitialized'], //session을 사용하기 전까지는 발급을 하지 말라
                    cookie: cookie,
                })
            );
        }
    },

    get(_req, _division, _key) {
        if (_req.session === undefined) {
            return {};
        }

        if (!(_division in _req.session)) {
            return {};
        }

        var division = _req.session[_division];

        if (_key != undefined) {
            return _key in division ? division[_key] : {};
        }

        return division;
    },

    set(_req, _division, _json, _callback) {
        if (_req.session === undefined) {
            return false;
        }

        if (is_empty(_json)) {
            return false;
        }

        _req.session[_division] = _json;
        _req.session.save(function() {
            if (_callback) {
                _callback();
            }
        });

        // var hour = 3600000
        // _req.session.cookie.expires = new Date(Date.now() + hour)
        // _req.session.cookie.maxAge = hour
    },

    del(_req, _callback) {
        if (_req.session === undefined) {
            return false;
        }

        _req.session.destroy(function(err) {
            if (err) throw err;
            if (_callback) {
                _callback();
            }
        });
    },

    reload(_req) {
        if (_req.session === undefined) {
            return false;
        }

        _req.session.reload(function(err) {
            // session updated
        });
    },
};

module.exports = m_Session;
