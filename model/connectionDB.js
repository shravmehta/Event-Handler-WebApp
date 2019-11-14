var connectiond = require('./connection');
var userDB = require('./userDB');

var data = [{connectionID: 'EH_01', connection_name: "UNCC Soccer event", connection_topic:"Sports", connection_host: "Jon Snow", connection_display:"../resources/img/jon_snow.jpg", details:"We are organizing a friendly soccer match. we need 22 people for the match so please register.", connection_location: "Winterfell",date_time:"10/27/19 18:00", user_yes: ["U01"], user_maybe: []},
{connectionID: 'EH_02', connection_name: "Cricket at Lot 5a", connection_topic:"Sports", connection_host: "Robb Stark", connection_display:"../resources/img/robb_stark.jpg", details:"We are organizing a friendly cricket match. we need 22 people for the match so please register and please be on time.",connection_location: "Winterfell", date_time:"10/21/19 15:00", user_yes: [], user_maybe: []},
{connectionID: 'EH_03', connection_name: "Tennis on weekend", connection_topic:"Sports", connection_host: "Arya Stark", connection_display:"../resources/img/arya_stark.jpg", details:"I want sombody to join me to play tennis on weekends. please let me know if anybody is interested.",connection_location: "Winterfell", date_time:"10/14/19 10:00",user_yes: [], user_maybe: ["U01"]},
{connectionID: 'EH_04', connection_name: "NBAD study group", connection_topic:"Education", connection_host: "Daenerys Targaryen ", connection_display:"../resources/img/danny_stark.png", details:"This event is for people who are taking NBAD this semester, we can meet this weekend to complete the milestone 2 assignment in the library.",connection_location: "Winterfell", date_time:"10/14/19 12:00",user_yes: [], user_maybe: []},
{connectionID: 'EH_05', connection_name: "Study group for midterms", connection_topic:"Education", connection_host: "Sansa Stark", connection_display:"../resources/img/sansa_stark.png", details:"This event is for people who are taking cloud computing, we can meet this weekend to study the content for the midterms.",connection_location: "Winterfell", date_time:"10/14/19 14:00",user_yes: [], user_maybe: []},
{connectionID: 'EH_06', connection_name: "Leetcode and coffee", connection_topic:"Education", connection_host: "Bran Stark", connection_display:"../resources/img/bran_stark.png",details:"For the people who are graduating this sem or next sem, we can meet every weekends and practice interview questions and get coffee from starbucks.",connection_location: "Winterfell", date_time:"10/14/19 20:00",user_yes: [], user_maybe: []}];


module.exports.getconnections = function(){
  var all_connection =[];
  for(var i=0; i<data.length; i++){
    var connDB = new connectiond.connection(data[i].connectionID, data[i].connection_name, data[i].connection_topic, data[i].connection_host, data[i].connection_display, data[i].details, data[i].connection_location, data[i].date_time);
    all_connection.push(connDB);
  }
  // console.log(all_connection);
  
  return all_connection;
};

module.exports.getconnection = function(connID){
  console.log("you called ");
  
    for(var i=0; i< data.length; i++){
      console.log(i+")"+connID+"--->"+data[i].connectionID);
      
        if(data[i].connectionID === connID){
            var matchedconn = new connectiond.connection(data[i].connectionID, data[i].connection_name, data[i].connection_topic, data[i].connection_host, data[i].connection_display, data[i].details, data[i].connection_location, data[i].date_time);
        }
    }
    console.log(matchedconn +" we found");
    
    return matchedconn;
  };

  module.exports.getUserConnections = function(userid){
            console.log("connectionDB MATCH FOUND "+JSON.stringify(userDB.getUser(userid).rsvp));
            var connections = [];
            for(var i =0; i < userDB.getUser(userid).rsvp.length;i++){
              console.log(userDB.getUser(userid).rsvp[i].connectionID);
              
                connections.push(this.getconnection(userDB.getUser(userid).rsvp[i].connectionID));
            }
            console.log("connectionDB MATCH FOUND "+JSON.stringify(connections));

    return connections;
  }
  
  module.exports.getconnectionByUser = function(userid){
    var finalconn = [];
    for(var i=0; i<data.length; i++){
      if(data[i].user_yes == userid || data[i].user_maybe ==userid){
        var connuser = new connectiond.connection(data[i].connectionID, data[i].connection_name, data[i].connection_topic, data[i].connection_host, data[i].connection_display, data[i].details, data[i].connection_location, data[i].date_time);
        finalconn.push(connuser);
      }
    }
    return finalconn;
  };

  module.exports.validation = function(input){
    console.log("IN validation function "+input);
    for(var i = 0; i < data.length;i++){
      if(input == data[i].connectionID){
        // console.log("MATCH FOUND "+input+ "with"+data[i].connectionID);
        
        return true;
      }
      // console.log("MATCH NO MATCH "+input+ "with"+data[i].connectionID);
    }
    return false;
  }
