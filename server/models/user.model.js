var db = require('../utils/db')

exports.createUser = function ({ firstName, lastName, email, password, permissionLevel }, callbackFunc) {
    var userCollection = db.get().collection('users')

    var user = {
        firstName,
        lastName,
        email,
        password,
        permissionLevel
    }

    userCollection.insertOne(user, (err, response) => callbackFunc(err, response))
}
