const NotificationModel = require('../models/notifications.model')

exports.GetCategories = function (req, res, next) {
	NotificationModel.categories(
		(err, docs) => {
			if (err)
				return res.status(500).json({ "msg": err })

			docs.forEach((doc, ind) => {
				docs[ind].id = docs[ind]._id
				delete docs[ind]._id
			})

			return res.send(docs)
		}
	)
}

exports.GetNotifications = function (req, res, next) {
	NotificationModel.notifications(req.params.category,
		(err, docs) => {
			if (err)
				return res.status(500).json({ "msg": err })

			if (docs.length == 0)
				return res.status(404).json({ "msg": "Invalid category of notifications" })

			return res.send(docs[0].notifications)
		}
	)
}
