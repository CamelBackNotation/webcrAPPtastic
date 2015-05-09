var express = require('express');
var router = express.Router();

/* POST and GET home page start */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.render('boot', params);
    console.log(params.textBox);
});

router.get('/', function(req, res, next) {
    console.log(params.menu);
    res.render('boot', params);
});
/* POST and GET home page end */
/* GET website start */
router.get('/website', function(req, res, next) {
    res.render('website', params);
});
/* GET website end */
/* GET Peeber start */
router.post('/peeber', function(req, res, next) {
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
    params.images[0] = ['img/peeber.jpg'];
    params.quote = "peeber pls";
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});



var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['website', 'peeber', 'clyp', 'marvel'],
    images: [],
    quote: '',

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/starter-template'
};

module.exports = router;
