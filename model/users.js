
var mongodb = require('mongodb');
var mongoclient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/chat';


var User = function() {
}

User.prototype.checkIfUserExists = function(username , callback) {
    mongoclient.connect(url, function (err,db) {

        if(err) {
            console.log('unable to connect at checkIfUserExists:'+err);
            callback(true);
        } else {

            var collection = db.collection('user');

            collection.find({username:username}).toArray(function(err,result) {

                if(err) {
                    console.log('error at insertNewUser:find:'+err);
                    callback(true);
                } else if(result.length) {
                    callback(true);
                    return true;
                } else {
                    callback(false);
                }

                db.close();

            });

        }

    });
}


User.prototype.authenticateUser = function(username,password,callback) {
    mongoclient.connect(url,function(err,db) {
       if(err) {
           console.log('unable to connect at authenticateUser:'+err);
           callback(true);
       } else {
           var collection = db.collection('user');

           collection.find({username:username,password:password}).toArray(function (err,result) {
               if(err) {
                   console.log('error at authenticateUser');
                   callback(false);
               } else if(result.length) {
                   callback(true);
               } else {
                   callback(false);
               }

               db.close();
           });
       }
    });
}


User.prototype.findusers = function(query,res) {

    mongoclient.connect(url,function(err,db) {
        if(err) {
            res.end(-1);
        }  else {
            var collection = db.collection('user');
            var regexvalue = '.*'+query+'*';
            collection.find({username:new RegExp(regexvalue)},{username:1,_id:0}).toArray(function(err,result) {
               if(err) {
                   res.end('-1');
               } else if(result.length) {
                   console.log(result);
                   res.json(result);
               } else {
                   res.end('0');
               }
                db.close();
            });
        }
    });

}


User.prototype.insertNewUser = function(username,password) {

    mongoclient.connect(url,function(err,db) {

        if(err) {
            console.log('unable to connect at insertNewUser:'+err);
        } else {

            var collection = db.collection('user');

            var newuser = {username: username, password: password, messages: []};

            collection.insert(newuser, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('new insert user: ' + username);
                }

                db.close();
            });

        }

    });
}



module.exports = new User();