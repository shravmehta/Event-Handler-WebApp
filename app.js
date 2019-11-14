var http = require('http');
var express = require('express');
var connection_function = require('./model/connection');
var profilecontroller = require('./routes/ProfileController');
var session = require('express-session');
var connectiondb = require('./model/connectionDB');

var app = express();


app.use('/resources', express.static('./resources'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({secret: 'Shrav', saveUninitialized:true, resave:false}));


app.get('/' , (req,res)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }

    // console.log("TEST 1"+connectiondb.validation("EH_01"));
    // console.log("TEST 2"+connectiondb.validation("jsahd"));

    res.render('index',{header:req.session.header});
});

app.get('/home' , (req,res)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    res.render('index',{header:req.session.header});
});

app.get('/connections', (req,res)=>{
    if(req.session.theUser!== undefined){
       req.session.header = true;
    } else {
        req.session.header = false;
    }
    var conndata = connectiondb.getconnections();
    res.render('connections', {connectiondata: conndata,header:req.session.header});
});

app.get('/connection', (req,res)=>{
    
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
   var reqid = req.query.connectionid;
   if(reqid === undefined){
    //    console.log("in if" + reqid);
       
       var conndata = connectiondb.getconnections();
    //    console.log(conndata);
       
       res.render('connections', {connectiondata: conndata,header:req.session.header});
   }
   else if(connectiondb.validation(reqid)){
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    //    console.log("in else if" +reqid);
       
    res.render('connection', {connectiondata: connectiondb.getconnection(reqid),header:req.session.header});
   }
   else{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    //    console.log("in else" +reqid);
       
    var conndata = connectiondb.getconnections();
    res.render('connections', {connectiondata: conndata,header:req.session.header});
   }

});


app.use(profilecontroller);

app.get('/about', (req,res)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    res.render('about',{header:req.session.header});
});

app.get('/contact', (req,res)=>{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
    res.render('contact',{header:req.session.header});
});

app.get('/*', (req,res)=>{
    res.send('ERROR 404! Page Not Found. Please enter a valid address!!');
});

app.listen(3000);
console.log('listening on port 3000....');
