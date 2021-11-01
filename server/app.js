const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')
const path = require('path')

const AuthRouter = require('./routes/auth-route.config')
const WebsiteRouter = require('./routes/website-route.config')
const PublicAPIsRouter = require('./routes/public-apis-route.config')
const FilesystemRouter = require('./routes/filesystem-route.config')
const PageEditorRouter = require('./routes/page-editor-route.config')

const app = express()
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

logger.token('date', () => (new Date()).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, day: 'numeric', month: 'short' }))
app.use(logger('[:date] :method :url :status :response-time ms - :res[content-length]'))
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

AuthRouter.routeConfig(app)
WebsiteRouter.routeConfig(app)
PublicAPIsRouter.routeConfig(app)
FilesystemRouter.routeConfig(app)
PageEditorRouter.routeConfig(app)

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
