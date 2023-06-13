const button = document.getElementById('LoginButton');
button.addEventListener('click', function(e) {
    console.log('Login button was clicked');
    e.preventDefault();
    checkCredentials();
});

function checkCredentials() {
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    console.log(email);
    console.log("checkCredentialsENTER");
    fetch('/loginHandler', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log('Login successful');
                    window.location.href = `/userPage?username=${data.username}`;
                    // Set the email in a cookie
                    setCookie('email', data.sesemail, 7); // Set cookie for 7 days
                });
            } else {
                console.error('Login failed');
            }
        })
        .catch(error => {
            console.error('An error occurred while processing the login form', error);
        });
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(cookieName) {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');

    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].split('=');
        if (cookie[0] === cookieName) {
            return cookie[1];
        }
    }

    return null;
}