var express = require('express');
var router = express.Router();
var https = require('https');
var async = require('async');

router.post('/', function(req, res, next) {
    // params.clypResults.length = 0; //clear the existing array
    if (typeof req.body.audioURL === 'undefined') {
        console.alert("You must enter a valid Clyp.it URL");
        return;
    }
    var URL = req.body.audioURL;
    URL = URL.split('/');
    console.log(URL);
    URL = URL.splice(-1)[0];
    console.log(URL);
    getCoordinates(URL, function(err, coords) {
        params.clypResults.latitude = coords[0];
        params.clypResults.longitude = coords[1];
        console.log(params.clypResults.latitude + "IT WORKED");
        res.render('clyp', params);
    });
});


/*********************** START ************************************** 
  My own defined functions to find location. Now obsolete */

function getCoordinates(URL, callback) {
    https.get('https://api.clyp.it/'+URL, function(res) {
        res.setEncoding('utf8');
        res.on('data',function(data) {
            var results = [];
            data = JSON.parse(data);
            results.push(data.Latitude, data.Longitude);
            callback(null, results);
        });
    });
}

function getRandClyp(URL, callback) {
    https.get(URL, function(res) {
        var results = [];
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(data);
            console.log(obj);
            obj.forEach(function(item) {
                console.log(item.Latitude);
                console.log(item.Longitude);
                console.log(item.Url);
                results.push(item.Latitude);
                results.push(item.Longitude);
                results.push(item.Url);
                results.push(item.Mp3Url);
                callback(null, results);
            });
        });
    });
}

/*********************** END ************************************** 
  My own defined functions to find location. Now obsolete */

router.get('/', function(req, res, next) {
    console.log('THE GET WORKED!!' + req.body);
    res.render('clyp', params); 
});

router.get('/random', function(req, res, next) {
    getRandClyp("https://api.clyp.it/featuredlist/random/?count=1", function(err, apiData) {
        if (err) console.error(err.stack);
        params.clypResults.latitude = apiData[0];
        params.clypResults.longitude = apiData[1];
        params.clypResults.url = apiData[2];
        params.clypResults.mp3 = apiData[3];
        res.render('clyp', params);
    });
});

router.get('/peeber', function(req, res, next) {
    params.images[0] = ['img/peeber.jpg'];
    params.quote = "peeber pls";
    params.pathToSelectedTemplateWithinBootstrap = 'bootstrap/docs/examples/cover';
    res.render('peeber', params);
});

var params = {
    menu: ['website', 'peeber', 'clyp'],
    images: [],
    clypResults: {
        longitude: -97.74,
        latitude: 30.3,
        url: '',
        mp3: ''   
        },
    // longitude: -97.74,
    // latitude: 30.3,
    // url: '',
    // mp3: '',
    API_KEY: 'AIzaSyCQ-y9WlQd9Y_TNL4JwvAHFbuxo7m2KGxA'
  }


module.exports = router;
