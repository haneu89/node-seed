const express = require('express')
const bodyParser = require('body-parser')
const home = require('./api/v1/home')
const show = require('./api/v1/show')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', home)
app.use('/show', show)

module.exports = app;