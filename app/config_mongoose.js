var mongoose = require('mongoose'),
    Q = require('q');

var ConfigMongoose = function (path) {
    mongoose.connect(path);
    var db = mongoose.connection;
    var result = Q.defer();

    db.on('error', function (err) {
        result.reject(err);
    });
    db.once('open', function () {
        result.resolve(mongoose);
    });

    return result.promise.fail(function () {
        console.error('connection error');
    });
};

module.exports = ConfigMongoose;
