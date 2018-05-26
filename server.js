var express         = require('express');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var expressSession  = require('express-session');

var app             = express();
var server          = require('http').Server(app);

app.use(cookieParser());
app.use(expressSession({
    'secret': "SECRET",
    'cookie': {
        'maxAge': 3600*1000*24
    }}));
// app.use(expressSession({'secret': config.SECRET}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', express.static(__dirname + '/dist/'));

app.get('/*', function(req, res) { 
  res.sendFile(__dirname + '/dist/index.html')
});

server.listen(3000);
