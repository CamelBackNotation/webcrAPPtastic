var express = require('express');
var router = express.Router();
var fs = require('fs');
var assert = require('assert');
var http = require('http');
var md5 = require('md5-node');


router.get('/', function(req, res, next) {
    res.render('marvel', params);
});

router.post('/', function(req, res, next) {
    var user_input = req.body.name;
    if (user_input.length < 1)
        res.render('marvel', params);
    else {
        getComic(user_input, function(err, summary, numComics) {
            params.apiResults[0].name = user_input;
            console.log(params.name);
            params.apiResults[0].comics = numComics;
            params.apiResults[0].description = summary;
            res.render('marvel', params);
        });
    }
});

function getComic (character, callback) {
    var md5Calc = md5(params.ts + params.PRIVATE_API_KEY + params.API_KEY);
    var URL = "http://gateway.marvel.com/v1/public/characters"
    +"?name="+character
    +"&apikey="+params.API_KEY
    +"&hash="+md5Calc
    +"&ts="+params.ts;
    console.log(URL);
/* URL GET FORMAT: http://gateway.marvel.com/v1/public/{category} */
    http.get(URL, function(res) {
        console.log('Trying to just print the raw request, unformatted');
        res.setEncoding('utf8');
        var apiJson = '';
        res.on('data', function(chunk) {
            apiJson += chunk;
        });
        res.on('end', function() {
            var obj = JSON.parse(apiJson);
            var numComics = '';
            var description = '';
            var attribution;
            if (typeof obj.data !== 'undefined') {
                console.log("Number of results: " +obj.data.results.length);
                attribution = obj.attributionText;
                console.log(obj.attributionText);
                var firstResults = obj.data.results[0];
            }
            if (typeof firstResults !== 'undefined') {
                numComics = firstResults.comics.available;
                description = firstResults.description;
                if (numComics && !description)
                    description = "No description listed for this character";
            }
            return callback(null, description, numComics);
        });
    });
};


var params = {
    menu: ['website', 'peeber'],
    apiResults: [
        {
            name: '',
            description: '',
            comics: 0,
            attribution: ''
        },
        {
            name: '',
            description: '',
            comics: 0,
            attribution: ''
        }
    ],

    /* Stuff required for API calls TODO: implement proper timestamp functionality */
    ts: '1',
    PRIVATE_API_KEY: '5fb138748315cb5e0d7b7d36cfc480448d5510a2', //hide me
    API_KEY: '8f08bf4a805c12f24472cefbd4a71153', //public api key
    MD5: md5(this.ts + this.PRIVATE_API_KEY + this.API_KEY)
} 


module.exports = router;
