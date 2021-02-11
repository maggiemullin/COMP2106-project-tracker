//use express dependency and it routing feature to parse url's
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Tracker' });
});

/* GET/about */
router.get('/about', (req, res, next) =>{
  res.render('about', {
    title: 'About this site',
    pageText: 'Here is some info dynamic info from the controller'
  })
});

//makes the controller public
module.exports = router;
