var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var connectionDB = require('./connectionDB');
var Schema = mongoose.Schema;
var userconnectionSchema = new Schema({
    userID: String,
    connectionID: String,
    connection_name: String,
    connection_topic: String,
    rsvp: String
    
});

var userconnection_model = mongoose.model('UserConnection',userconnectionSchema, 'UserConnection');

module.exports.getUserconnections = function(uid){
    try{
        return userconnection_model.find({userID:uid});
    }catch(err){
        console.log("couldnt fetch userconnections"); 
    }
};

module.exports.getUserconnection = function(uid){
    try{
        return userconnection_model.findOne({userID:uid});
    }catch(err){
        console.log("couldnt fetch userconnections"); 
    }
};

module.exports.updateRsvp = function(userid, connid,rsvp){
    try{
        return userconnection_model.findOneAndUpdate({userID:userid, connectionID: connid},{$set:{rsvp: rsvp}},function(err,doc){
            // console.log(err);
            console.log("updated rsvp");
            // console.log(doc);
          });
    }catch(err){console.log(err);
    }
};

module.exports.adduserConnection = function(userid, connid, connname, conntopic, rsvp){
    try{
        var userconnection = new userconnection_model({userID: userid, connectionID: connid, connection_name: connname, connection_topic: conntopic, rsvp: rsvp});
        userconnection.save(function(err,userconn){
            if(err) console.log(err);
            console.log("Added new connection to user data");
        });
    }catch(err){
        console.log(err);   
    }
}

module.exports.deleteuserConnection = function(userid,connid){
    try {
        return userconnection_model.deleteOne({userID: userid,connectionID:connid});
        } catch(err) {
        console.log(err);
        console.log("cannot delete");
        
        }
}