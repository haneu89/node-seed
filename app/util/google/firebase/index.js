const firebase = require('firebase')

exports.fireToken = (req, res, next) => {
    firebase.auth().verifyIdToken(idToken).then(decodedToken => {

    }).catch((error) => {
        
    })
}