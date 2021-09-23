const ManageUsers = require('../controllers/ManageUsers')
const VerifyUserMiddleware = require('../middlewares/VerifyUser')
const AuthController = require('../controllers/Authorization')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/users', ManageUsers.insert)

    app.post('/awesome-editor/auth', [
        VerifyUserMiddleware.hasValidFields,
        VerifyUserMiddleware.isPasswordUserMatch,
        AuthController.login
    ])
}
