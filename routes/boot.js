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
  params.menu = ['Home', 'website', 'peeber'];
  res.render('boot', params);
});
/* POST and GET home page end */
/* GET website start */
router.get('/website', function(req, res, next) {
    res.render('website', {});
});
/* GET website end */
/* GET Peeber start */
router.post('/peeber', function(req, res, next) {
    params.menu = ['Home', 'website'];
    params.images = ['img/peeber.jpg'];
    params.quote = "I'm too retarded to submit a quote when asked!";
    if(req.body.imgURL !== '')
        params.images[0] = req.body.imgURL;
    if(req.body.usrQuote !== '') {
        params.quote = req.body.usrQuote;
        console.log("I'm in the if statement for usrQuote!!");
    }
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});
router.get('/peeber', function(req, res, next) {
    params.menu = ['Home', 'website'];
    params.images[0] = ['img/peeber.jpg'];
    params.quote = "I like fruit loops";
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});



var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['ExpressTest', 'Home', 'website', 'Peeber', ''],
    images: [],
    quote: '',

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/starter-template'
};

module.exports = router;
