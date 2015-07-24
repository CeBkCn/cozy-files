// Generated by CoffeeScript 1.9.0
var File, Folder, RealtimeAdapter, feed, init, localization;

localization = require('./lib/localization_manager');

RealtimeAdapter = require('cozy-realtime-adapter');

File = require('./models/file');

Folder = require('./models/folder');

feed = require('./lib/feed');

init = require('./helpers/init');

module.exports.beforeStart = function(callback) {
  return localization.initialize(callback);
};

module.exports.afterStart = function(app, server, callback) {
  var realtime, updateIndex;
  feed.initialize(server);
  realtime = RealtimeAdapter(server, ['file.*', 'folder.*', 'contact.*'], {
    path: '/public/socket.io'
  });
  init.updateIndex();
  updateIndex = function(type, id) {
    return type.find(id, function(err, file) {
      if (err) {
        if (err) {
          return console.log("updateIndex err", err.stack);
        }
      }
      if (!file) {
        return console.log("updateIndex : no file", id);
      }
      return file.index(['name'], function(err) {});
    });
  };
  realtime.on('file.create', function(event, id) {
    return updateIndex(File, id);
  });
  realtime.on('folder.create', function(event, id) {
    return updateIndex(Folder, id);
  });
  realtime.on('file.update', function(event, id) {
    return updateIndex(File, id);
  });
  realtime.on('folder.update', function(event, id) {
    return updateIndex(Folder, id);
  });
  if (callback != null) {
    return callback(app, server);
  }
};
