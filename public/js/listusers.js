

function getUsers(query) {

    //only if chars are greater than 3
    if(query.length > 3) {
      //ajax get
        $.get("http://ec2-52-29-6-165.eu-central-1.compute.amazonaws.com:3000/userlist", {
            userlist: query
        }, function(json) {

            //the result user list in json

            //loop the users list
            //and append it in the ul list
            var l = document.getElementById("list");
            l.innerHTML = "";
            for(var i =0; i < json.length; i++) {
                //for every signle one
                //set onclick function
                //to change the p tag id="user"
                var username = json[i]['username'];
                l.innerHTML += '<li onclick="setUser('+"'"+username+"'"+')" >'+'<a href="#">'+username+'</a>'+'</li>';
            }

        });

    }

}


function setUser(user) {

    //change the p tag id="user"
    var p = document.getElementById('user');
    p.innerHTML = user;
    document.cookie = 'touser='+user;
    //and get the last messages from this user
    var username = getCookie("username");

    $.get('http://ec2-52-29-6-165.eu-central-1.compute.amazonaws.com:3000/lastmsg',{
        username: username,
        user: user
    },function (json) {
        //json the last messages for the specific user

        //append to html
        $('#messages').empty();
        for(var i =0; i < json.length; i++) {
            $('#messages').append($('<li>').text(json[i]['username']+': '+json[i]['messages']));
        }
    });


}


