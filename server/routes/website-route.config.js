const Utilities = require('../controllers/UtilityFileServer')
const Pages = require('../controllers/PageServer')

exports.routeConfig = function (app) {
    app.get('/util/:item', [
        Utilities.GetUtilityFiles
    ])

    app.get('/page/', [
        Pages.GetHome
    ])
    app.get('/page/:page', [
        Pages.GetPage
    ])

    app.get('/page/:dir/:page', [
        Pages.GetPageInADirectory
    ])

    app.get('/page/:dir/:subdir/:page', [
        Pages.GetPageInASubdirectory
    ])
}
