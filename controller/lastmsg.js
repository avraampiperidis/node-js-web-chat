module.exports.controller = function(app) {

    var session = require('express-session');
    app.use(session({secret: '1234567890secret'}));


    app.get('/lastmsg',function(req,res) {
        console.log('lastmsg');

        if(req.session.username) {
            //check
            var user = require ('../model/users.js');
            user.checkIfUserExists(req.session.username, function (auth) {

                if(auth) {

                    var lastusermsg = require('../model/messages.js');
                    var foruser = req.query.user;
                    lastusermsg.getLastMessages(req.session.username,foruser,res);

                }

            });

        }


    });


}
