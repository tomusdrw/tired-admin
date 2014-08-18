var _ = require('lodash');

var Index = function (models) {
    var collections = _.sortBy(_.keys(models));

    return function (req, res) {
        res.render('index.jade', {
            collections: collections
        });
    };
};

module.exports = Index;

