const UserModel = require('../models/user.model')
const crypto = require('crypto')

exports.insert = function (req, res, next) {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    req.body.password = salt + "$" + hash
    req.body.permissionLevel = 1

    UserModel.createUser(req.body,
        (err, response) => {
            if (err)
                return res.status(500).json({ "msg": err })

            if (!response.acknowledged)
                return res.status(500).json({ "msg": "Couldn't create new user, pta ni qq 🤷‍♂" })

            return res.status(201).send({ id: response.insertedId })
        }
    )
}