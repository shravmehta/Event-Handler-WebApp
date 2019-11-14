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
        console.log(req.session.theUser);
        
       // console.log(req.session.theUser);
        if(req.session.theUser != null){
        req.session.theUser.connections = connectionDB.getUserConnections('U01');
        //console.log(user_profile_conn);
               
        res.render('savedconnections', {connectiondata: req.session.theUser.connections, user: req.session.theUser});
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
                //console.log("IN UPDATE RSVP "+req.query.rsvp);
                
                
                var connections_list = connectionDB.getconnections();
                // console.log(connections_list);
                
                 for(var i =0; i<connections_list.length; i++){
                     if(requestID === connections_list[i].connectionID){
                            if(requestRsvp === 'yes'){
                                console.log("IN YES");
                                
                                for(var i = 0; i < req.session.theUser.rsvp.length;i++){
                                    console.log("SESSION RSVPP ARRAY"+JSON.stringify(req.session.theUser.rsvp[i]));
                                    console.log("Session id "+req.session.theUser.rsvp[i].connectionID +" Query id "+req.query.connectionid);

                                    if(req.session.theUser.rsvp[i].connectionID === req.query.connectionid){
                                        console.log("MATCH");

                                    }
                                }
                                getconnectionlist = connectionDB.getconnection(requestID);
                                getconnectionlist.rsvp
                                userconn = UserConnection.userConnection(getconnectionlist, requestRsvp, requestUser);
                                userconnectionlist.push(userconn);
                                // new userProfile(requestUser, userconnectionlist);

                                var userprofileobject = new userProfile.userProfile(requestUser, userconnectionlist);
                                var connection_data = userprofileobject.getConnections();
                                req.session.theUser.connections.push(connection_data);
                                var connectiondetails = req.session.theUser.connections;
                                var userdetails = req.session.theUser;
                               
                                


                                
                                res.render('savedconnections', {connectiondata: connectiondetails, user: userdetails});
                            }
                            else if(requestRsvp === 'maybe'){
                                getconnectionlist = connectionDB.getconnection(requestID);
                                userconn = UserConnection.userConnection(getconnectionlist, requestRsvp, requestUser);
                                userconnectionlist.push(userconn);

                                var userprofileobject = new userProfile(requestUser, userconnectionlist);
                                var connection_data = userprofileobject.getConnections();
                                req.session.theUser.connections.push(connection_data);
                                var connectiondetails = req.session.theUser.connections;
                                var userdetails = req.session.theUser;
                                

                                res.render('savedconnections',{connectiondata: connectiondetails, user: userdetails});
                            }
                            else if (rsvp ==='no'){
                                res.render('savedconnections',{connectiondata: connectiondetails, user: userdetails});
                            }
                            else{
                                res.send('invalid rsvp value. Please enter an valid input for rsvp');
                            }
                        }
                     }
                 }
             }
        else if(req.query.action === 'delete'){
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