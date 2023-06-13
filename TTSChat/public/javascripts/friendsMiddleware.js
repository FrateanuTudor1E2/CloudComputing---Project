const button = document.getElementById('AddButton');

button.addEventListener('click', function(e) {
    console.log('Add button was clicked');
    e.preventDefault();
    addFriend();
});

function addFriend() {
    const email = document.getElementById("Email").value;
    console.log(email);
    console.log("addFriendENTER");
    const emailses = '<%= req.session.email %>';
    fetch('/addFriendHandler', {
            method: 'POST',
            body: JSON.stringify({ email, emailses }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("Response received");
            if (response.ok) {
                console.log('Friend Added');
                
            } else {
                console.error('Failed');
               
            }
        })
        .catch(error => {
            console.error('An error occurred', error);
        });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


const listButton = document.getElementById("listall");

// listButton.addEventListener('click', function(e) {
//     // console.log('Add button was clicked');
//     e.preventDefault();
//     listFriends();
// });
window.onload = async(e) => {
    e.preventDefault();
    const email = getCookie('email')
    console.log('email', email);
    if (email === undefined) return
    const friends = await fetchFriends(email);
    listFriends(friends);

    // const userTableRef = firebase.firestore().collection('User_table');
    // const userQuery = userTableRef.where('email', '==', email);

}

function handleFriendClick(friendName) {
    localStorage.setItem('targetedFriend', friendName)
}
async function fetchFriends(email) {
    const res = await fetch(`/users?userEmail=${email}`)
    const data = await res.json()
    return data.friends
}

function listFriends(friendlist) {
    // const friendlist = [
    //     { name: "Razvan" },
    //     { name: "Claudiu" },
    //     { name: "Ionut" },
    // ]


    friendlist.forEach(element => {
        const friendButton = document.createElement('button');
        friendButton.textContent = element;
        friendButton.setAttribute('onclick', `handleFriendClick('${element}')`)
            // friendButton.setAttribute('href', `/userPage?username=${element.name}`);
        const contactlist = document.querySelector('.contactlist');

        contactlist.appendChild(friendButton);


    });
}