var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userID: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    country: String
});

var user_model = mongoose.model('Users' ,userSchema, 'Users');

module.exports.addNewuser = function(userID,first_name,last_name,email,password,country){
    var new_user = new user_model({userID:userID,first_name:first_name,last_name:last_name,email:email,password:password,country:country});
    new_user.save(function(err){
        console.log(err);
    });
}


module.exports.addUser = function(userID,first_name,last_name,email,password,country,connectionID, rsvp){
    var user = new user_model({userID:userID,first_name:first_name,last_name:last_name,email:email,password:password,country:country,rsvp:{connectionID:connectionID,rsvp:rsvp}});
    addUser(user);
}

module.exports.addUser = function(user){
    user.save(function(err){
        console.log("couldnt add user to db" +err);
        });
}


module.exports.getUsers = function(){
    try{
          return user_model.find();
    }catch(err){
        console.log("couldnot find all users");
        
    }
  };

  module.exports.getUser = function(uid){
    try{
        return user_model.findOne({userID:uid});
    }catch(err){
        console.log("couldnot find all users");
        
    }
};

module.exports.getLoginuser = function(email,pass){
    try{
        return user_model.findOne({email:email,password:pass});
    }catch(err){
        console.log("couldnt find the login user");
        
    }
}

module.exports.getUserbyemail = function(email){
    try{
        return user_model.findOne({email:email});
    }catch(err){console.log(err);
    }
}