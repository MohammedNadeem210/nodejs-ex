var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

//var port = process.env.PORT || 1337;
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1337;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

app.listen(port,ip);