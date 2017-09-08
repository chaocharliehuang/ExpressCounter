var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

// create the express app
var app = express();
// session
app.use(session({secret: 'supersecret'}));
// static content
app.use(express.static(path.join(__dirname, './static')));
// handle post data
app.use(bodyParser.urlencoded({extended: true}));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the counter.ejs view
app.get('/', function(req, res) {
    if (!req.session.count) {
        req.session.count = 1;
    } else {
        req.session.count++;
    }
    res.render('counter', {count: req.session.count});
});

app.post('/plus2', function(req, res) {
    req.session.count++;
    res.redirect('/');
});

app.post('/reset', function(req, res) {
    req.session.count = 0;
    res.redirect('/');
});

app.listen(8000, function() {
    console.log('listening on port 8000');
});
