#!/usr/bin/env node

var config;

require('./app/config_reader')('admin.json').then(function(cfg) {
  config = cfg;
  return require('./app/config_mongoose')(config.dbpath);
}).then(function(mongoose) {
  return require('./app/config_models')(config.models);
}).then(function(models) {
  return require('./app/config_express')(models);
}).done(function() {
  console.log("Started at localhost:5090");
});
