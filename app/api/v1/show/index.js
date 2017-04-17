const express = require('express')
const router = express.Router()

const showController = require('./show.controller')

router.get('/', showController.getList)

module.exports = router