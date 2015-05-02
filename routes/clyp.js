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
    });
    console.log(params.latitude);
    console.log(params.longitude);

    res.render('clyp', params);
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

var params = {
    menu: ['website', 'peeber', 'clyp'],
    images: [],
    clypResults: [''],
    longitude: -97.74,
    latitude: 30.3,
    API_KEY: 'AIzaSyCQ-y9WlQd9Y_TNL4JwvAHFbuxo7m2KGxA'
    //Necessary bootstrap.jade paths
  }


module.exports = router;
