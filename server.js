
/**
 * Module dependencies.
 */

var express = require('express');
var adsApi = require('./routes/adsApi.js');
var http = require('http');
var path = require('path');
var app = express();



// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/api/ads', adsApi.ads);
app.get('/api/adIsRelevant/:id', adsApi.isRelevant);
app.get('/api/adIsNotRelevant/:id', adsApi.isNotRelevant);
app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
