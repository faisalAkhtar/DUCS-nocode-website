var createError = require('http-errors')
const path = require('path')

exports.GetUtilityFiles = function (req, res, next) {
	let filename = ""
	switch (req.params.item) {
		case "header":
			filename = '/../../pages/utils/header.html'
			break;

		case "menu":
			filename = '/../../pages/utils/menu.html'
			break;

		case "footer":
			filename = '/../../pages/utils/footer.html'
			break;

		default:
			return next(createError(404))
			break;
	}

	return res.sendFile(path.join(__dirname + filename), function (err) {
		if (err) {
			console.error(err)
			next(createError(404))
		}
	})
}
