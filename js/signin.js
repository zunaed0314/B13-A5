const signin = document.getElementById('signin');
const user = document.getElementById('username');
const pass = document.getElementById('password');

signin.addEventListener('click', function(){
    if(user.value.trim() === "admin" && pass.value.trim() === "admin123"){
        window.location.assign('home.html');
    }
    else{
        alert('Username or Password is wrong!');
    }
})