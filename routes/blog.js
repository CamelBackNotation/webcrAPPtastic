var express = require('express');
var router = express.Router();
var indico = require('indico.io');
indico.apiKey = '98fb49ab39eaa7507cf3f36379379bca';

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('blog', params);
});


var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['ExpressTest', 'Home', 'Website', 'About', 'Contact'],

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/blog'
};

module.exports = router;
