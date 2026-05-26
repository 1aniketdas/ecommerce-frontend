import { auth }
from "./firebase.js";

import
{
    onAuthStateChanged,
    signOut
}
from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

console.log("E-Commerce Website Loaded");
let hamburger = document.querySelector(".hamburger");
let nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

let slides = document.querySelectorAll(".hero-slider img");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let index = 0;

/* SHOW SLIDE FUNCTION */
function showSlide(i) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[i].classList.add("active");
}




/* AUTO SLIDE VARIABLE */
let autoSlide;

/* AUTO SLIDE FUNCTION */
function startAutoSlide() {

    autoSlide = setInterval(() => {

        index++;

        if(index >= slides.length) {
            index = 0;
        }

        showSlide(index);

    }, 3000);
}

/* START AUTO SLIDE */




/* NEXT BUTTON */
// and
/* PREV BUTTON */

if(nextBtn && prevBtn && slides.length > 0)
{
    startAutoSlide();

    nextBtn.addEventListener("click", () =>
    {
        index++;

        if(index >= slides.length)
        {
            index = 0;
        }

        showSlide(index);

        clearInterval(autoSlide);

        startAutoSlide();
    });

    prevBtn.addEventListener("click", () =>
    {
        index--;

        if(index < 0)
        {
            index = slides.length - 1;
        }

        showSlide(index);

        clearInterval(autoSlide);

        startAutoSlide();
    });
}



async function loadProducts() {
    let productGrid = document.getElementById("productGrid");
    try {
        /* LOADING */
        productGrid.innerHTML = `<p id="loading">Loading products...</p>`;

        /* FETCH API */
        let res = await fetch("https://fakestoreapi.com/products");

        /* ERROR CHECK */
        if(!res.ok){
            throw new Error("API failed to fetch products");
        }
        let data = await res.json();

        productGrid.innerHTML = ""; // Clear loading text
        
        /* LOOP PRODUCTS */
        data.forEach(p => {
            let card=document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <img src="${p.image}" loading="lazy">
                <h3>${p.title}</h3>
                <div class="price_and_cart">
                    <p>$${p.price}</p>
                    <button>Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
            card.addEventListener("click", () => {
                window.location.href =`product.html?id=${p.id}`;
            });
        });
    }
    catch (error) {
        console.log(error);
        // productGrid.innerHTML = `<p id="loading">Failed to load products. Please try again later.</p>`;
        productGrid.innerHTML = `<h2>Failed to load products 😢</h2>`;
    }
}

loadProducts();


/* CART COUNT */

function updateCartCount() {

    let cart =JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems=0;
    cart.forEach(item => {
        totalItems+=item.quantity || 1;
    })
    document.querySelector(".cart-count").innerText =totalItems;
}

updateCartCount();

// AUTH UI

let loginBtn =
document.getElementById("loginBtn");

let logoutBtn =
document.getElementById("logoutBtn");


onAuthStateChanged(auth, (user) =>
{
    if(user)
    {
        // USER LOGGED IN

        if(loginBtn)
        {
            loginBtn.style.display = "none";
        }

        if(logoutBtn)
        {
            logoutBtn.style.display = "block";
        }
    }
    else
    {
        // USER LOGGED OUT

        if(loginBtn)
        {
            loginBtn.style.display = "block";
        }

        if(logoutBtn)
        {
            logoutBtn.style.display = "none";
        }
    }
});


// LOGOUT

logoutBtn?.addEventListener("click",
async () =>
{
    try
    {
        await signOut(auth);

        alert("Logged Out ✅");

        window.location.href =
        "auth.html";
    }
    catch(error)
    {
        console.log(error);
    }
});