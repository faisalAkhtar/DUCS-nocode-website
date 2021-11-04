var db = require('../utils/db')

exports.notifications = function (category, callbackFunc, noOfNotifications) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find({ category })
        .project({ _id: 0, notifications: 1 })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.addNotification = function (id, category, uploadDate, expiryDate, newDate, links, details, callbackFunc) {
    let item = {
        id,
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

exports.updateNotification = function (id, category, uploadDate, expiryDate, newDate, links, details, callbackFunc) {
    let item = {
        id,
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

            let temp = [...doc.notifications]
            let ind = temp.findIndex(not => not.id === id)
            if (ind < 0)
                return callbackFunc('Invalid notification ID', null)
            temp[ind] = item
            if (temp[ind] === doc.notifications[ind])
                return callbackFunc('Same values', null)
            doc.notifications = temp

            notificationCollection.updateOne(
                { category },
                { $set: { notifications: doc.notifications } },
                (err, res) => callbackFunc(err, res)
            )
        }
    )
}

exports.removeNotification = function (id, category, callbackFunc) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection.findOne(
        { category },
        (err, doc) => {
            if (err)
                return callbackFunc(err, null)
            if (!doc)
                return callbackFunc('Category doesn\'t exist', null)

            let temp = doc.notifications
            temp = temp.filter(item => item.id !== id)
            if (doc.notifications.length === temp.length)
                callbackFunc('Notification doesn\'t exist', null)
            else doc.notifications = temp

            notificationCollection.updateOne(
                { category },
                { $set: { notifications: doc.notifications } },
                (err, res) => callbackFunc(err, res)
            )
        }
    )
}