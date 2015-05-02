var express = require('express');
var router = express.Router();
var indico = require('indico.io');
indico.apiKey = '98fb49ab39eaa7507cf3f36379379bca';

/* POST and GET home page start */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var analysis = indico.text_tags(req.body.tagbox);
    console.log(typeof analysis);
    params.taganalysis = req.body.tagbox;
    res.render('boot', params);
    console.log(params.textBox);
});

router.get('/', function(req, res, next) {
  params.menu = ['Home', 'mywebsite', 'peeber'];
  res.render('boot', params);
});
/* POST and GET home page end */
/* GET website start */
router.get('/mywebsite', function(req, res, next) {
    res.render('mywebsite', {});
});
/* GET website end */
/* GET Peeber start */
router.get('/peeber', function(req, res, next) {
    params.menu = ['Home', 'mywebsite'];
    params.images = ['img/peeber.jpg'];
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});


var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['ExpressTest', 'Home', 'mywebsite', 'Peeber', ''],
    images: [],

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/starter-template'
};

module.exports = router;
