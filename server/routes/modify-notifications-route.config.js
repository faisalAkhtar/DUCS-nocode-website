const ValidationMiddleware = require('../middlewares/Validation')
const NotificationModifierController = require('../controllers/NotificationModifier')

exports.routeConfig = function (app) {
    app.post('/notifications/category', [
        ValidationMiddleware.validateJWT,
        NotificationModifierController.AddCategory
    ])

    app.post('/notifications/notification', [
        ValidationMiddleware.validateJWT,
        NotificationModifierController.AddNotification
    ])
}
