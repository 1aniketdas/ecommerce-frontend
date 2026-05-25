let loginForm =
document.getElementById("loginForm");

let signupForm =
document.getElementById("signupForm");

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

document.querySelectorAll(".toggle-password")
.forEach(icon =>
{
    icon.addEventListener("click", () =>
    {
        let input =
        icon.previousElementSibling;

        if(input.type === "password")
        {
            input.type = "text";
        }
        else
        {
            input.type = "password";
        }
    });
});
function validEmail(email)
{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);
}
function validPassword(password)
{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    .test(password);
}
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

signupForm.addEventListener("submit", (e) =>
{
    e.preventDefault();

    let name =
    document.getElementById("signupName").value;

    let email =
    document.getElementById("signupEmail").value;

    let password =
    document.getElementById("signupPassword").value;

    let confirm =
    document.getElementById("confirmPassword").value;

    let error =
    document.getElementById("signupError");

    error.innerText = "";

    if(!validEmail(email))
    {
        error.innerText = "Invalid Email";
        return;
    }

    if(!validPassword(password))
    {
        error.innerText =
        "Password not strong enough";

        return;
    }

    if(password !== confirm)
    {
        error.innerText =
        "Passwords do not match";

        return;
    }

    let users =
    JSON.parse(localStorage.getItem("users"))
    || [];

    let existing =
    users.find(user => user.email === email);

    if(existing)
    {
        error.innerText =
        "Email already exists";

        return;
    }

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Signup Successful ✅");

    signupForm.reset();
});

loginForm.addEventListener("submit", (e) =>
{
    e.preventDefault();

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    let error =
    document.getElementById("loginError");

    let users =
    JSON.parse(localStorage.getItem("users"))
    || [];

    let validUser =
    users.find(user =>
        user.email === email &&
        user.password === password
    );

    if(validUser)
    {
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(validUser)
        );

        alert("Login Successful ✅");

        window.location.href = "index.html";
    }
    else
    {
        error.innerText =
        "Invalid Credentials";
    }
});