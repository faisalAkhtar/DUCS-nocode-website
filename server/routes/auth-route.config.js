const VerifyUserMiddleware = require('../middlewares/VerifyUser')
const ValidationMiddleware = require('../middlewares/Validation')
const UserController = require('../controllers/ManageUsers')
const AuthController = require('../controllers/Authorization')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/users', [
        UserController.insert
    ])

    app.post('/awesome-editor/auth', [
        VerifyUserMiddleware.hasValidFields,
        VerifyUserMiddleware.isPasswordUserMatch,
        AuthController.login
    ])

    app.post('/awesome-editor/auth/refresh', [
        ValidationMiddleware.validateJWT,
        ValidationMiddleware.validRefreshNeeded,
        AuthController.login
    ])
}
