var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var session = require('express-session');

app.use('/public',express.static('public'));


fs.readdirSync('./controller').forEach(function(file) {
  route = require('./controller/'+file);
  route.controller(app);

});


app.use(session({secret: '1234567890secret'}));


app.get('/', function(req, res){
  if(req.session.username) {
      var user = require('./model/users.js');

      user.checkIfUserExists(response.username,function(auth) {
            if(auth) {
                res.sendFile(__dirname + '/view/index.html');

            } else {
                res.sendFile(__dirname+'/view/login.html');
            }
      });

  }  else {
      res.sendFile(__dirname+'/view/login.html');
  }

});



io.on('connection', function(socket){
  socket.on('chat message', function(jsonmsg){
      try {

          var message = require('./model/messages.js');

          message.saveMessage(jsonmsg['fromuser'],jsonmsg['touser'],jsonmsg['message']);

          console.log("message received from:"+jsonmsg['fromuser']);

          var data = {
              message:jsonmsg['message'],
              fromuser:jsonmsg['fromuser']
          }

          io.emit('chat message'+jsonmsg['touser'],data);

      } catch (e) {
          console.log(e);
      }

  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
