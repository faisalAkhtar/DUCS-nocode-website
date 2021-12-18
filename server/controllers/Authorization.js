require('dotenv').config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
const jwtExpiry = process.env.JWTEXPIRATION

exports.login = function (req, res, next) {
    try {
        let refreshID = req.body.userID + jwtSecret
        let salt = crypto.randomBytes(16).toString('base64')
        let hash = crypto.createHmac('sha512', salt).update(refreshID).digest('base64')
        req.body.refreshKey = salt
        let token = jwt.sign(req.body, jwtSecret, { expiresIn: jwtExpiry })
        let b = Buffer.from(hash)
        let refresh_token = b.toString('base64')
        let body = {...req.body}
        delete body.refreshKey
        return res.status(201).send({ accessToken: token, refreshToken: refresh_token, user: body })
    } catch (err) {
        return res.status(500).send({ msg: err })
    }
}