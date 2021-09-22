var express = require('express')
var router = express.Router()
var createError = require('http-errors')
const path = require('path')

router.get('/header', function (req, res, next) {
	var filename = '/../../pages/utils/header.html'
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

router.get('/menu', async function (req, res, next) {
	var filename = '/../../pages/utils/menu.html'
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

router.get('/footer', async function (req, res, next) {
	var filename = '/../../pages/utils/footer.html'
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

module.exports = router
