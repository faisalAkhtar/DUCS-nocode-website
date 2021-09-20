var express = require('express')
var router = express.Router()
var db = require('../utils/db')

router.get('/header', async function (req, res, next) {
	try {
		var collection = db.get().collection('structure')
		let result = await collection.find({ "type": "util", "name": "header" }, { "_id": 0, "content": 1 }).toArray()
		res.status(200).send(result[0].content)
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	} finally {
		client.close()
	}
})

router.get('/menu', async function (req, res, next) {
	try {
		var collection = db.get().collection('structure')
		let result = await collection.find().sort({ "order": 1 }).toArray()
		let menuMarkup = ""
		menuMarkup += "\n<div id='headermenu'>"
		menuMarkup += "\n<a id='menu-toggle' class='button dark' href='javscript:void(0)'><i class='icon-reorder'></i></a>"
		menuMarkup += "\n<nav id='navigation'>"
		menuMarkup += "\n<ul id='main-menu'>"
		result.forEach(levelOneItem => {
			if (levelOneItem.type == "menu") {
				menuMarkup += "<li class='parent'>\n<a href='javascript:void(0)'>" + levelOneItem.name + "</a>"
				menuMarkup += "\n<ul class='sub-menu'>"
				levelOneItem.items.forEach(levelTwoItem => {
					if (levelTwoItem.type == "menu") {
						menuMarkup += "<li>\n<a href='javascript:void(0)'>" + levelTwoItem.name + "</a>"
						menuMarkup += "\n<ul>"
						levelTwoItem.items.forEach(levelThreeItem => {
							menuMarkup += "<li><a href='/" + levelOneItem.link + "/" + levelTwoItem.link + "/" + levelThreeItem.link + "'>" + levelThreeItem.name + "</a></li>"
						})
						menuMarkup += "</ul></li>\n"
					} else if (levelTwoItem.type == "page") {
						menuMarkup += "<li><a href='/" + levelOneItem.link + "/" + levelTwoItem.link + "'>" + levelTwoItem.name + "</a></li>"
					}
				})
				menuMarkup += "</ul></li>\n"
			} else if (levelOneItem.type == "page") {
				menuMarkup += "<li><a href='/" + levelOneItem.link + "'>" + levelOneItem.name + "</a></li>"
			}
		})
		menuMarkup += "\n</ul>"
		menuMarkup += "\n</nav>"
		menuMarkup += "\n</div>\n"

		res.status(200).send(menuMarkup)
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	} finally {
		client.close()
	}
})

router.get('/footer', async function (req, res, next) {
	try {
		var collection = db.get().collection('structure')
		let result = await collection.find({ "type": "util", "name": "footer" }, { "_id": 0, "content": 1 }).toArray()
		res.status(200).send(result[0].content)
	} catch (err) {
		console.error(err)
		res.status(500).json({ "msg": err })
	} finally {
		client.close()
	}
})

module.exports = router
