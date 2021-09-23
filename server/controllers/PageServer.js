var createError = require('http-errors')
const path = require('path')

exports.GetHome = function (req, res, next) {
	var filename = '/../pages/index.html'

	return res.sendFile(path.join(__dirname + filename), function (err) {
		if (err) {
			console.error(err)
			next(createError(404))
		}
	})
}

exports.GetPage = function (req, res, next) {
	var filename
	if (req.params.page.indexOf('.html') === -1)
		filename = '/../pages/' + req.params.page + '.html'
	else filename = '/../pages/' + req.params.page

	return res.sendFile(path.join(__dirname + filename), function (err) {
		if (err) {
			console.error(err)
			next(createError(404))
		}
	})
}

exports.GetPageInADirectory = function (req, res, next) {
	var filename
	if (req.params.page.indexOf('.html') === -1)
		filename = '/../pages/' + req.params.dir + '/' + req.params.page + '.html'
	else filename = '/../pages/' + req.params.dir + '/' + req.params.page

	return res.sendFile(path.join(__dirname + filename), function (err) {
		if (err) {
			console.error(err)
			next(createError(404))
		}
	})
}

exports.GetPageInASubdirectory = function (req, res, next) {
	var filename
	if (req.params.page.indexOf('.html') === -1)
		filename = '/../pages/' + req.params.dir + '/' + req.params.subdir + '/' + req.params.page + '.html'
	else filename = '/../pages/' + req.params.dir + '/' + req.params.subdir + '/' + req.params.page

	return res.sendFile(path.join(__dirname + filename), function (err) {
		if (err) {
			console.error(err)
			next(createError(404))
		}
	})
}
