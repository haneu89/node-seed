const test = require('../../../util/google')

exports.getList = (req, res) => {
    test.datastoreClient.listData('artbava', 1)
    res.send('aa')
}