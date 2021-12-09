const ValidationMiddleware = require('../middlewares/Validation')
const FilesystemMiddleware = require('../middlewares/FileSystem')
const FilesystemController = require('../controllers/FileSystem')

exports.routeConfig = function (app) {
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

    app.get('/awesome-editor/filesystem/permissions', [
        ValidationMiddleware.validateJWT,
        FilesystemController.GetCurrentUsersPermissions
    ])

    app.get('/awesome-editor/filesystem/permissions/:uid', [
        ValidationMiddleware.validateJWT,
        ValidationMiddleware.adminOnly,
        FilesystemController.GetUsersPermissions
    ])
}
