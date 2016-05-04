
module.exports.controller = function(app) {

    var session = require('express-session');
    app.use(session({secret: '1234567890secret'}));


    app.get('/userlist',function(req,res) {
        console.log('userlist');

        if(req.session.username) {
            //check
            var user = require('../model/users.js');
            user.checkIfUserExists(req.session.username, function (auth) {
                console.log(auth);
                if (auth) {

                    var userquery = req.query.userlist;
                    console.log(userquery);
                    //get users like userquery from mongodb
                    user.findusers(userquery,res);
                }

            });

        }


    });


}
