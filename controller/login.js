
module.exports.controller = function(app) {

    var session = require('express-session');
    app.use(session({secret: '1234567890secret'}));

 app.get('/login',function(req,res) {

     response = {
         username:req.query.username,
         password:req.query.password
     };

     //log only username
     console.log('login request from '+response.username);
     var user = require('../model/users.js');

     //authenticate user here from mongodb
     user.authenticateUser(response.username,response.password,function(auth) {

         if(auth) {
             //create user session
             req.session.username = response.username;
             req.session.user = user;

             res.end('success');
             //inform client caller with success
         } else {
             res.end("fail");
         }

     });




 });


}
