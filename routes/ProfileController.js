var userProfile = require('../model/UserProfile');
var userDB = require('../model/userDB');
var path = require('path');
var connectionDB = require('../model/connectionDB');
var UserConnectionDB = require('../model/UserConnection');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyparser = require('body-parser');
const {check,validateInput} = require('express-validator');
router.use(bodyparser.json());
var urlencodedparser = bodyparser.urlencoded({extended: false});
var app = express();
var bcrypt = require('bcrypt');
var bcrypt_saltingrounds = 12;

const fileUpload = require('express-fileupload');
var busboy = require('connect-busboy');
var fs = require('fs');

app.use(busboy());
app.use(session({secret: 'Shrav', saveUninitialized:true, resave:false}));
app.use(express.static(path.join(__dirname, '/resources')));
app.use(fileUpload());
module.exports = router.get('/login', (req,res)=>{
   
    res.render('login',{error: false});
});


module.exports = router.post('/login',urlencodedparser,[check('email').isEmail().withMessage('Invalid EmailID')], async function(req,res,next){

    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
      }
      await userDB.getUserbyemail(req.body.email).then(function(user){
          if(!user){
              res.render('login',{error:true});
          }else{
              bcrypt.compare(req.body.password,user.password,async function(err, accept){
                  if(accept === true){
                    req.session.connectionList = await UserConnectionDB.getUserconnections(user.userID);
                    var user_object ={
                        userID: user.userID,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        country: user.country
                    }
                    req.session.theUser = user_object;
                    res.redirect('savedconnections');
                  }else{
                      res.render('login',{error:true});
                      
                  }
              });
          }
      });
});

module.exports = router.get('/signup', (req,res)=>{
   
    res.render('signup',{error:false});
});

module.exports = router.post('/signup',urlencodedparser, async (req,res,next)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    var number = Math.floor(Math.random() * 90 + 10);
    var userID = 'U' + number;
 
    var password = req.body.password;
    var confirm_pass = req.body.confirmpassword;
 
    if(password !== confirm_pass){
        res.render('signup',{error:true});
    }else{
        bcrypt.hash(password, bcrypt_saltingrounds).then(async function(hashedpass){
            await userDB.addNewuser(userID,req.body.first_name,req.body.last_name,req.body.email,hashedpass,req.body.country);
            res.redirect('login');
        }).catch(function(err){
            console.log(err); 
            next();
        })
    }
});


module.exports = router.get('/newConnection', (req,res)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    res.render('newconnection',{header:req.session.header,exists:false});
});

module.exports = router.post('/newConnection',urlencodedparser, async (req,res,next)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }

     if(typeof req.session.theUser !== 'undefined'){
         var username = (req.session.theUser.first_name + req.session.theUser.last_name);
         var number = Math.floor(Math.random() * 90 + 10);
         var connectionID = 'EH_' + number;
         var event_img_path = "../resources/img/jim_halpert.jpg";
      

         await connectionDB.addConnections(connectionID,req.body.eventname,req.body.topic,username,event_img_path,req.body.details,req.body.location,req.body.time);
         res.redirect('connection');
     }else{
         res.render('login');
     }
        
});

module.exports = router.post('/editConnection',urlencodedparser, async (req,res,next)=>{
    
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }

     await connectionDB.removeConnection(req.session.editingconnection);



         var username = (req.session.theUser.first_name + req.session.theUser.last_name);
         var number = Math.floor(Math.random() * 90 + 10);
         var connectionID = req.session.editingconnection;
         var event_img_path = "../resources/img/jim_halpert.jpg";
      

         await connectionDB.addConnections(connectionID,req.body.eventname,req.body.topic,username,event_img_path,req.body.details,req.body.location,req.body.time);
         res.redirect('connection');
        
});

module.exports = router.get('/savedconnections', async (req,res)=>{
    
    
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
  
         if(req.session.theUser){
            if(req.query.action === 'updateRSVP'){ 

                var found = false;  
                if(req.query.rsvp === "Delete"){
                     await connectionDB.removeConnection(req.query.connectionid);
                     res.redirect('connections');
                }
                else if(req.query.rsvp !== "Edit"){
                    for(var i = 0; i < req.session.connectionList.length;i++){
                        
                        if(req.session.connectionList[i].connectionID===req.query.connectionid){
                            
                            req.session.connectionList[i].rsvp = req.query.rsvp;
                            await UserConnectionDB.updateRsvp(req.session.theUser.userID,req.session.connectionList[i].connectionID,req.session.connectionList[i].rsvp);
                            found = true;
                        }
                    }  

                    if(!found){
                        
                        var connection = await connectionDB.getConnection(req.query.connectionid);
                        var connObject = {
                            userID: req.session.theUser.userID,
                            connectionID: connection.connectionID,
                            connection_name: connection.connection_name,
                            connection_topic: connection.connection_topic,
                            rsvp:req.query.rsvp
                        }
                        await UserConnectionDB.adduserConnection(req.session.theUser.userID,req.query.connectionid, connection.connection_name, connection.connection_topic,req.query.rsvp);
                        req.session.connectionList.push(connObject);
                    }
                    res.render('savedconnections',{connectiondata: req.session.connectionList, user: req.session.theUser, header:req.session.header}); 
                } else{
                    
                    var connection = await connectionDB.getConnection(req.query.connectionid);
                    
                    req.session.editingconnection = connection.connectionID;
                    res.render('editConnection',{data: connection, header:req.session.header,exists:true}); 

                }
          }
             
             else if(req.query.action === 'delete'){
        
            var keepConnections = [];
            for(var i = 0; i < req.session.connectionList.length;i++){
                await UserConnectionDB.deleteuserConnection(req.session.theUser.userID,req.query.connectionid);
                if(req.session.connectionList[i].connectionID!==req.query.connectionid){
        
                    keepConnections.push(req.session.connectionList[i]);
                } 
            } 

            req.session.connectionList = await UserConnectionDB.getUserconnections(req.session.theUser.userID);
            res.render('savedconnections',{connectiondata: req.session.connectionList, user: req.session.theUser, header:req.session.header});  

        }
        else if(req.query.action === 'signout'){
           
            req.session.destroy(function(err) {
                if (err) {
                  console.log("error deleting session");
                }
              });
              res.redirect('/home');
        } else{     
        res.render('savedconnections',{connectiondata: req.session.connectionList, user: req.session.theUser,header:req.session.header});
         }
        } else {
            res.render('savedconnections',{header:req.session.header});
        }
     });


     module.exports = router.get('/myconnections', (req,res)=>{
         res.redirect('savedconnections');
     });


