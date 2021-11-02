var db = require('../utils/db')

exports.categories = function (callbackFunc) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find()
        .project({ category: 1 })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.notifications = function (category, callbackFunc, noOfNotifications) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find({ category })
        .project({ _id: 0, notifications: 1 })
        .toArray((err, docs) => {
            callbackFunc(err, docs)
        })
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

exports.addNotification = function (category, uploadDate, expiryDate, newDate, links, details, callbackFunc) {
    let item = {
        details,
        uploadDate,
        newDate,
        expiryDate,
        links
    }

    var notificationCollection = db.get().collection('notifications')
    notificationCollection.findOne(
        { category },
        (err, doc) => {
            if (err)
                return callbackFunc(err, null)
            if (!doc)
                return callbackFunc('Category doesn\'t exist', null)

            if (doc.notifications)
                doc.notifications.push(item)
            else doc.notifications = [item]
            notificationCollection.updateOne(
                { category },
                { $set: { notifications: doc.notifications } },
                (err, res) => callbackFunc(err, res)
            )
        }
    )
}