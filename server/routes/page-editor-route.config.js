const FileEditorController = require('../controllers/FileEditor')
const FilesystemMiddleware = require('../middlewares/FileSystem')
const ValidationMiddleware = require('../middlewares/Validation')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/file-editor', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.ExistsAndPermitted,
        FileEditorController.GetFileContents
    ])

    app.put('/awesome-editor/file-editor', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.ExistsAndPermitted,
        FileEditorController.UpdateFileContents
    ])
}