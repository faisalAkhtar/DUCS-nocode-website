require('dotenv').config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
const jwtExpiry = process.env.JWTEXPIRATIONINSECONDS

exports.login = function (req, res, next) {
    try {
        let refreshID = req.body.userID + jwtSecret
        let salt = crypto.randomBytes(16).toString('base64')
        let hash = crypto.createHmac('sha512', salt).update(refreshID).digest('base64')
        req.body.refreshKey = salt
        let token = jwt.sign(req.body, jwtSecret, { expiresIn: jwtExpiry })
        let b = Buffer.from(hash)
        let refresh_token = b.toString('base64')
        return res.status(201).send({ accessToken: token, refreshToken: refresh_token })
    } catch (err) {
        return res.status(500).send({ msg: err })
    }
}