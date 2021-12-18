const UserModel = require('../models/user.model')
const crypto = require('crypto')

exports.hasValidFields = function (req, res, next) {
    let errors = []

    if (req.body) {
        if (!req.body.email) {
            errors.push('Email not provided!')
        }

        if (!req.body.password) {
            errors.push('Password not provided!')
        }

        if (errors.length)
            return res.status(400).send({ msg: errors.join(',') })
        else return next()
    } else {
        return res.status(400).send({ msg: 'Missing email and password fields!' })
    }
}

exports.isPasswordUserMatch = function (req, res, next) {
    UserModel.findUserByEmail(req.body.email,
        (err, users) => {
            if (!err && users.length != 0) {
                let passwordFields = users[0].password.split('$')
                let salt = passwordFields[0]
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')

                if (hash == passwordFields[1]) {
                    req.body = {
                        userId: users[0]._id,
                        email: users[0].email,
                        name: users[0].firstName + ' ' + users[0].lastName,
                        isAdmin: users[0].isAdmin,
                        provider: 'email',
                    }
                    return next()
                } else {
                    return res.status(400).send({ msg: 'Invalid e-mail or password!' })
                }
            } else {
                return res.status(400).send({ msg: 'Couldn\'t find user!' })
            }
        }
    )
}
