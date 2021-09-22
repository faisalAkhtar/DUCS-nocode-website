var db = require('./db')

exports.list = function (categoryOfNotifications, callbackFunc, noOfNotifications) {
    var notificationCollection = db.get().collection('notifications')
    notificationCollection
        .find({ category: categoryOfNotifications })
        .toArray((err, docs) => callbackFunc(err, docs))
}
