const {Workspace} = require('../models/Workspace');
const ObjectId = require('mongodb').ObjectID;

exports.create = function(req, res, next) {
    const domain = req.body.domain;
    const region = req.body.region;
    const language = req.body.language;
    if (!domain || !region) {
      return res.status(422).send({ error: 'You must provide domain and region'});
    }
  
    // See if a user with the given email exists
    Workspace.findOne({ domain: domain }, function(err, existingDomain) {
      if (err) { return next(err); }
  
      // If a user with email does exist, return an error
      if (existingDomain) {
        return res.status(422).send({ error: 'Domain is in use' });
      }
  
      // If a user with email does NOT exist, create and save user record
      const workspace = new Workspace({
        domain: domain,
        region: region,
        language: language
      });
  
      workspace.save(function(err) {
        if (err) { return next(err); }
        // Repond to request indicating the user was created
        res.send({status:200, msg:"success"});
      });
    });
}
exports.update = function(req, res, next) {
  const domain = req.body.domain;
  const region = req.body.region;
  const language = req.body.language;
  if (!domain || !region) {
    return res.status(422).send({ error: 'You must provide domain and region'});
  }
  Workspace.findById(req.body._id, function(err, p) {
    if (!p)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      p.domain = domain;
      p.region = region;
      p.language = language;
  
      p.save(function(err) {
        if (err) { return next(err); }
        // Repond to request indicating the user was created
        res.send({status:200, msg:"success"});
      });
    }
  });
}
exports.delete = function(req, res, next) {
  const _id = ObjectId(req.body._id);
  // If a user with email does NOT exist, create and save user record
  const workspace = new Workspace({
    _id: _id
  });

  workspace.delete(function(err) {
    if (err) { return next(err); }
    // Repond to request indicating the user was created
    res.send({status:200, msg:"success"});
  });
}
exports.get = function(req, res, next) {
  Workspace.find({}, function(err, lists){
    if(err){
        console.log(err);
    }
    else {
        res.json(lists);
    }
  });
}
