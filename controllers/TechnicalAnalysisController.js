const {Technical} = require('../models/TechnicalAnalysis');
const ObjectId = require('mongodb').ObjectID;

exports.create = function(req, res) {
    const domain = req.body.domain;
    const region = req.body.region;
    const language = req.body.language;
    if (!domain || !region) {
      return res.send({ status: false, msg: 'You must provide domain and region'});
    }
  
    // See if a user with the given email exists
    Technical.findOne({ domain: domain }, function(err, existingDomain) {
      if (err) { 
        return res.send({status: false, msg: "Something went wrong!"});
      }
  
      // If a user with email does exist, return an error
      if (existingDomain) {
        return res.send({status: false, msg: "Domain is in use"});
      }
  
      // If a user with email does NOT exist, create and save user record
      const technical = new Technical({
        domain: domain,
        region: region,
        language: language
      });
  
      technical.save(function(err) {
        if (err) { 
          return res.send({status:false, msg: "Something went wrong!"});
        }
        // Repond to request indicating the user was created
        res.send({status: true, msg:"success"});
      });
    });
}
exports.update = function(req, res) {
  const domain = req.body.domain;
  const region = req.body.region;
  const language = req.body.language;
  if (!domain || !region) {
    return res.send({ status: false, msg: "You must provide domain and region"});
  }
  Workspace.findById(req.body._id, function(err, p) {
    if (!p)
     return res.send({status: false, msg:"Could not load Document"});
    else {
      // do your updates here
      p.domain = domain;
      p.region = region;
      p.language = language;
  
      p.save(function(err) {
        if (err) { 
         return res.send({status: false, msg: "Something went wrong!"});
        }
        // Repond to request indicating the user was created
        res.send({status: true, msg:"success"});
      });
    }
  });
}
exports.delete = function(req, res) {
  const _id = ObjectId(req.body._id);
  // If a user with email does NOT exist, create and save user record
  const workspace = new Workspace({
    _id: _id
  });

  workspace.delete(function(err) {
    if (err) { 
      return res.send({status: false, msg:"Something went wrong!"});
    }
    // Repond to request indicating the user was created
    res.send({status: true, msg:"success"});
  });
}
exports.get = function(req, res) {
    Technical.find({}, function(err, lists){
        if(err){
        return res.send({status: false, msg: "Something went wrong!"});
        }
        else {
        res.send({status: true, msg: "success", data:lists});
        }
    });
}
