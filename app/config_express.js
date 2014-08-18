var express = require('express'),
    morgan = require('morgan'),
    jade = require('jade');
var app = express();

var configExpress = function (models) {
    app.engine('jade', jade.__express);
    app.use(morgan());
    
    var index = require('../routes/index');
    app.get('/', index(models));
    app.listen(5090);
};

module.exports = configExpress;
