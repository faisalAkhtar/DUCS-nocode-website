const NotificationController = require('../controllers/NotificationServer')

exports.routeConfig = function (app) {
    app.get('/api/categories', [
        NotificationController.GetCategories
    ])

    app.get('/api/notifications/:category', [
        NotificationController.GetNotifications
    ])
}
