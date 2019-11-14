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

    // console.log("TEST 1"+connectiondb.validation("EH_01"));
    // console.log("TEST 2"+connectiondb.validation("jsahd"));

    res.render('index');
});

app.get('/home' , (req,res)=>{
    res.render('index');
});

app.get('/connections', (req,res)=>{
    var conndata = connectiondb.getconnections();
    res.render('connections', {connectiondata: conndata});
});

app.get('/connection', (req,res)=>{
   var reqid = req.query.connectionid;
   if(reqid === undefined){
    //    console.log("in if" + reqid);
       
       var conndata = connectiondb.getconnections();
    //    console.log(conndata);
       
       res.render('connections', {connectiondata: conndata});
   }
   else if(connectiondb.validation(reqid)){
    //    console.log("in else if" +reqid);
       
    res.render('connection', {connectiondata: connectiondb.getconnection(reqid)});
   }
   else{
    //    console.log("in else" +reqid);
       
    var conndata = connectiondb.getconnections();
    res.render('connections', {connectiondata: conndata});
   }

});


app.use(profilecontroller);

app.get('/about', (req,res)=>{
    res.render('about');
});

app.get('/contact', (req,res)=>{
    res.render('contact');
});

// app.get('/*', (req,res)=>{
//     res.send('ERROR 404! Page Not Found. Please enter a valid address!!');
// });
app.listen(3000);
console.log('listening on port 3000....');
