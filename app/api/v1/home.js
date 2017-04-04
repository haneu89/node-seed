const express = require('express')
const router = express.Router()
const retMsg = require('./util/return.msg');

router.get('/', function (req, res, next) {
    return retMsg.success200RetObj(res, 'hi')
});

module.exports = router;
