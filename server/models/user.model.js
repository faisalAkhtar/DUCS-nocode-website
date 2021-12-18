var db = require('../utils/db')
var mongo = require('mongodb')

exports.createUser = function ({ firstName, lastName, email, password }, callbackFunc) {
    var userCollection = db.get().collection('users')

    var user = {
        firstName,
        lastName,
        email,
        password,
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

    userCollection
        .findOne(
            { _id: new mongo.ObjectId(uid) },
            (err, doc) => {
                if (err)
                    return callbackFunc(err, null)
                if (!doc)
                    return callbackFunc('Category doesn\'t exist', null)
                doc['uid'] = doc._id
                if (doc.isAdmin)
                    doc['role'] = 'admin'
                else doc['role'] = 'editor'
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
            let admInd = -1
            docs.forEach((user, ind) => {
                if (user.isAdmin) {
                    admInd = ind
                } else {
                    user['uid'] = user._id
                    delete user._id
                    delete user.isAdmin
                    delete user.password
                }
            })
            docs.splice(admInd, 1)
            return callbackFunc(err, docs)
        })
}

exports.deleteUser = function (uid, callbackFunc) {
    var userCollection = db.get().collection('users')

    userCollection
        .deleteOne(
            { _id: new mongo.ObjectId(uid) },
            (err, result) => callbackFunc(err, result)
        )
}

exports.updateUser = function (uid, { firstName, lastName, email }, callbackFunc) {
    var userCollection = db.get().collection('users')

    userCollection
        .updateOne(
            { _id: new mongo.ObjectId(uid) },
            { $set: { firstName, lastName, email } },
            (err, result) => callbackFunc(err, result)
        )
}

exports.updateUserPass = function (uid, password, callbackFunc) {
    var userCollection = db.get().collection('users')

    userCollection
        .updateOne(
            { _id: new mongo.ObjectId(uid) },
            { $set: { password } },
            (err, result) => callbackFunc(err, result)
        )
}