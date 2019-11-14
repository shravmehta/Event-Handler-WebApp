module.exports.userConnection = function(connection, rsvp, userid){
    console.log("in user function" + connection.connectionID);
    var userconnection = {connection_id: connection.connectionID, connection_name:connection.connection_name, rsvp: rsvp, userid: userid};
   console.log("userconn activated");
    return userconnection;
};
