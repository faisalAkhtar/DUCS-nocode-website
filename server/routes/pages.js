var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient

router.get('/:page', async function (req, res, next) {
	const client = await MongoClient.connect('mongodb://localhost:27017/DUCS').catch(err => {
		res.status(500).json({ "msg": "Mongo connection error!" })
		throw err
	})
	if (!client) {
		res.status(500).json({ "msg": "Mongo connection error!" })
		return
	}

	try {
		var db = client.db('DUCS')
		var collection = db.collection('structure')
		let result = await collection.find({ "link": req.params.page, "type": "page" }, { "_id": 0, "items": 1 }).toArray()
		if (result.length == 0) {
			res.status(404).json({ "msg": "Page not found" })
		} else {
			res.status(200).send(result[0].content)
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	} finally {
		client.close()
	}
})

router.get('/:dir/:page', async function (req, res, next) {
	const client = await MongoClient.connect('mongodb://localhost:27017/DUCS').catch(err => {
		res.status(500).json({ "msg": "Mongo connection error!" })
		throw err
	})
	if (!client) {
		res.status(500).json({ "msg": "Mongo connection error!" })
		return
	}

	try {
		var db = client.db('DUCS')
		var collection = db.collection('structure')
		let result = await collection.find({ "link": req.params.dir }, { "_id": 0, "items": 1 }).toArray()
		if (result.length == 0) {
			res.status(404).json({ "msg": "Invalid directory" })
		} else {
			if(result[0].type !== "menu") {
				res.status(404).json({ "msg": "Invalid directory" })
			} else {
				let page = result[0].items.find(o => o.link === req.params.page)
				if (!page)
					res.status(404).json({ "msg": "Page not found" })
				else res.status(200).send(page.content)
			}
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	} finally {
		client.close()
	}
})

router.get('/:dir/:subdir/:page', async function (req, res, next) {
	const client = await MongoClient.connect('mongodb://localhost:27017/DUCS').catch(err => {
		res.status(500).json({ "msg": "Mongo connection error!" })
		throw err
	})
	if (!client) {
		res.status(500).json({ "msg": "Mongo connection error!" })
		return
	}

	try {
		var db = client.db('DUCS')
		var collection = db.collection('structure')
		let result = await collection.find({ "link": req.params.dir }, { "_id": 0, "items": 1 }).toArray()
		if (result.length == 0) {
			res.status(404).json({ "msg": "Invalid directory" })
		} else {
			if(result[0].type !== "menu") {
				res.status(404).json({"msg": "Invalid directory"})
			} else {
				let subdir = result[0].items.find(o => o.link === req.params.subdir)
				if (!subdir) {
					res.status(404).json({ "msg": "Invalid subdirectory" })
				} else {
					if(subdir.type !== "menu") {
						res.status(404).json({ "msg": "Invalid subdirectory" })
					} else {
						let page = subdir.items.find(o => o.link === req.params.page)
						if (!page)
							res.status(404).json({ "msg": "Page not found" })
						else res.status(200).send(page.content)
					}
				}
			}
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	} finally {
		client.close()
	}
})

module.exports = router
