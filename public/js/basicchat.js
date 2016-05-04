
var socket = io();


    $('form').submit(function(){

        if($('#user').is(':empty')) {
            //do nothing
        } else {

            var username = getCookie("username");

            var msg = {
                "message": $('#m').val(),
                "touser": getCookie('touser'),
                "fromuser": username
            }

            socket.emit('chat message', msg);
            $('#m').val('');
            $('#messages').append($('<li>').text(username+': '+msg['message']));
            return false;
        }
    });


    socket.on('chat message'+getCookie('username'), function(msg){
        $('#messages').append($('<li>').text(msg['fromuser']+': '+msg['message']));
    });


