var express = require('express');
var router = express.Router();
var socket = require('socket.io-client');
var passport = require('passport');
var nav_tabs = ['portfolio', 'peeber', 'clyp', 'marvel', 'chat'];

router.get('/', function(req, res) {
		params.user = req.user;
    res.render('chat', params);
});

/* GET website start */
router.get('/'+nav_tabs[0], function(req, res) {
    res.render(nav_tabs[0], params);
});
/* GET website end */
/* GET Peeber start */
router.get('/peeber', function(req, res) {
    params.images[1] = ['/img/peeber.jpg'];
    params.quote = "peeber pls";
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});



var params = {
    menu: nav_tabs,
    images: [0,0,0,0,0],
    user: null
};

module.exports = router;
