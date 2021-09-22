const NotificationModel = require('../../utils/notifications.model')

exports.GetNotifications = function (req, res, next) {
	NotificationModel.list(req.params.category,
		(err, docs) => {
			if (err)
				return res.status(500).json({ "msg": err })

			if (docs.length == 0)
				return res.status(404).json({ "msg": "Invalid category of notifications" })

			return res.send(docs[0].notifications)
		}
	)
}
