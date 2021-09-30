var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var favicon = require('serve-favicon')
var createError = require('http-errors')
var path = require('path')

var WebsiteRouter = require('./routes/website-route.config')
var EditorRouter = require('./routes/editor-route.config')

var app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header('Access-Control-Expose-Headers', 'Content-Length')
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
	if (req.method === 'OPTIONS')
		return res.sendStatus(200)
	else return next()
})

app.use(logger('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

WebsiteRouter.routeConfig(app)
EditorRouter.routeConfig(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.json({
		"msg": res.locals.message,
		"status": res.locals.error.status,
		"stack": res.locals.error.stack
	})
})

module.exports = app
