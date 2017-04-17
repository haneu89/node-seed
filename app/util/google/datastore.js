const datastore = require('@google-cloud/datastore')
const datastoreClient = datastore({
  projectId: 'jinhyung-e0b72',
  keyFilename: 'app/assets/jinhyung-48e604bf053f.json'
});

module.exports.datastoreClient = datastoreClient


exports.saveData = (keyName, paramData) => {
  return new Promise((resolve, reject) => {
    let dataKey = datastoreClient.key(keyName)
    datastoreClient.save({key: dataKey, data: paramData}, err => {
      if(!err) {
        resolve()
      } else {
      }
    })
  })
}

exports.dupCheck = (keyName, key, value) => {
  return new Promise((resolve, reject) => {
    let query = datastoreClient.createQuery(keyName)
    query.filter(key, value)

    datastoreClient.runQuery(query, (err, entity) => {
      if(entity.length < 1) {
        resolve()
      }
    })
  })
}