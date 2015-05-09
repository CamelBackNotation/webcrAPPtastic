var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var md5 = require('md5-node');


router.get('/', function(req, res, next) {
    res.render('marvel', params);
});

router.post('/', function(req, res, next) {
    var user_input = req.body.name;
    console.log(typeof user_input);
    if (typeof user_input !== 'string') {
        console.log("I am in my if statement of the post function");
        return console.error("Fuck you");
    }
    console.log("The user is asking for details on "+user_input);
    // params.message = "Hulk";
    getComic(user_input, function(err, summary, numComics) {
        params.apiResults.comics = numComics;
        params.apiResults.description = summary;
        console.log("Good job! You got some results back about "+params.message);
        res.render('marvel', params);
    });
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
            var firstResults = obj.data.results[0];
            var numComics = '';
            var description = 'No description available';
            if (typeof firstResults !== 'undefined') {
                numComics = firstResults.comics.available;
                description = firstResults.description;
            }
            return callback(null, description, numComics);
        });
    });
};



var params = {
    menu: ['website', 'peeber'],
    apiResults: {
        name: '',
        description: '',
        comics: 0
    },




    /* Stuff required for API calls TODO: implement proper timestamp functionality */
    ts: '1',
    PRIVATE_API_KEY: '5fb138748315cb5e0d7b7d36cfc480448d5510a2', //hide me
    API_KEY: '8f08bf4a805c12f24472cefbd4a71153', //public api key
    MD5: md5(this.ts + this.PRIVATE_API_KEY + this.API_KEY)
} 

module.exports = router;
