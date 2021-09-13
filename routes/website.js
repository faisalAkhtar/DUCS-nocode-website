var express = require('express')
var router = express.Router()
var fs = require("fs")
const path = require('path')

/* GET home page. */
function processPage(directory, pagename) {
	var head = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'head.html', 'utf-8').toString()
	var header = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'header.html', 'utf-8').toString()
	var page = fs.readFileSync(path.join(__dirname + '/../pages' + directory) + pagename, 'utf-8').toString()
	var footer = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'footer.html', 'utf-8').toString()
	var tail = fs.readFileSync(path.join(__dirname + '/../pages/utils/') + 'tail.html', 'utf-8').toString()

	return head + header + page + footer + tail
}

router.get('/', function (req, res, next) {
	res.send(processPage('/', 'home.html'))
})

module.exports = router
