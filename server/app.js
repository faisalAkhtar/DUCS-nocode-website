var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var favicon = require('serve-favicon')
var cors = require('cors')
var createError = require('http-errors')
var path = require('path')

var pageRouter = require('./routes/website-routers/pages')
var utilRouter = require('./routes/website-routers/utils')
var notificationRouter = require('./routes/website-routers/notifications')
var editorRouter = require('./routes/editor-routers/editor')

var app = express()
app.use(cors())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('[:date] :method :url :status :response-time ms - :res[content-length]'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/page/', pageRouter)
app.use('/util/', utilRouter)
app.use('/notification/', notificationRouter)
app.use('/awesome-editor', editorRouter)

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
