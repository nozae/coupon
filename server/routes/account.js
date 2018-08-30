var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* GET users listing. */
router.get('/getsession', (req, res) => {
    const sessionData = model.user.session.get(req);
    if (is_empty(sessionData)) {
        return res.json({
            logged: false,
            isErr: true,
            msg: '세션데이터가 없습니다.',
            data: null,
        });
    }

    return res.json({
        logged: true,
        isErr: false,
        msg: '세션데이터가 존재합니다.',
        data: sessionData,
    });
});

/* GET users listing. */
router.post('/signin', (req, res) => {
    if (!req.body.email) {
        return res.json({
            logged: false,
            isErr: true,
            msg: '아이디(이메일)를 입력하세요.',
            data: null,
        });
    }

    if (!req.body.password) {
        return res.json({
            logged: false,
            isErr: true,
            msg: '패스워드를 입력하세요.',
            data: null,
        });
    }

    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    const query = [{ key: 'email', value: reqEmail }];

    model.user.user.get(query, (err, r) => {
        if (err) {
            return res.json({
                logged: false,
                isErr: true,
                msg: '계정정보를 찾을 수 없습니다.',
                data: null,
            });
        }

        if (r.pw != reqPassword) {
            return res.json({
                logged: false,
                isErr: true,
                msg: '비밀번호를 확인하세요.',
                data: null,
            });
        }

        var u_session = model.user.session.get_info();
        u_session.userId = r.userId;
        u_session.userType = r.userType;
        u_session.email = r.email;
        u_session.name = r.name;
        u_session.barcode = r.barcode;

        // 사용자 회원일 경우
        if (r.userType === 0) {
            model.user.session.set(req, u_session, () => {
                return res.json({
                    logged: true,
                    isErr: false,
                    msg: '로그인 성공',
                    data: u_session,
                });
            });
        } else if (r.userType === 1) {
            const query = [{ key: 'userId', value: r.userId }];
            model.store.store.get(query, (err, r) => {
                u_session.storeInfo = r;

                model.user.session.set(req, u_session, () => {
                    return res.json({
                        logged: true,
                        isErr: false,
                        msg: '로그인 성공',
                        data: u_session,
                    });
                });
            });
        }
    });
});

router.post('/signup', (req, res) => {
    res.json({ success: true });
});

router.post('/logout', (req, res) => {
    engine.session.del(req, () => {
        return res.json({
            logged: false,
            isErr: false,
            msg: '로그아웃 성공',
            data: null,
        });
    });
});

module.exports = router;
