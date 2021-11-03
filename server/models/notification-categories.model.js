var mongo = require('mongodb')
var db = require('../utils/db')

exports.categories = function (callbackFunc) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find()
        .project({ category: 1 })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.addCategory = function (category, callbackFunc) {
    let item = { category }

    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find({ category })
        .toArray((err, docs) => {
            if (err)
                return callbackFunc(err, null)
            if (docs.length !== 0)
                return callbackFunc("Category already exists", null)

            notificationCollection.insertOne(
                item,
                (err, res) => callbackFunc(err, res)
            )
        })
}

exports.removeCategory = function (id, callbackFunc) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection.deleteOne(
        { _id: new mongo.ObjectId(id) },
        (err, result) => {
            if (err)
                return callbackFunc(err, null)
            callbackFunc(err, result)
        }
    )
}