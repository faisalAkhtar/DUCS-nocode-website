const FileEditorController = require('../controllers/FileEditor')
const FilesystemMiddleware = require('../middlewares/FileSystem')
const ValidationMiddleware = require('../middlewares/Validation')

exports.routeConfig = function (app) {
    app.get('/awesome-editor/file-editor', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FileEditorController.GetFileContents
    ])

    app.post('/awesome-editor/file-editor', [
        ValidationMiddleware.validateJWT,
        FilesystemMiddleware.CheckIfItemExists,
        FileEditorController.UpdateFileContents
    ])
}