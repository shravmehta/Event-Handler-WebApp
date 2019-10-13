var data = [{connectionID: 'EH01', connection_name: "UNCC Soccer event", connection_topic:"Sports", connection_host: "Jon Snow", connection_display:"../resources/img/jon_snow.jpg", details:"We are organizing a friendly soccer match. we need 22 people for the match so please register.", connection_location: "Winterfell",date_time:"10/27/19 18:00"},
{connectionID: 'EH02', connection_name: "Cricket at Lot 5a", connection_topic:"Sports", connection_host: "Robb Stark", connection_display:"../resources/img/robb_stark.jpg", details:"We are organizing a friendly cricket match. we need 22 people for the match so please register and please be on time.",connection_location: "Winterfell", date_time:"10/21/19 15:00"},
{connectionID: 'EH03', connection_name: "Tennis on weekend", connection_topic:"Sports", connection_host: "Arya Stark", connection_display:"../resources/img/arya_stark.jpg", details:"I want sombody to join me to play tennis on weekends. please let me know if anybody is interested.",connection_location: "Winterfell", date_time:"10/14/19 10:00"},
{connectionID: 'EH04', connection_name: "NBAD study group", connection_topic:"Education", connection_host: "Daenerys Targaryen ", connection_display:"../resources/img/danny_stark.png", details:"This event is for people who are taking NBAD this semester, we can meet this weekend to complete the milestone 2 assignment in the library.",connection_location: "Winterfell", date_time:"10/14/19 12:00"},
{connectionID: 'EH05', connection_name: "Study group for midterms", connection_topic:"Education", connection_host: "Sansa Stark", connection_display:"../resources/img/sansa_stark.png", details:"This event is for people who are taking cloud computing, we can meet this weekend to study the content for the midterms.",connection_location: "Winterfell", date_time:"10/14/19 14:00"},
{connectionID: 'EH06', connection_name: "Leetcode and coffee", connection_topic:"Education", connection_host: "Bran Stark", connection_display:"../resources/img/bran_stark.png",details:"For the people who are graduating this sem or next sem, we can meet every weekends and practice interview questions and get coffee from starbucks.",connection_location: "Winterfell", date_time:"10/14/19 20:00"}];


module.exports.getconnections = function(){
  return data;  
};

module.exports.getconnection = function(connID){
    for(var i=0; i< data.length; i++){
        if(data[i].connectionID == connID){
            return data[i];
        }
    }
  };