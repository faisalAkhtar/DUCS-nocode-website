const Utilities = require('./website-servers/UtilityFileServer')
const Pages = require('./website-servers/PageServer')
const Notifications = require('./website-servers/NotificationServer')

exports.routeConfig = function (app) {
    app.get('/util/:item', Utilities.GetUtilityFiles)

    app.get('/page/', Pages.GetHome)
    app.get('/page/:page', Pages.GetPage)
    app.get('/page/:dir/:page', Pages.GetPageInADirectory)
    app.get('/page/:dir/:subdir/:page', Pages.GetPageInASubdirectory)

    app.get('/notification/:category', Notifications.GetNotifications)
}
