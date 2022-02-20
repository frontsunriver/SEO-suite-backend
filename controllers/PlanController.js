const {Plan} = require('../models/Plan');
const ObjectId = require('mongodb').ObjectID;
exports.create = function(req, res) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const country = req.body.country;
    const city = req.body.city;
    const zip_code = req.body.zip_code;
    const email = req.body.emial;
    if (!first_name || !city) {
      return res.send({ status: false, msg: 'You must provide name and city'});
    }
  
    // See if a user with the given email exists
    Plan.findOne({ email: email }, function(err, existingEmail) {
      if (err) { 
        return res.send({ status: false, msg: 'Something went wrong!'});
      }
  
      // If a user with email does exist, return an error
      if (existingEmail) {
        return res.send({ status: false, msg: 'Email is in use' });
      }
      // If a user with email does NOT exist, create and save user record
      const plan = new Plan({
        first_name: first_name,
        last_name: last_name,
        country: country,
        city: city,
        zip_code: zip_code
      });
  
      plan.save(function(err) {
        if (err) { 
          return res.send({status:false, msg:"Something went wrong!"}); 
        }
        // Repond to request indicating the user was created
        res.send({status:true, msg:"success"});
      });
    });
}
exports.update = function(req, res, next) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const country = req.body.country;
  const city = req.body.city;
  const zip_code = req.body.zip_code;
  if (!first_name || !city) {
    return res.send({ status: false, msg: 'You must provide name and city'});
  }
  Plan.findById(req.body._id, function(err, p) {
    if (!p)
      return res.send({ status: false, msg: "Could not load Document"});
    else {
      // do your updates here
      p.first_name = first_name;
      p.last_name = last_name;
      p.country = country;
      p.city = city;
      p.zip_code = zip_code;
      p.save(function(err) {
        if (err) { 
          return res.send({status:false, msg:"Something went wrong!"}); 
        }
        // Repond to request indicating the user was created
        res.send({status:true, msg:"success"});
      });
    }
  });
}
exports.delete = function(req, res, next) {
    const _id = ObjectId(req.body._id);
    // If a user with email does NOT exist, create and save user record
    const plan = new Plan({
      _id: _id
    });
  
    plan.delete(function(err) {
      if (err) { 
        return res.send({status:false, msg:"Something went wrong!"}); 
      }
      // Repond to request indicating the user was created
      res.send({status:true, msg:"success"});
    });
}
exports.get = function(req, res, next) {
    Plan.find({}, function(err, lists){
        if(err){
          return res.send({status:false, msg:"Something went wrong!"}); 
        }
        else {
          res.send({status: true, msg:"success", data:lists});
        }
    });
}
