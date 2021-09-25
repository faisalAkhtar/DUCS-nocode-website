var db = require('../utils/db')

exports.list = function (callbackFunc) {
    var filesystemCollection = db.get().collection('filesystem')
    filesystemCollection
        .find()
        .toArray((err, docs) => callbackFunc(err, docs))
}
