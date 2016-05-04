

function login() {

    var username = $('#usernamelogin').val();
    var password = $('#passwordlogin').val();

    $.get("http://ec2-52-29-6-165.eu-central-1.compute.amazonaws.com:3000/login", {
        username: username,
        password: password
    }, function(data) {
        if(data == 'success') {
            //success or failed login
            //if success
            document.cookie = "username="+username;
            //request index.html
            window.location.href = 'http://ec2-52-29-6-165.eu-central-1.compute.amazonaws.com:3000/';
            
        }

    });

}



function register() {

    var username = $('#usernamereg').val();
    var passwd = $('#passwordreg').val();

    $.get("http://ec2-52-29-6-165.eu-central-1.compute.amazonaws.com:3000/signup", {
        username: username,
        password: passwd
    }, function(data) {
        
        if(data == 'success') {
            //success or failed registration
            //if success
            document.cookie = "username="+username;
            //request index.html
            window.location.href = 'http://ec2-52-29-6-165.eu-central-1.compute.amazonaws.com:3000/';
        }
    });

}


