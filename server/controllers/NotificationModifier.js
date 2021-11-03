const NotificationModel = require('../models/notifications.model')
const NotificationCategoriesModel = require('../models/notification-categories.model')

exports.AddCategory = function (req, res, next) {
	let category = req.body.category
	if (!category || category.trim() === "")
		return res.status(400).json({ msg: "Invalid syntax" })

	NotificationCategoriesModel.addCategory(category,
		(err, result) => {
			if (err)
				return res.status(403).json({ "msg": err })
			return res.status(201).send('OK')
		}
	)
}

exports.RemoveCategory = function (req, res, next) {
	let id = req.params.id

	if (!/[0-9A-Fa-f]{24}/g.test(id))
		return res.status(400).json({ msg: "Invalid ID" })

	NotificationCategoriesModel.removeCategory(id,
		(err, result) => {
			if (err)
				return res.status(500).json({ "msg": err })

			if (result.deletedCount === 0)
				return res.status(404).json({ "msg": "Non-existent ID" })

			return res.status(200).send()
		}
	)
}

exports.AddNotification = function (req, res, next) {
	let category = req.body.category,
		details = req.body.details,
		uploadDate = req.body.uploadDate,
		newDate = req.body.newDate,
		expiryDate = req.body.expiryDate,
		links = req.body.links,
		id = req.body.id

	NotificationModel.addNotification(id, category, uploadDate, expiryDate, newDate, links, details,
		(err, result) => {
			if (err)
				return res.status(500).json({ "msg": err })
			return res.status(201).send('OK')
		}
	)
}

exports.RemoveNotification = function (req, res, next) {
	let id = req.body.id,
		category = req.body.category

	if (!category || category.trim() === "")
		return res.status(400).json({ msg: "Category is required" })
	if (!/[0-9A-Fa-f]{24}/g.test(id))
		return res.status(400).json({ msg: "Invalid ID" })

	NotificationModel.removeNotification(id, category,
		(err, result) => {
			if (err)
				return res.status(500).json({ "msg": err })

			if (result.deletedCount === 0)
				return res.status(404).json({ "msg": "Non-existent ID" })

			return res.status(200).send()
		}
	)
}
