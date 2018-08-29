const express = require('express');
const router = express.Router();

// 계정 인증
const account = require('./account');
router.use('/account', account);

// store
const store = require('./store');
router.use('/store', store);

module.exports = router;
