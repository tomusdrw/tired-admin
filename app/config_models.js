var fs = require('fs'),
    _ = require('lodash');


var configModels = function (paths) {
    var loadModel = function (path, result) {
        var model = require(path);
        result[model.collection.name] = model.schema.tree;
    };

    return _.reduce(paths, function (result, path) {
        if (path.match(/\/$/g)) {
            fs.readdirSync(path).forEach( function (file) {
                loadModel(path + file, result);
            });
            return result;
        }

        loadModel(path, result);
        return result;
    }, {});
};

module.exports = configModels;
