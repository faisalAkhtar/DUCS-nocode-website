const ValidationMiddleware = require('../middlewares/Validation')
const NotificationModifierMiddleware = require('../middlewares/Notification')
const NotificationModifierController = require('../controllers/NotificationModifier')

exports.routeConfig = function (app) {
    app.post('/notifications/category', [
        ValidationMiddleware.validateJWT,
        NotificationModifierController.AddCategory
    ])

    app.delete('/notifications/category/:id', [
        ValidationMiddleware.validateJWT,
        NotificationModifierController.RemoveCategory
    ])

    app.post('/notifications/notification', [
        ValidationMiddleware.validateJWT,
        NotificationModifierMiddleware.ValidateAddNotificationBody,
        NotificationModifierController.AddNotification
    ])

    app.delete('/notifications/notification', [
        ValidationMiddleware.validateJWT,
        NotificationModifierController.RemoveNotification
    ])
}
