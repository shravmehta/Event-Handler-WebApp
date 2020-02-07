var http = require('http');
var express = require('express');
var profilecontroller = require('./routes/ProfileController');
var session = require('express-session');
var connectiondb = require('./model/connectionDB');

var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/EventHandler',function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});


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

app.get('/connections', async (req,res)=>{
    if(req.session.theUser!== undefined){
       req.session.header = true;
    } else {
        req.session.header = false;
    }
    var conndata = await connectiondb.getConnections();
    res.render('connections', {connectiondata: conndata,header:req.session.header});
});

app.get('/connection', async (req,res)=>{
    
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
   var reqid = req.query.connectionid;
   if(reqid === undefined){
       
    var conndata = await connectiondb.getConnections();
       
       res.render('connections', {connectiondata: conndata,header:req.session.header,loggeduser:false});
   }else if(await connectiondb.validation(reqid)&&req.session.theUser!==undefined){
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
       var conndata = await connectiondb.getConnection(reqid);
    var testName = req.session.theUser.first_name+req.session.theUser.last_name;
    if(conndata.connection_host===testName){
        res.render('connection', {connectiondata: conndata ,header:req.session.header,loggeduser:true});
    } else {
        res.render('connection', {connectiondata: conndata ,header:req.session.header,loggeduser:false});
    }
   }
   else if(await connectiondb.validation(reqid)){
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
       var conndata = await connectiondb.getConnection(reqid);
   
       
    res.render('connection', {connectiondata: conndata ,header:req.session.header,loggeduser:false});
   }
   else if(await connectiondb.validation(reqid)=== false){
      
       
    res.send("error 404: Connection does not exist");
}
   else{
    if(req.session.theUser!== undefined){
        req.session.header = true;
     } else {
         req.session.header = false;
     }
       
    var conndata = await connectiondb.getConnections();
    res.render('connections', {connectiondata: conndata,header:req.session.header,loggeduser:false});
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
