var createError = require('http-errors')
const path = require('path')
const FilesystemModel = require('../models/filesystem.model')

function getMenuMarkup(docs) {
	let htm = ""
	htm += "<nav style='background-color: #ffffff;'>"
	htm += "<div style='max-width: 1366px; margin: 0 auto;'>"
	htm += "<ul class='menu'>"
	docs.forEach(l0 => {
		if (l0.type === "page") {
			htm += "<li><a href='/" + l0.link + "'>" + l0.name + "</a></li>"
		} else if (l0.type === "menu") {
			htm += "<li class='dropdown'>"
			htm += "<a href='#'>" + l0.name + "</a>"
			htm += "<ul class='submenu'>"
			l0.items.forEach(l1 => {
				if (l1.type === "page") {
					htm += "<li><a href='/" + l0.link + "/" + l1.link + "'>" + l1.name + "</a></li>"
				} else if (l1.type === "menu") {
					htm += "<li class='dropdown'>"
					htm += "<a href='#'>" + l1.name + "</a>"
					htm += "<ul class='submenu'>"
					l1.items.forEach(l2 => {
						htm += "<li><a href='/" + l0.link + "/" + l1.link + "/" + l2.link + "'>" + l2.name + "</a></li>"
					})
					htm += "</ul>"
					htm += "</li>"
				}
			})
			htm += "</ul>"
			htm += "</li>"
		}
	})
	htm += "</ul>"
	htm += "</div>"
	htm += "</nav>"

	return htm
}

exports.GetUtilityFiles = function (req, res, next) {
	let filename = ""
	switch (req.params.item) {
		case "header":
			return res.sendFile(
				path.join(__dirname + '/../pages/utils/header.html'),
				(err) => {
					if (err) {
						console.error(err)
						next(createError(404))
					}
				}
			);

		case "menu":
			FilesystemModel.list(
				(err, menus) => {
					if (err) {
						console.error(err)
						next(createError(404))
					}

					return res.send(getMenuMarkup(menus))
				}
			)
			break;

		case "footer":
			return res.sendFile(
				path.join(__dirname + '/../pages/utils/footer.html'),
				(err) => {
					if (err) {
						console.error(err)
						next(createError(404))
					}
				}
			);

		default:
			return next(createError(404));
	}
}
