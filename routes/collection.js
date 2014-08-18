
var Collection = function (models) {
    
    return {
        collection: function (req, res) {
            var name = req.params.collection;
            var mod = models[name];
        
            if (!mod) {
                res.send(404);
                return;
            }

            mod.find({}).exec().then(function (items) {
                res.render('collection.jade', {
                    collection: name,
                    items: items
                });
            }, function (err) {
                console.error(err);
                res.send(400);
            });
        },
        item: function (req, res) {
            var name = req.params.collection;
            var id = req.params.id;
            var mod = models[name];

            if (!mod) {
                res.send(404);
                return;
            }

            mod.findById(id).exec().then(function (item) {
                res.render('item.jade', {
                    id: item._id,
                    item: JSON.stringify(item, undefined, 2)
                });
            }, function (err) {
                console.error(err);
                res.send(400);
            })
        }
    }
};

module.exports = Collection;
