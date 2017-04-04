const express = require('express')
const bodyParser = require('body-parser')
const home = require('./api/v1/home')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', home)

module.exports = app;