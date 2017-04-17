const schedule = require('node-schedule')

const googleCloud = require('../util/google')
const slack = require('../util/slack')
const arthub = require('./arthub')
const artbava = require('./artbava')

const datastore = googleCloud.datastoreClient


exports.scrapper = (interval) => {
    if (interval == null) {
        interval = '*/10 * * * *'
    }
    schedule.scheduleJob(interval, arthubScrapper)
    schedule.scheduleJob(interval, artbavaScarpper)

    artbavaScarpper()
    arthubScrapper()
}

function arthubScrapper() {

    arthub.arthub(title => datastore.dupCheck('arthub', 'title', title), (show) => {
        datastore.saveData('arthub', show)
        .then(() => slack.sendMessage(`arthub 전시추가 : ${show[0].value}`))
    })
}
function artbavaScarpper() {

    artbava.artbava(title => datastore.dupCheck('artbava', 'title', title), (show) => {
        datastore.saveData('artbava', show)
        .then(() => slack.sendMessage(`artbava 전시추가 : ${show[0].value}`))
    })
}