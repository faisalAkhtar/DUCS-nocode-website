const UserController = require('../controllers/ManageUsers')
const AuthController = require('../controllers/Authorization')
const FilesystemController = require('../controllers/FileSystem')
const FilesystemMiddleware = require('../middlewares/FileSystem')
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

    app.post('/awesome-editor/filesystem', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FilesystemController.AddItemToDB,
        FilesystemController.AddItemToServer
    ])

    app.delete('/awesome-editor/filesystem', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FilesystemController.RemoveItemFromDB,
        FilesystemController.RemoveItemFromServer
    ])

    app.patch('/awesome-editor/filesystem', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FilesystemController.ChangeItemFieldsInDatabase,
        FilesystemController.ChangeItemFieldsInServer
    ])

    app.patch('/awesome-editor/filesystem/order', [
        ValidationMiddleware.validateJWT,
        FilesystemController.ChangeItemOrder
    ])
}
