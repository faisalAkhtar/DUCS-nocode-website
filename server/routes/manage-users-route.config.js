const ValidationMiddleware = require('../middlewares/Validation')
const UserController = require('../controllers/ManageUsers')

exports.routeConfig = function (app) {
    app.get('/user', [
        ValidationMiddleware.validateJWT,
        UserController.fetchSelf
    ])

    app.get('/users', [
        ValidationMiddleware.validateJWT,
        ValidationMiddleware.adminOnly,
        UserController.fetchAll
    ])

    app.post('/users', [
        ValidationMiddleware.validateJWT,
        ValidationMiddleware.adminOnly,
        UserController.insert
    ])
}
