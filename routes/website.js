var express = require('express')
var router = express.Router()
var fs = require("fs")
var path = require('path')
var MongoClient = require('mongodb').MongoClient

async function getStructure() {
	const client = await MongoClient.connect('mongodb://localhost:27017/DUCS').catch(err => { throw err })
	if (!client) return

	try {
		var db = client.db('DUCS')
		var collection = db.collection('structure')
		let result = await collection.find().toArray()
		let menuMarkup = "\n<ul>"
		result.forEach(levelOneItem => {
			if (levelOneItem.type == "menu") {
				menuMarkup += "<li>\n<div>" + levelOneItem.name + "</div>"
				menuMarkup += "\n<ul>"
				levelOneItem.items.forEach(levelTwoItem => {
					if (levelTwoItem.type == "menu") {
						menuMarkup += "<li>\n<div>" + levelTwoItem.name + "</div>"
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
		menuMarkup += "</ul>\n"

		return menuMarkup
	} catch (err) {
		console.error(err)
	} finally {
		client.close()
	}
}

async function processPage(directory, pagename) {
	var head = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'head.html', 'utf-8').toString()
	var header = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'header.html', 'utf-8').toString()
	var menu = await getStructure()
	var page = fs.readFileSync(path.join(__dirname + '/../pages' + directory) + pagename, 'utf-8').toString()
	var footer = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'footer.html', 'utf-8').toString()
	var tail = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'tail.html', 'utf-8').toString()

	return head + header + menu + page + footer + tail
}

router.get('/', async function (req, res, next) {
	res.send(await processPage('/', 'home.html'))
})

module.exports = router
