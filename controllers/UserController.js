const {User} = require('../models/User');
const crypto = require('crypto');
var md5sum = crypto.createHash('md5');
exports.signin = function(req, res){
    const email = req.body.email;
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');
    User.findOne({ email: email })
    .then(users => {
        if(users) {
            if(users.password == password) {
                res.send({status:200, msg: "success"});
            }else {
                return res.status(422).send({ msg: 'incorrect password'});
            }    
        }else {
            return res.status(422).send({ msg: 'user does not exist'});
        }        
    })
}

exports.signup = function(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');
    const address = req.body.address;
    if (!email || !password) {
      return res.status(422).send({ error: 'You must provide email and password'});
    }
  
    // See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }
  
      // If a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }
  
      // If a user with email does NOT exist, create and save user record
      const user = new User({
        username: username,
        email: email,
        password: password,
        address: address
        //role: 'user'
      });
  
      user.save(function(err) {
        if (err) { return next(err); }
        // Repond to request indicating the user was created
        res.send({status:200, msg:"success"});
      });
    });
}