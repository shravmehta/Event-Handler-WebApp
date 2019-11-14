 class userProfile{


    constructor(userid,userconn){
        this.userid = userid;
        this.userConnection = userconn;
    }

    addConnection(connection,rsvp){
        var i = this.userConnection.indexOf(connection);
        if(i != -1){
            this.userConnection.push(connection);
        }
        else{
            this.userConnection[i].rsvp = rsvp;
        }
     }

    removeConnection(connection){
        for(var i=0; i<this.userConnection.length; i++){
            if(connection === this.userConnection[i]){
                this.userConnection[i].splice(i,1);
            }
        }
     }

     updateConnection(rsvp){
        var i = this.userConnection.indexOf(connection);
        this.userConnection[i].rsvp = rsvp;
     }

     getConnections(){
         return this.userConnection;
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
