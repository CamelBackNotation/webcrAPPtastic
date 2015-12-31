var express = require('express');
var router = express.Router();
var nav_tabs = ['portfolio', 'peeber', 'clyp', 'marvel'];

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
router.get('/'+nav_tabs[0], function(req, res, next) {
    res.render(nav_tabs[0], params);
});
/* GET website end */
/* GET Peeber start */
router.get('/peeber', function(req, res, next) {
    params.images[1] = ['img/peeber.jpg'];
    params.quote = "peeber pls";
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});



var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: nav_tabs,
    images: [0,0,0,0,0],
    quote: '',

    //Necessary bootstrap.jade paths
    pathToAssets: 'bootstrap',
    pathToSelectedTemplateWithinBootstrap: 'bootstrap/docs/examples/starter-template'
};

module.exports = router;
