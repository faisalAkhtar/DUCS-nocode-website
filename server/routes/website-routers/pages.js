var express = require('express')
var router = express.Router()
var createError = require('http-errors')
const path = require('path')

router.get('/', function (req, res, next) {
	var filename = '/../../pages/index.html'
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

router.get('/:page', function (req, res, next) {
	var filename
	if (req.params.page.indexOf('.html') === -1)
		filename = '/../../pages/' + req.params.page + '.html'
	else filename = '/../../pages/' + req.params.page
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

router.get('/:dir/:page', function (req, res, next) {
	var filename
	if (req.params.page.indexOf('.html') === -1)
		filename = '/../../pages/' + req.params.dir + '/' + req.params.page + '.html'
	else filename = '/../../pages/' + req.params.dir + '/' + req.params.page
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

router.get('/:dir/:subdir/:page', function (req, res, next) {
	var filename
	if (req.params.page.indexOf('.html') === -1)
		filename = '/../../pages/' + req.params.dir + '/' + req.params.subdir + '/' + req.params.page + '.html'
	else filename = '/../../pages/' + req.params.dir + '/' + req.params.subdir + '/' + req.params.page
	res.status(200).sendFile(path.join(__dirname + filename), err => { console.error(err); next(createError(404)) })
})

module.exports = router
