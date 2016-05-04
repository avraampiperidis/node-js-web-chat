
var mongodb = require('mongodb');
var mongoclient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/chat';


var Message = function() {
}


Message.prototype.saveMessage = function(username,touser,msg) {

    mongoclient.connect(url,function(err,db) {
        if(err) {
            console.log('unable to save message:'+err);
        } else {
            var collection = db.collection('messages');

            var message = {username:username,touser:touser,messages:msg,date:Date.now()};
            collection.insert(message,function(err,result) {
                if(err) {
                    console.log('error at message ins'+err);
                }
                console.log('OK'+msg);
                db.close();
            });
        }
    });

}


//get 100 last messages from two users conversation
Message.prototype.getLastMessages = function(username,user,res) {

    mongoclient.connect(url,function(err,db) {
         if(err) {
             res.end('-1');
         } else {


             var c = db.collection('messages').find({$or:[{username:username,touser:user},{username:user,touser:username}]}).limit(100).sort({date:1});
             var arr = [];

             c.each(function(err,doc) {
                 if (doc != null) {
                     arr.push(doc);
                 } else {
                     console.log(arr.length);
                     res.json(arr);
                 }
             });

         }
    });

}



module.exports = new Message();