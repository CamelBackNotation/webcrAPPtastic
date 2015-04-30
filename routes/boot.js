var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('boot', params);
});

router.get('/mywebsite', function(req, res, next) {
    res.render('mywebsite', {pathToAssets: 'public'});
});

var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['ExpressTest', 'Home', 'Portfolio', 'About', 'Contact'],

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/starter-template'
};

module.exports = router;
