var express = require('express');
var router = express.Router();
var indico = require('indico.io');
indico.apiKey = '98fb49ab39eaa7507cf3f36379379bca';

/* GET home page. */

router.post('/', function(req, res, next) {
    console.log(req.body);
    var analysis = indico.text_tags(req.body.tagbox);
    console.log(typeof analysis);
    params.taganalysis = req.body.tagbox;
    res.render('boot', params);
    console.log(params.textBox);
});

router.get('/', function(req, res, next) {
  res.render('boot', params);
});
router.get('/mywebsite', function(req, res, next) {
    res.render('mywebsite', {pathToAssets: 'public'});
});

router.get('/mywebsite', function(req, res, next) {
    res.render('mywebsite', {pathToAssets: 'public'});
});

var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['ExpressTest', 'Home', 'Website', 'About', 'Contact'],

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/starter-template'
};

module.exports = router;
