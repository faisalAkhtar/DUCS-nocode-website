var db = require('../utils/db')
var mongo = require('mongodb')

exports.createUser = function ({ firstName, lastName, email, password, permissionLevel }, callbackFunc) {
    var userCollection = db.get().collection('users')

    var user = {
        firstName,
        lastName,
        email,
        password,
        permissionLevel,
        isAdmin: false
    }

    userCollection.insertOne(user, (err, response) => callbackFunc(err, response))
}

exports.findUserByEmail = function (email, callbackFunc) {
    var userCollection = db.get().collection('users')

    userCollection
        .find({ email: email })
        .toArray((err, docs) => callbackFunc(err, docs))
}

exports.getCurrentUser = function (uid, callbackFunc) {
    var userCollection = db.get().collection('users')
    var id = new mongo.ObjectId(uid)

    userCollection
        .findOne({ '_id': id },
            (err, doc) => {
                if (err)
                    return callbackFunc(err, null)
                if (!doc)
                    return callbackFunc('Category doesn\'t exist', null)
                doc['uid'] = doc._id
                if (user.isAdmin)
                    user['role'] = 'admin'
                else user['role'] = 'editor'
                delete doc._id
                delete doc.isAdmin
                delete doc.password
                return callbackFunc(err, doc)
            }
        )
}

exports.getAllUsers = function (callbackFunc) {
    var userCollection = db.get().collection('users')

    userCollection
        .find()
        .toArray((err, docs) => {
            if (err) return callbackFunc(err, null)
            docs.forEach(user => {
                user['uid'] = user._id
                if (user.isAdmin)
                    user['role'] = 'admin'
                else user['role'] = 'editor'
                delete user._id
                delete user.isAdmin
                delete user.password
            })
            return callbackFunc(err, docs)
        })
}
