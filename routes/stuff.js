var express = require('express');
var router = express.Router();

/* GET home page. */
// router.post('/index', function(req, res, next) {
//     console.log(req.body);
// });


router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("fuck you peeber"+ req.body.name);
});

router.get('/', function(req, res, next) {
  res.render('mywebsite', params);
});

var params = {
    title: 'Hell!',
    description: "Well that's what you're here to find out!",
    menu: ['Home', 'Derp', 'Cats']
};

module.exports = router;
