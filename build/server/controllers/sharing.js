// Generated by CoffeeScript 1.10.0
var File, Folder, User, async, clearance, clearanceCtl, fs, helpers;

File = require('../models/file');

Folder = require('../models/folder');

User = require('../models/user');

helpers = require('../helpers/sharing');

clearance = require('cozy-clearance');

async = require('async');

fs = require('fs');

clearanceCtl = clearance.controller({
  mailTemplate: function(options, callback) {
    return User.getUserInfo(function(err, user) {
      if (err != null) {
        return callback(err);
      } else {
        options.type = options.doc.docType.toLowerCase();
        options.displayName = user.name || localization.t('default user name');
        options.displayEmail = user.email;
        options.localization = localization;
        options.displayLabel = localization.t("view " + options.type);
        return callback(null, mailTemplate(options));
      }
    });
  },
  mailSubject: function(options, callback) {
    var name, type;
    type = options.doc.docType.toLowerCase();
    name = options.doc.name;
    return User.getDisplayName(function(err, displayName) {
      if (err != null) {
        return callback(err);
      } else {
        displayName = displayName || localization.t('default user name');
        return callback(null, localization.t('email sharing subject', {
          displayName: displayName,
          name: name
        }));
      }
    });
  },
  attachments: [
    {
      path: fs.realpathSync('./build/client/public/images/cozy-logo.png'),
      filename: 'cozy-logo.png',
      cid: 'cozy-logo'
    }
  ]
});

module.exports.fetch = function(req, res, next, id) {
  return async.parallel([
    function(cb) {
      return File.find(id, function(err, file) {
        return cb(null, file);
      });
    }, function(cb) {
      return Folder.find(id, function(err, folder) {
        return cb(null, folder);
      });
    }
  ], function(err, results) {
    var doc, file, folder;
    file = results[0], folder = results[1];
    doc = file || folder;
    if (doc) {
      req.doc = doc;
      return next();
    } else {
      err = new Error('bad usage');
      err.status = 400;
      return next(err);
    }
  });
};

module.exports.details = function(req, res, next) {
  return req.doc.getInheritedClearance(function(err, inherited) {
    if (err != null) {
      return next(err);
    } else {
      return res.send({
        inherited: inherited
      });
    }
  });
};

module.exports.change = function(req, res, next) {
  var body, changeNotification, ref;
  ref = req.body, clearance = ref.clearance, changeNotification = ref.changeNotification;
  body = {
    clearance: clearance,
    changeNotification: changeNotification
  };
  return req.doc.updateAttributes(body, function(err) {
    if (err) {
      return next(err);
    }
    return res.send(req.doc);
  });
};

module.exports.sendAll = clearanceCtl.sendAll;

module.exports.contactList = clearanceCtl.contactList;

module.exports.contactPicture = clearanceCtl.contactPicture;

module.exports.contact = clearanceCtl.contact;
