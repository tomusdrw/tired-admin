var Q = require('q'),
    fs = require('fs');

var ConfigReader = function (file) {
    return Q.ninvoke(fs, 'readFile', file, 'utf8').then(function (data) {
        return JSON.parse(data);
    }).fail(function (err) {
        console.error(err);
    });
};

module.exports = ConfigReader;
