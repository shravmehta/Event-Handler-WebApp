var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connectionSchema = new Schema({
  connectionID: String,
  connection_name: String,
  connection_topic: String,
  connection_host: String,
  connection_display: String,
  details: String,
  connection_location: String,
  date_time: String
});

var connection_model = mongoose.model('Connections',connectionSchema, 'Connections');


module.exports.addConnections = function(connectionID,connection_name,connection_topic,connection_host,connection_display,details,connection_location,date_time){
var connections = new connection_model({connectionID:connectionID,connection_name:connection_name,connection_topic: connection_topic, connection_host:connection_host,connection_display:connection_display,details:details,connection_location:connection_location,date_time:date_time});
connections.save(function(err){
  if(err) console.log("error addin the connection" +err);
})
};

module.exports.getConnections = function(){
  try{
    return connection_model.find();
  } catch(err){ console.log("error getting connections" +err);
  }
};

module.exports.getConnection = async function(connID){  
   try{
     return await connection_model.findOne({connectionID: connID});
   } catch(err){
     console.log("error fetching single connection" +err);
     
   }
  };

  module.exports.removeConnection = function(connID){
    try{
        return connection_model.deleteOne({connectionID:connID});
    }catch(err){console.log("couldnot remove connnection" +err);
    }
  };


  module.exports.validation = async function(input){
    try{
      var test = await connection_model.findOne({connectionID: input});
      
    if(typeof(test)=== "undefined"||test===null){
      return false;
    } else {
      return true;
    }
  } catch(err){
    console.log("No match! validation" +err);
    
  }
}

module.exports.getLastConnection = function () {
  try{
    var last_conn = connection_model.find().limit().sort({$natural:-1});
    return last_conn;
  }
  catch(err){
    console.log("couldnot fetch last conn");
    
  }
}

