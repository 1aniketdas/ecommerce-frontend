

// FIREBASE IMPORTS

import { auth }
from "./firebase.js";

import
{
    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// // FIREBASE CONFIG

// const firebaseConfig = {

//     apiKey: "YOUR_API_KEY",

//     authDomain: "YOUR_AUTH_DOMAIN",

//     projectId: "YOUR_PROJECT_ID",

//     storageBucket: "YOUR_STORAGE_BUCKET",

//     messagingSenderId: "YOUR_MSG_ID",

//     appId: "YOUR_APP_ID"
// };


// // INITIALIZE FIREBASE

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);


// FORMS

let loginForm =
document.getElementById("loginForm");

let signupForm =
document.getElementById("signupForm");


// FORM SWITCHING

document.getElementById("showSignup")
.addEventListener("click", () =>
{
    loginForm.classList.add("hidden-form");

    signupForm.classList.remove("hidden-form");
});

document.getElementById("showLogin")
.addEventListener("click", () =>
{
    signupForm.classList.add("hidden-form");

    loginForm.classList.remove("hidden-form");
});


// EMAIL VALIDATION

function validEmail(email)
{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);
}


// PASSWORD VALIDATION

function validPassword(password)
{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    .test(password);
}


// PASSWORD STRENGTH

let signupPassword =
document.getElementById("signupPassword");

signupPassword.addEventListener("input", () =>
{
    let strength =
    document.getElementById("strengthText");

    let value = signupPassword.value;

    if(value.length < 6)
    {
        strength.innerText = "Weak";
        strength.style.color = "red";
    }
    else if(validPassword(value))
    {
        strength.innerText = "Strong";
        strength.style.color = "green";
    }
    else
    {
        strength.innerText = "Medium";
        strength.style.color = "orange";
    }
});


// SIGNUP

signupForm.addEventListener("submit",
async (e) =>
{
    e.preventDefault();

    let email =
    document.getElementById("signupEmail").value;

    let password =
    document.getElementById("signupPassword").value;

    let confirm =
    document.getElementById("confirmPassword").value;

    let signupError =
    document.getElementById("signupError");

    signupError.innerText = "";

    if(!validEmail(email))
    {
        signupError.innerText =
        "Invalid Email";

        return;
    }

    if(!validPassword(password))
    {
        signupError.innerText =
        "Password must contain uppercase, lowercase and number";

        return;
    }

    if(password !== confirm)
    {
        signupError.innerText =
        "Passwords do not match";

        return;
    }

    try
    {
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Signup Successful ✅");

        signupForm.reset();
    }
    catch(error)
    {
        signupError.innerText =
        error.message;
    }
});


// LOGIN

loginForm.addEventListener("submit",
async (e) =>
{
    e.preventDefault();

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    let error =
    document.getElementById("loginError");

    error.innerText = "";

    try
    {
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Login Successful ✅");

        window.location.href =
        "index.html";
    }
    catch(error)
    {
        error.innerText =
        "Invalid Email or Password";
    }
});


// AUTH STATE

onAuthStateChanged(auth, (user) =>
{
    if(user)
    {
        console.log("Logged In:",
        user.email);
    }
    else
    {
        console.log("Logged Out");
    }
});