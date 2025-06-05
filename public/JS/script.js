// Sign IN/ Sign Up js

// setTimeout(function () {
//     document.getElementById("login-form").style.display = "block";
// }, 2000); // 5 seconds in milliseconds
document.addEventListener("DOMContentLoaded", () => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData) {
            console.log("User is already logged in");
            document.getElementById("login-form").style.display = "none";
        }
    }
});

document.getElementById("login-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior of link
    document.getElementById("signup-form").style.display = "none"; // Hide signup form
    document.getElementById("login-form").style.display = "block"; // Show login form
});

// Function to show the signup form and hide the login form
function showSignupForm() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Event listener for the "Sign up" link
document.getElementById("signup-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior of link
    showSignupForm(); // Call the function to show the signup form
});

// Function to validate the signup form
function validateSignupForm() {
    var name = document.getElementById("signup-name").value.trim();
    var email = document.getElementById("signup-email").value.trim();
    var password = document.getElementById("signup-password").value.trim();
    var telephone = document.getElementById("signup-telephone").value.trim();

    // Validate Name
    if (name === "") {
        document.getElementById("signup-name-error").innerText = "Please enter your name.";
        return false;
    } else {
        document.getElementById("signup-name-error").innerText = "";
    }

    // Validate Email
    if (email === "") {
        document.getElementById("signup-email-error").innerText = "Please enter your email.";
        return false;
    } else if (!validateEmail(email)) {
        document.getElementById("signup-email-error").innerText = "Please enter a valid email address.";
        return false;
    } else {
        document.getElementById("signup-email-error").innerText = "";
    }

    // Validate Password
    if (password === "") {
        document.getElementById("signup-password-error").innerText = "Please enter your password.";
        return false;
    } else if (password.length < 8) {
        document.getElementById("signup-password-error").innerText = "Password must be at least 8 characters long.";
        return false;
    } else {
        document.getElementById("signup-password-error").innerText = "";
    }

    // Validate Telephone
    if (telephone === "") {
        document.getElementById("signup-telephone-error").innerText = "Please enter your telephone number.";
        return false;
    } else if (telephone.length !== 11) {
        document.getElementById("signup-telephone-error").innerText = "Phone number must be 11 digits long.";
        return false;
    } else {
        document.getElementById("signup-telephone-error").innerText = "";
    }

    // If all validations pass, store user data in localStorage (or perform other actions)
    var userData = {
        username: name,
        email: email,
        phone: telephone
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Optional: Display a success message or redirect the user
    alert("Sign-up successful!");

    // Clear the form fields (optional)
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-telephone").value = "";

    return false; // Prevent form submission
}
var isLoggedIn;
// Helper function to validate email format
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Event listener for the "Sign Up" form submission
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    validateSignupForm(); // Call the validation function
});

function loginUser() {
    var username = document.getElementById("Email").value.trim();
    var password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin") {
        // Redirect to admin.html
        window.location.href = "admin";
        return false; // Prevent form submission
    }

    // Check if username is empty
    if (username === "") {
        document.getElementById("username-error").innerText = "Please enter your username";
        return false; // Prevent form submission
    } else {
        document.getElementById("username-error").innerText = "";
    }

    // Check if password is empty
    if (password === "") {
        document.getElementById("password-error").innerText = "Please enter your password";
        return false; // Prevent form submission
    } else {
        document.getElementById("password-error").innerText = "";
    }

    // Simulating successful login for testing
    
    

            const Email= document.getElementById('Email').value;
            const Password= document.getElementById('password').value;
           
            const data = { Email, Password};

            (async function() {
                try {
                    const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                  
                    const result = await response.text();
                    
                    if (response.ok) {
                        console.log('Success:', result);
                        var currentUser = JSON.parse(result).user;
                        alert("Susccesful Login");
                        document.getElementById("login-form").style.display = "none";
                        localStorage.setItem("userData", JSON.stringify(currentUser));
                        isLoggedIn = true;
                    } else {
                        console.log('Error:', result);
                        alert("Invalid username or password");
                        isLoggedIn = false;
                    }
                } catch (error) {
                    console.log('Fetch error:', error);
                }
            })();
   return false;
}
document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is already logged in
    // var isLoggedIn = false; // Assume user is not logged in by default

    // Check localStorage or any other method to determine if the user is logged in
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        isLoggedIn = true; // Set isLoggedIn to true if user data is found
        console.log("User is already logged in"); // Optional: Log a message for testing
        document.getElementById("login-form").style.display = "none";
    }

    // Function to hide the login form if the user is already logged in
    function hideLoginForm() {
        console.log("User is already logged in"); // Optional: Log a message for testing
        document.getElementById("login-form").style.display = "none";
    }

    // Call the function to hide the login form if the user is logged in
    if (isLoggedIn) {
        hideLoginForm();
    }
});


// Function to validate phone number
function validatePhoneNumber(input) {
    var phoneNumber = input.value;
    var errorMessage = document.getElementById("phone-error");
    if (phoneNumber.length !== 11) {
        errorMessage.innerText = "Phone number must be 11 characters long.";
    } else {
        errorMessage.innerText = "";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Function to hide signup form when "Sign Up" button is clicked
    function hideSignupForm() {
        console.log("Sign Up button clicked"); // Check if this message appears in the console
        document.getElementById("signup-form").style.display = "none";
        return false; // Prevent default form submission
    }
    

    // Event listener for the "Sign Up" button
    document.getElementById("signup-button").addEventListener("click", hideSignupForm);
});

// Function to create a row for each reservation
function createReservationRow(name, email, date, time, persons) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${persons}</td>
        <td><button class="cancel-btn" onclick="cancelReservation(this)">Cancel</button></td>
    `;
    return row;
}

// Function to display reservations
function displayReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const tableBody = document.querySelector("#reservationTable tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Add new rows for each reservation
    reservations.forEach(reservation => {
        const row = createReservationRow(reservation.name, reservation.email, reservation.date, reservation.time, reservation.person);
        tableBody.appendChild(row);
    });
}


//Function for reservation
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var person = document.getElementById("person").value;

    if (name.trim() === "") {
        alert("Please enter your name");
        return false;
    }

    if (email.trim() === "") {
        alert("Please enter your email");
        return false;
    } else if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    if (date.trim() === "") {
        alert("Please select a date");
        return false;
    }

    if (time.trim() === "") {
        alert("Please select a time");
        return false;
    }

    if (person.trim() === "") {
        alert("Please enter the number of persons");
        return false;
    }

    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function showMenu() {
    var dropdownContent = document.getElementById("menuCategories");
    dropdownContent.style.display = "block";
}

function hideMenu() {
    var dropdownContent = document.getElementById("menuCategories");
    dropdownContent.style.display = "none";
}



// Function to display user profile information
function displayProfileInfo() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        var profileInfoDiv = document.getElementById("profile-info");
        profileInfoDiv.innerHTML = `
            <p><strong>Username:</strong> ${userData.username}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
        `;
    } else {
        // Handle case when there is no user data in localStorage
        var profileInfoDiv = document.getElementById("profile-info");
        profileInfoDiv.innerHTML = "<p>No profile information available.</p>";
    }
}
function cancelReservation(btn) {
    // Get the row to be removed
    var row = btn.closest("tr");
    // Remove the row from the table
    row.remove();
    // TODO: Add code to remove reservation from storage
}
// Call the functions to display profile information and reservations when the page loads
document.addEventListener("DOMContentLoaded", function() {
    displayProfileInfo();
    displayReservations();
});