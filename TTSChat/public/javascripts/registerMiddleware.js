

const button = document.getElementById('RegisterButton');
button.addEventListener('click', function(e) {
    console.log('Register button was clicked');
    submitForm();
});


function submitForm() {

    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    const email = document.getElementById("Email").value;
    const friendsList = "None "
    console.log("1");
    fetch('/registerHandler', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, friendsList }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then(response => {
            console.log("2");
            if (response.ok) {
                console.log('Registration successful');
               
            } else {
                console.error('Registration failed');
               
            }
        })
        .catch(error => {
            console.error('An error occurred while processing the registration form', error);
        });
}