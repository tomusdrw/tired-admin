var fs = require('fs'),
    _ = require('lodash'),
    Q = require('q');


var configModels = function (paths) {

    var onStreamError = function (result) {
        return function (err) {
            result.reject(err);
        }
    };

    var loadModel = function (path, file) {
        var result = Q.defer();
        var wr = fs.createWriteStream('models/' + file);
        var rd = fs.createReadStream(path + file).pipe(wr);

        rd.on('error', onStreamError(result));
        wr.on('error', onStreamError(result));
       
        wr.on('close', function () {
            result.resolve(require('../models/' + file));
        });
        return result.promise;
    };


    var promises = paths.map(function (path) { 
        if (path.match(/\/$/g)) {
            var inner = fs.readdirSync(path).filter(function (file) {
                return !file.match(/^\./g);
            }).map( function (file) {
                return loadModel(path, file)
            });
            return Q.all(inner);
        }
        return loadModel(path, '');
    });

    return Q.all(promises).then(function (results) {
        return _.flatten(results).reduce(function (res, model) {
            res[model.collection.name] = model;
            return res;
        }, {});
    }).fail(function (err) {
        console.error(err);
    });
};

module.exports = configModels;
