module.exports.controller = function(app) {

    app.get('/logout',function(req,res) {
        console.log('logout');

        //destroy user session


        //response just ok
        //client will redirect to login.html

    });


}