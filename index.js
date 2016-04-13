/**
 * Created by Administrator on 2016/4/12.
 */

var express = require('express');
var app = express();

app.configure(function () {
    // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public'));
    // log every request to the console
    app.use(express.logger());
    // pull information from html in POST
    app.use(express.urlencoded());
    app.use(express.json());
});

// get the index.html
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// create Todo and send back all todos after creation
app.post('/api/todos', function (req, res) {

var request = require('request')

var Data = { "query" : { "match_phrase" : { "description" : req.body.search } }};
var host = 'http://172.16.17.98:9200/scrapyd/_search';

request.post(
    host,
    Data,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            res.send(body)
        }
    }
);
    // create a Todo, information comes from AJAX request from Angular
    //console.log(req.originalUrl);
    //console.log('index.js:req '+req.body.search);
    //res.json("success")
});


app.listen(8080);
console.log("App listening on port 8080");