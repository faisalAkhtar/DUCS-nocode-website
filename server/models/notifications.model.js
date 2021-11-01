var db = require('../utils/db')

exports.categories = function (callbackFunc) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find()
        .project({ category: 1 })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.notifications = function (categoryOfNotifications, callbackFunc, noOfNotifications) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find({ category: categoryOfNotifications })
        .project({ _id: 0, notifications: 1 })
        .toArray((err, docs) => {
            callbackFunc(err, docs)
        })
}
