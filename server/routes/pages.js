var express = require('express')
var router = express.Router()
const path=require('path');

router.get('/:page',  function (req, res, next) {
	var filename='/../public/'+req.params.page;
	//alert(filename);
	console.log(filename);
	res.sendFile(path.join(__dirname+ filename))
});

router.get('/:dir/:page',  function (req, res, next) {
	var filename='/../public/'+req.params.dir+'/'+req.params.page;
	//alert(filename);
	console.log(filename);
	res.sendFile(path.join(__dirname+ filename),/*err=> {
		if(err){
			throw err;
		}else{
			console.log("file sent");
		}
		}*/
	)
});

router.get('/:dir/:subdir/:page',  function (req, res, next) {
	var filename='/../public/'+req.params.dir+'/'+req.params.subdir+'/'+req.params.page;
	//alert(filename);
	console.log(filename);
	res.sendFile(path.join(__dirname+ filename))
});

module.exports = router
