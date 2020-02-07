 class userProfile{


    constructor(userid,userconn){
        this.userid = userid;
        this.userConnection = userconn;
    }

    adduserConnection(userid, connid, connname, conntopic, rsvp){
        try{
            var userconnection = new userconnection_model({userID: userid, connectionID: connid, connection_name: connname, connection_topic: conntopic, rsvp: rsvp});
            userconnection.save(function(err,userconn){
                if(err) console.log(err);
                console.log("Added new connection to user data");
            });
        }catch(err){
            console.log(err);
            
        }
    }

    deleteuserConnection(userid,connid){
        try {
            return userconnection_model.deleteOne({userID: userid,connectionID:connid});
            } catch(err) {
            console.log(err);
            console.log("cannot delete");
            
            }
    }

    updateRsvp(userid, connid,rsvp){
        try{
            return userconnection_model.findOneAndUpdate({userID:userid, connectionID: connid},{$set:{rsvp: rsvp}},function(err,doc){
                // console.log(err);
                console.log("updated rsvp");
                // console.log(doc);
              });
        }catch(err){console.log(err);
        }
    };

     getConnections(uid){
        try{
            return userconnection_model.findOne({userID:uid});
        }catch(err){
            console.log("couldnt fetch userconnections");
            
        }
     }

     emptyProfile(){
         this.userid = [];
         this.userConnection = [];
     }

}


module.exports ={
    userProfile: userProfile
}





// module.exports.userProfile = function(userid){
// for(var i=0; i<userdb.length; i++){
//     if(userid === userdb[i].userID){
//          user.append(userdb.getUser(userID));
//     }
//     //return user;
// };
// };
// module.exports.addConnection = function(connection, rsvp){
//     var data =[] ;
//     for(var i = 0; i < userConnection.length; i++){
//         if(connection == userConnection[i].connectionID && rsvp === "yes"){
//             data = connectiondb.getconnection(connection);
//             userConnection.append(data);
//         };
//     };
// };
// module.exports.removeConnection = function(connection){
//     var data = [];
//     var temp = [];
//     for(var i=0; i<userConnection.length; i++){
//         if(connection != userConnection[i].connectionID){
//             data = connectiondb.getconnection(userConnection[i].connectionID);
//             temp.append(data);
//         }
//     }
//     userConnection = temp;
// };
// module.exports.updateConnection = function(rsvp){
//     var uc = UserConnectiondb.userConnection();
//     uc.rsvp = rsvp;
// }

// module.exports.getConnections = function(){
//     return userConnection;
// };

// module.exports.emptyProfile = function(){
//     user = [];
// }
