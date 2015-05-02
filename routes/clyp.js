var express = require('express');
var router = express.Router();
var https = require('https');
var async = require('async');

router.post('/', function(req, res, next) {
    // params.clypResults.length = 0; //clear the existing array
    var URL = req.body.audioURL;
    URL = URL.split('/').splice(-1)[0];
    console.log(URL);
    getCoordinates(URL, function(err, coords) {
        params.latitude = coords[0];
        params.longitude = coords[1];
        res.render('clyp', params);
    });
});

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

function findLocation (err, coordinates) {
    if (err) console.error(err.stack);
    https.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=30,-98'+/*coordinates[0]+','+coordinates[1]+*/'&key='+apiKey, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) {
            console.log(results[0]);
        });
    });
}



router.get('/', function(req, res, next) {
    console.log('THE GET WORKED!!' + req.body);
    res.render('clyp', params); 
});

router.get('/random', function(req, res, next) {
    https.get("https://api.clyp.it/featuredlist/random/?count=1", function(res) {
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
                params.latitude = item.Latitude;
                params.longitude = item.Longitude;
                params.url = item.Url;
                params.mp3 = item.Mp3Url;
            });
        });
    });
    console.log(params.longitude);
    console.log(params.latitude);
    console.log(params.url);
    console.log(params.mp3);
    res.render('clyp', params); 
});

var params = {
    menu: ['website', 'peeber', 'clyp'],
    images: [],
    clypResults: [''],
    longitude: -97.74,
    latitude: 30.3,
    url: '',
    mp3: '',
    API_KEY: 'AIzaSyCQ-y9WlQd9Y_TNL4JwvAHFbuxo7m2KGxA'
  }


module.exports = router;
