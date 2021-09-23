const ManageUsers = require('../controllers/ManageUsers')

exports.routeConfig = function (app) {
    app.post('/awesome-editor/users', ManageUsers.insert)
}