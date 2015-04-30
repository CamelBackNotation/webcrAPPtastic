var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', params);
});

var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['Home', 'Derp', 'Cats']
};

module.exports = router;
