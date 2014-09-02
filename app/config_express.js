var express = require('express'),
    morgan = require('morgan'),
    jade = require('jade'),
    bodyParser = require('body-parser');
var app = express();

var configExpress = function (models) {
    
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    }));

    app.engine('jade', jade.__express);
    app.use(morgan());

    app.use('/static/bower_components', express.static(__dirname + '/../bower_components'));
    app.use('/static/less', express.static(__dirname + '/../less'));

    var index = require('../routes/index');
    app.get('/', index(models));

    var collection = require ('../routes/collection')(models)
    app.get('/collection/:collection', collection.collection);
    app.get('/collection/:collection/:id', collection.item);
    app.post('/collection/:collection/:id', collection.edit);


    app.listen(5090, 'localhost');
};

module.exports = configExpress;
