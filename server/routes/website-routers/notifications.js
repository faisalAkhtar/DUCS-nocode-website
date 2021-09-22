var express = require('express')
var router = express.Router()
var db = require('../../utils/db')

router.get('/:category', async function (req, res, next) {
	try {
		var collection = db.get().collection('notifications')
		let result = await collection.find({ "category": req.params.category }, { "_id": 0, "content": 1 }).toArray()
		console.log(result)
		if (result.length == 0)
			res.status(404).json({ "msg": "Invalid category of notifications" })
		else res.status(200).json(result[0].notifications)
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	}
})

module.exports = router
