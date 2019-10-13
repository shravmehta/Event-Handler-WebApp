var http = require('http');
var express = require('express');
var connection_function = require('./model/connection');

var app = express();
var connectiondb = require('./model/connectionDB');

app.use('/resources', express.static('./resources'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/' , (req,res,next)=>{
    res.render('index');
});

app.get('/home' , (req,res,next)=>{
    res.render('index');
});

app.get('/connections', (req,res,next)=>{
    var all_data = connectiondb.getconnections();
    var array_sports = [];
    var array_education= [];
    for(var i =0; i < all_data.length;i++){
        if(all_data[i].connection_topic === 'Sports'){
            array_sports.push(all_data[i]);
        }
        else if(all_data[i].connection_topic === 'Education'){
            array_education.push(all_data[i]);
        }
    }
    // console.log(array_sports);
    // console.log(array_education);
    res.render('connections',{sports: array_sports, education:array_education});
});

app.get('/connection', (req,res,next)=>{
    
    var connection_data = connectiondb.getconnection(req.query.id);
    //console.log(connection_data);
    res.render('connection',{connection_data:connection_data});
});



app.get('/newConnection', (req,res,next)=>{
    res.render('newConnection');
});

app.get('/savedconnections', (req,res,next)=>{
    var sports_data = connectiondb.getconnections();
    var saved_data = [];
    for (var i =0; i< sports_data.length; i++){
        if(sports_data[i].connection_topic === 'Sports'){
            saved_data.push(sports_data[i]);
        }
    }
    // console.log(saved_data);
    
    res.render('savedconnections', {saved_data:saved_data});
});

app.get('/about', (req,res,next)=>{
    res.render('about');
});

app.get('/contact', (req,res,next)=>{
    res.render('contact');
});
app.listen(3000);
console.log('listening on port 3000....');
