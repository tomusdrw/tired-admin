
var config;

require('./app/config_reader')('admin.json').then(function (cfg) {
    config = cfg;
    return require('./app/config_mongoose')(config.dbpath);
}).then(function (mongoose) {
    return require('./app/config_models')(config.models);
}).then(function (models) {
    console.log(models);
})

.done();

