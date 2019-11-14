var userProfile = require('../model/UserProfile');
var userDB = require('../model/userDB');
var userdata = require('../model/user');
var connectionDB = require('../model/connectionDB');
var UserConnection = require('../model/UserConnection');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended: false});
var app = express();

app.use(session({secret: 'Shrav', saveUninitialized:true, resave:false}));

module.exports = router.get('/newConnection', (req,res)=>{
        
     if(typeof req.session.theUser === 'undefined' ){
        req.session.theUser = userDB.getUser('U01');
        req.session.theUser.connectionList=[];

        for(var i = 0; i < req.session.theUser.rsvp.length;i++){
            var connection = connectionDB.getconnection(req.session.theUser.rsvp[i].connectionID);
            var connObject = {
                connectionID: connection.connectionID,
                connection_name: connection.connection_name,
                connection_topic: connection.connection_topic,
                connection_host: connection.connection_host,
                connection_display: connection.connection_display,
                details: connection.details,
                date_time: connection.date_time,
                location: connection.location,
                rsvp:req.session.theUser.rsvp[i].rsvp
            }
            req.session.theUser.connectionList.push(connObject);
            }
        
       console.log(req.session.theUser.connectionList);
        if(req.session.theUser != null){
        req.session.theUser.connections = connectionDB.getUserConnections('U01');               
        res.render('savedconnections', {connectiondata: req.session.theUser.connectionList, user: req.session.theUser});
    }
    else{
        res.send('no session');
    }
}
    else{
        res.render('newConnection');
    }
});

module.exports = router.get('/savedconnections', (req,res)=>{
    console.log("we inside savedconnection checking for the user session");
   var requestID = req.query.connectionid;
    var requestRsvp = req.query.rsvp;
   var  requestUser = req.session.theUser.userID;
   var userconnectionlist = [];
   var getconnectionlist =[];
   var userConn;
   

   console.log("ACTION "+req.query.action);
   


         if(typeof req.session.theUser != undefined){
           
            if(req.query.action === 'updateRSVP'){ 
                var found = false;  
                if(req.query.rsvp !== "No"){
                    for(var i = 0; i < req.session.theUser.connectionList.length;i++){
                        console.log(req.query.connectionid);
                        console.log(req.session.theUser.connectionList[i].connectionID);
                        if(req.session.theUser.connectionList[i].connectionID===req.query.connectionid){
                            console.log(" YOU UPDATED CONNECTION ---->"+req.session.theUser.connectionList[i].connection_name);
                            req.session.theUser.connectionList[i].rsvp = req.query.rsvp;
                            found = true;
                        }
                    }  

                    if(!found){
                        var connection = connectionDB.getconnection(req.query.connectionid);
                        var connObject = {
                            connectionID: connection.connectionID,
                            connection_name: connection.connection_name,
                            connection_topic: connection.connection_topic,
                            connection_host: connection.connection_host,
                            connection_display: connection.connection_display,
                            details: connection.details,
                            date_time: connection.date_time,
                            location: connection.location,
                            rsvp:req.query.rsvp
                        }
                        req.session.theUser.connectionList.push(connObject);
                    }

                } else {
                    var keepConnections = [];
                    console.log("DELETE");
                    
                    for(var i = 0; i < req.session.theUser.connectionList.length;i++){
                        console.log(req.query.connectionid);
                        console.log(req.session.theUser.connectionList[i].connectionID);
                        if(req.session.theUser.connectionList[i].connectionID!==req.query.connectionid){
                            console.log("IN IF");
                            
                            console.log(req.session.theUser.connectionList[i].connectionID);
                            console.log(req.query.connectionid);

                            
                            keepConnections.push(req.session.theUser.connectionList[i])
                        }
                    } 
                    console.log("SESSION LIST "+keepConnections);

                    req.session.theUser.connectionList = keepConnections;
                    console.log("SESSION LIST "+req.session.theUser.connectionList);
                }
                    res.render('savedconnections',{connectiondata: req.session.theUser.connectionList, user: req.session.theUser});  
                 }

             }
        else if(req.query.action === 'cancel'){
            var connID = req.query.connectionid;
            var theUser = req.session.theUser;
           for(var i=0; i< theUser.connections.length; i++){
               if(theUser.connections.length === 1){
                   if(theUser.connections[i].connectionID === connID){
                       theUser.connections.splice(i-1,1);
                   }
                   else{
                       theUser.connections[i].splice(i,1);
                   }
               }
           }
        }
        else if(req.query.action === 'signout'){
            req.session.destroy(function(err) {
                if (err) {
                  console.log("error deleting session");
                }
              });
              res.redirect('index');
        }
        else{
            res.render('savedconnections');
        }
       
     });

     function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }