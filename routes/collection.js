
var Collection = function (models) {
    
    return function (req, res) {
        var name = req.params.collection;
        var mod = models[name];
        
        if (!mod) {
            res.send(404);
            return;
        }

        mod.find({}).exec().then(function (items) {
            res.send(items);
        }, function (err) {
            console.error(err);
            res.send(400);
        });

    };
};

module.exports = Collection;
