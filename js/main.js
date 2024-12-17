const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupName = document.getElementById("signup-name");
const signupBtn = document.getElementById("signup-btn");
const signupErrorMessage = document.getElementById("signup-error-message");
const signupSection = document.getElementById("signup-section");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginErrorMessage = document.getElementById("login-error-message");
const loginSection = document.getElementById("login-section");
const homeSection = document.getElementById("home-section");
const usernameDisplay = document.getElementById("username-display");
const logoutBtn = document.getElementById("logout-btn");

// Switch Between Login and Signup Sections
function switchSection(hide, show) {
    hide.classList.add('d-none');
    show.classList.remove('d-none');
    clearForm();
}
document.getElementById('show-signup').addEventListener('click', function () {
    switchSection(loginSection, signupSection);
});
document.getElementById('show-login').addEventListener('click', function () {
    switchSection(signupSection, loginSection);
});

function clearForm() {
    var inputs = [loginEmail, loginPassword, signupEmail, signupPassword, signupName];
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function saveUser(user) {
    var users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function showError(element, message) {
    element.textContent = message;
}

// Check if Email Exists 
function emailExists(email) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }
    return false;
}
// Find User Using Loop with given email and pass 
function findUser(email, password) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            return users[i];
        }
    }
    return null;
}

signupBtn.addEventListener('click', function () {
    var email = signupEmail.value.trim();
    var pass = signupPassword.value.trim();
    var name = signupName.value.trim();
    if (!name || !email || !pass) {
        showError(signupErrorMessage, 'All fields are required.');
        return;
    }
    if (emailExists(email)) {
        showError(signupErrorMessage, 'Email already registered.');
        return;
    }
    if (!/^.com/.test(email)) {
        showError(signupErrorMessage, 'Invalid email format.');
        return;
    }
    if (!/^[A-Z][A-Za-z0-9]*\d+$/.test(pass)) {
        showError(signupErrorMessage, 'Password must start with a capital letter and include at least one number.');
        return;
    }
    
    saveUser({
        name: name, 
        email: email,
        password: pass 
        });
    alert('Registration successful! Redirecting to login page.');
    switchSection(signupSection, loginSection);
});


loginBtn.addEventListener('click', function () {
    var email = loginEmail.value.trim();
    var pass = loginPassword.value.trim();
    // checks if this user exists aslun or not b3d ma katb baynato w 3mal siginup hal bynato mtkhzna 3ndi or not 
    var user = findUser(email, pass);
    if (!email || !pass) {
        showError(loginErrorMessage, 'All fields are required.');
        // (element,message i want to show)
        return;
    }
    if (!user) {
        showError(loginErrorMessage, 'Invalid email or password.');
        return;
    }
    // sessionStorage is appropriate here because the login status is only required during the current session
    //  Once the tab is closed, the user will be logged out automatically
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    usernameDisplay.textContent = 'Welcome, ' + user.name + '!';
    switchSection(loginSection, homeSection);
});

logoutBtn.addEventListener('click', function () {
    // once i logout the user is logged out for good once i close the tab
    sessionStorage.removeItem('loggedInUser');
    switchSection(homeSection, loginSection);
});

// DOMContentLoaded event is fired when the HTML document has been completely loaded and parsed
window.addEventListener('DOMContentLoaded', function () {
    var user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user) {
        usernameDisplay.textContent = 'Welcome ' + user.name + '!';
        switchSection(loginSection, homeSection);
    }
});
