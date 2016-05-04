module.exports.controller = function(app) {

    var session = require('express-session');
    app.use(session({secret: '1234567890secret'}));

    app.get('/signup',function(req,res) {

        response = {
            username:req.query.username,
            password:req.query.password
        };

        //sign up request from
        console.log('sign up request from '+response.username);

        //check if user exists already in mongodb
        //check through model
        var user = require('../model/users.js');

            user.checkIfUserExists(response.username,function(auth) {

                if(auth == false) {
                    //if user is not registered  register him
                    //register user through model
                    user.insertNewUser(response.username, response.password);
                    //create user session
                    req.session.username = response.username;
                    req.session.user = user;

                    res.end('success');
                    //inform client caller with success

                } else {
                    //inform client caller with fail
                    //duplicate username
                    res.end('fail');
                }

            });






    });


}