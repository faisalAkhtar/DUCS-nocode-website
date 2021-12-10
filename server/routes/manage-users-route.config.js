const ValidationMiddleware = require('../middlewares/Validation')
const FilesystemMiddleware = require('../middlewares/FileSystem')
const UserController = require('../controllers/ManageUsers')

exports.routeConfig = function (app) {
    app.get('/user', [
        ValidationMiddleware.validateJWT,
        UserController.fetchSelf
    ])

    app.put('/user', [
        ValidationMiddleware.validateJWT,
        UserController.updateSelf
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

    app.delete('/users/:uid', [
        ValidationMiddleware.validateJWT,
        ValidationMiddleware.adminOnly,
        FilesystemMiddleware.DeleteUsersPermissions,
        UserController.deleteOne
    ])

    app.put('/users', [
        ValidationMiddleware.validateJWT,
        ValidationMiddleware.adminOnly,
        UserController.updateOne
    ])
}
