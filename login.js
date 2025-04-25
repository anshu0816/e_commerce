document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    
    
    const users = [
        { username: "user1", password: "password1" },
        { username: "user2", password: "password2" }
    ];

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password");
        }
    });
});
