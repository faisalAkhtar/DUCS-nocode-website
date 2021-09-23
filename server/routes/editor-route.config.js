const ManageUsers = require('../controllers/ManageUsers')
const VerifyUserMiddleware = require('../middlewares/VerifyUser')
const AuthController = require('../controllers/Authorization')
const ValidationMiddleware = require('../middlewares/Validation')
const Temp = require('../controllers/Temporary')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/users', ManageUsers.insert)

    app.post('/awesome-editor/auth', [
        VerifyUserMiddleware.hasValidFields,
        VerifyUserMiddleware.isPasswordUserMatch,
        AuthController.login
    ])

    app.get('/awesome-editor', [
        ValidationMiddleware.validateJWT,
        Temp.test
    ])
}
