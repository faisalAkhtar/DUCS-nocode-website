const jwt = require('jsonwebtoken')
const jwtSecret = require('../env.config').jwtSecret

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
            console.error(err.name +  " : " + err.message)
            return res.status(403).send()
        }
    } else {
        return res.status(401).send('No Authorization header provided')
    }
}