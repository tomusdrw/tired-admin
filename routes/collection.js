
var Collection = function (models) {
    
    return {
        collection: function (req, res) {
            var name = req.params.collection;
            var mod = models[name];
        
            if (!mod) {
                res.send(404);
                return;
            }

            mod.find({}).select('_id').exec().then(function (items) {
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
                    collection: name,
                    item: item,
                    prettyItem: JSON.stringify(item, undefined, 2)
                });
            }, function (err) {
                console.error(err);
                res.send(400);
            })
        },
        edit: function (req, res) {
            var name = req.params.collection;
            var id = req.params.id;
            var mod = models[name];

            if (!mod) {
                res.send(404);
                return;
            }

            var obj = JSON.parse(req.body.item);
            if (!obj) {
                res.send(404);
                return;
            }

            delete req.body._id;
            delete req.body._ver;
            mod.findOneAndUpdate({
                _id: id 
            }, obj).lean().exec().then(function (item) {
                res.redirect('/collection/' + name); 
            }, function (err) {
                console.error(err);
                res.send(400, err);
            });
        }
    }
};

module.exports = Collection;
