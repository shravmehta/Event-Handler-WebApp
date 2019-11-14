module.exports.user = function(userID, FirstName, LastName, Email, Country, connyes, connmaybe, rsvp){
    var user = {user_id: userID, first_name: FirstName, last_name: LastName, email: Email, country: Country, connection_yes:connyes, connection_maybe: connmaybe, rsvp: rsvp};
    return user;
};