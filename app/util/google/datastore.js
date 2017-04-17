const datastore = require('@google-cloud/datastore')
const datastoreClient = datastore({
  projectId: 'jinhyung-e0b72',
  keyFilename: 'app/assets/jinhyung-48e604bf053f.json'
});

const NUM_RESULTS_PER_PAGE = 15;

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

exports.listData = (keyName, page) => {
  let query = datastoreClient.createQuery(keyName).select('title')
  // .limit(NUM_RESULTS_PER_PAGE)

  console.log('aa')

  // if(page) { query.start(page)}
  console.log('bb')
  datastoreClient.runQuery(query, (err, entity, info) => {
    console.log('bba')
      if(err) {
        console.log('cc')
        return
        
      }
      console.log('dd')
      var fontEndResponse = {
        contacts: entity
      }
      console.log('ee')

      if (info.moreResults !== datastoreClient.NO_MORE_RESULTS) {
        frontEndResponse.nextPageCursor = info.endCursor
      }
      console.log('ff')

      console.log(fontEndResponse)
      
  })
}