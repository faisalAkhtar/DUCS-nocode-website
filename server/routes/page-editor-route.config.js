const FileEditorController = require('../controllers/FileEditor')
const FilesystemMiddleware = require('../middlewares/FileSystem')
const ValidationMiddleware = require('../middlewares/Validation')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/file-editor', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FileEditorController.GetFileContents
    ])

    app.put('/awesome-editor/file-editor', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FileEditorController.UpdateFileContents
    ])
}