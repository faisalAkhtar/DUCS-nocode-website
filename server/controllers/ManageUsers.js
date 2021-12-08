const UserModel = require('../models/user.model')
const crypto = require('crypto')

exports.insert = function (req, res, next) {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    req.body.password = salt + "$" + hash
    req.body.permissionLevel = 1

    UserModel.createUser(req.body,
        (err, result) => {
            if (err)
                return res.status(500).json({ "msg": err })

            if (!result.acknowledged)
                return res.status(500).json({ "msg": "Couldn't create new user, pta ni qq 🤷‍♂" })

            return res.status(201).json({ id: result.insertedId })
        }
    )
}

exports.fetchSelf = function (req, res, next) {
    UserModel.getCurrentUser(req.jwt.userId,
        (err, result) => {
            if (err)
                return res.status(500).json({ msg: err })
            return res.status(200).send(result)
        }
    )
}

exports.updateSelf = function (req, res, next) {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    req.body.password = salt + "$" + hash

    let change = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    UserModel.updateUser(req.jwt.userId, change,
        (err, result) => {
            if (err)
                return res.status(500).json({ "msg": err })

            if (result.modifiedCount === 0)
                return res.status(500).json({ "msg": "Couldn't update user, pta ni qq 🤷‍♂" })

            return res.status(200).send()
        }
    )
}

exports.fetchAll = function (req, res, next) {
    UserModel.getAllUsers(
        (err, result) => {
            if (err)
                return res.status(500).json({ msg: err })

            return res.status(200).send(result)
        }
    )
}

exports.deleteOne = function (req, res, next) {
    let uid = req.params.uid

    if (uid.trim() === "")
        return res.status(400).json({ msg: "Provide a valid ID" })
    if (uid === req.jwt.userId)
        return res.status(400).json({ msg: "Cannot delete self" })

    UserModel.deleteUser(
        uid,
        (err, result) => {
            if (err)
                return res.status(500).json({ msg: err })

            if (result.deletedCount === 0)
                return res.status(404).json({ "msg": "User doesn't exist" })

            return res.status(200).send(result)
        }
    )
}

exports.updateOne = function (req, res, next) {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    req.body.password = salt + "$" + hash
    let uid = req.body.id
    delete req.body.id

    UserModel.updateUser(uid, req.body,
        (err, result) => {
            if (err)
                return res.status(500).json({ "msg": err })

            if (result.modifiedCount === 0)
                return res.status(500).json({ "msg": "Couldn't update user, pta ni qq 🤷‍♂" })

            return res.status(200).send()
        }
    )
}