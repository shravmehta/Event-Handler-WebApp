userd = require('./user');
var user_data =[
    {userID: 'U01', first_name: 'Shrav', last_name: 'Mehta', email: 'xyz@abc.com', country: 'United States', connection_yes: ["EH02"], connection_maybe: ["EH03"],rsvp:[{connectionID:"EH_02",rsvp:"yes"},{connectionID:"EH_03",rsvp:"maybe"}] },
                
    {userID: 'U02', first_name: 'Michael', last_name: 'Scott', email: 'michael@paper.com', Country: 'United States', connection_yes:["EH01"], connection_maybe: ["EH05"],rsvp:[]}];

module.exports.getUsers = function(){
    all_users =[];
   for(var i=0; i< user_data.length; i++){
        var userDB = new userd.user(user_data[i].userID,user_data[i].first_name, user_data[i].last_name, user_data[i].email, user_data[i].country, user_data[i].connection_yes, user_data[i].connection_maybe, user[i].rsvp);
        all_users.push(userDB);
   };
   return all_users;
};

module.exports.getUser = function(uid){
    for(var i=0; i<user_data.length; i++){
        if(user_data[i].userID === uid){
            var user_profile = new userd.user(user_data[i].userID,user_data[i].first_name, user_data[i].last_name, user_data[i].email, user_data[i].country, user_data[i].connection_yes, user_data[i].connection_maybe,user_data[i].rsvp);
        }
    }
    return user_profile;
};