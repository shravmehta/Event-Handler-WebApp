module.exports.connection = function(connectionID, connection_name, connection_topic, connection_host, connection_display, details, date_time, location, user_yes, user_maybe){
    this.connectionID = connectionID;
    this.connection_name = connection_name;
    this.connection_topic = connection_topic;
    this.connection_host = connection_host;
    this.connection_display = connection_display;
    this.details = details;
    this.date_time = date_time;
    this.location = location;
    this.user_yes = user_yes;
    this.user_maybe = user_maybe;
};