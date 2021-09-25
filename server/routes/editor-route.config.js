const UserController = require('../controllers/ManageUsers')
const AuthController = require('../controllers/Authorization')
const FilesystemController = require('../controllers/FileSystem')
const VerifyUserMiddleware = require('../middlewares/VerifyUser')
const ValidationMiddleware = require('../middlewares/Validation')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/users', UserController.insert)

    app.post('/awesome-editor/auth', [
        VerifyUserMiddleware.hasValidFields,
        VerifyUserMiddleware.isPasswordUserMatch,
        AuthController.login
    ])

    app.get('/awesome-editor/filesystem', [
        ValidationMiddleware.validateJWT,
        FilesystemController.GetFilesystem
    ])
}
