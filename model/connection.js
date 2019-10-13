module.exports.connection = function(connectionID, connection_name, connection_topic, details, date_time){
    this.connectionID = connectionID;
    this.connection_name = connection_name;
    this.connection_topic = connection_topic;
    this.details = details;
    this.date_time = date_time;
};