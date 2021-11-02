const NotificationModel = require('../models/notifications.model')

function formatDate(date) {
	let day = date.getDate(),
		mon = date.getMonth() + 1,
		year = date.getFullYear()

	return year + '-' + (mon > 9 ? mon : '0' + mon) + '-' + (day > 9 ? day : '0' + day)
}

exports.AddCategory = function (req, res, next) {
	let category = req.body.category
	if (!category || category.trim() === "")
		return res.status(400).json({ msg: "Invalid syntax" })

	NotificationModel.addCategory(category,
		(err, result) => {
			if (err)
				return res.status(403).json({ "msg": err })
			return res.status(201).send('OK')
		}
	)
}

exports.AddNotification = function (req, res, next) {
	let category = req.body.category,
		details = req.body.details,
		uploadDate = new Date(),
		newDate = req.body.newDate,
		expiryDate = req.body.expiryDate,
		links = req.body.links

	if (!category || !details || !newDate || !expiryDate || !links ||
		typeof (category) !== "string" || typeof (details) !== "string" ||
		typeof (links) !== "object" || links.constructor !== Array)
		return res.status(400).json({ msg: "Invalid syntax" })

	if (category.trim() === "" || details.trim() === "" || newDate.trim() === "" || expiryDate.trim() === "")
		return res.status(400).json({ msg: "One or more fields empty" })

	expiryDate = new Date(expiryDate)
	newDate = new Date(newDate)

	if (expiryDate == "Invalid Date" || newDate == "Invalid Date")
		return res.status(400).json({ msg: "Invalid dates" })

	expiryDate = formatDate(expiryDate)
	newDate = formatDate(newDate)
	uploadDate = formatDate(uploadDate)

	let err = ""
	for (let i = 0; i < links.length; i++) {
		if (typeof (links[i]) !== "object") {
			err = "Invalid links"
			break
		} else if (!links[i].name || links[i].name.trim() === "" || !links[i].link || links[i].link.trim() === "") {
			err = "One or more link fields empty"
			break
		} else if (Object.keys(links[i]).length > 2) {
			err = "Link objects overloaded"
			break
		}
	}
	if (err !== "") return res.status(400).json({ msg: err })

	NotificationModel.addNotification(category, uploadDate, expiryDate, newDate, links, details,
		(err, result) => {
			if (err)
				return res.status(500).json({ "msg": err })
			return res.status(201).send('OK')
		}
	)
}