require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET

exports.validateJWT = function (req, res, next) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ')
            if (authorization[0] != 'Bearer') {
                return res.status(403).send('Invalid authorization header')
            } else {
                req.jwt = jwt.verify(authorization[1], jwtSecret)
                return next()
            }
        } catch (err) {
            console.error(err.name + " : " + err.message)
            return res.status(403).send()
        }
    } else {
        return res.status(401).send('No Authorization header provided')
    }
}

exports.validRefreshNeeded = (req, res, next) => {
    if (!req.body || !req.body.refresh_token)
        return res.status(400).send('Refresh token needed')

    let b = Buffer.from(req.body.refresh_token, 'base64')
    let refresh_token = b.toString()
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64")
    if (hash === refresh_token) {
        req.body = req.jwt
        return next()
    } else {
        return res.status(400).send('Invalid refresh token')
    }
}
