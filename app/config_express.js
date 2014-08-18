var express = require('express'),
    morgan = require('morgan'),
    jade = require('jade');
var app = express();

var configExpress = function (models) {
    app.engine('jade', jade.__express);
    app.use(morgan());

    app.use('/static/bower_components', express.static(__dirname + '/../bower_components'));
    app.use('/static/less', express.static(__dirname + '/../less'));

    var index = require('../routes/index');
    app.get('/', index(models));
    app.listen(5090);
};

module.exports = configExpress;