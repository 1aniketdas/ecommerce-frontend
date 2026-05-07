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

/* AUTO SLIDE */
// setInterval(() => {

//     // slides[index].classList.remove("active");

//     index++;

//     if (index >= slides.length) {
//         index = 0;
//     }

//     showSlide(index);
//     // slides[index].classList.add("active");

// }, 3000);




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
startAutoSlide();

/* NEXT BUTTON */
// nextBtn.addEventListener("click", () => {

//     index++;

//     if(index >= slides.length) {
//         index = 0;
//     }

//     showSlide(index);

// });


/* NEXT BUTTON */
nextBtn.addEventListener("click", () => {

    index++;

    if(index >= slides.length) {
        index = 0;
    }

    showSlide(index);

    clearInterval(autoSlide);
    startAutoSlide();

});

/* PREV BUTTON */
// prevBtn.addEventListener("click", () => {

//     index--;

//     if(index < 0) {
//         index = slides.length - 1;
//     }

//     showSlide(index);

// });

/* PREV BUTTON */
prevBtn.addEventListener("click", () => {

    index--;

    if(index < 0) {
        index = slides.length - 1;
    }

    showSlide(index);

    clearInterval(autoSlide);
    startAutoSlide();

});

// let productGrid = document.getElementById("productGrid");

// let demoProducts = [
//     {
//         title: "Gaming Mouse",
//         price: "$25",
//         image: "https://via.placeholder.com/200"
//     },
//     {
//         title: "Laptop",
//         price: "$999",
//         image: "https://via.placeholder.com/200"
//     },
//     {
//         title: "Headphones",
//         price: "$120",
//         image: "https://via.placeholder.com/200"
//     },
//     {
//         title: "Keyboard",
//         price: "$80",
//         image: "https://via.placeholder.com/200"
//     }
// ];

// demoProducts.forEach(p => {
//     let card = document.createElement("div");
//     card.classList.add("product-card");

//     card.innerHTML = `
//         <img src="${p.image}">
//         <h3>${p.title}</h3>
//         <p>${p.price}</p>
//         <button>Add to Cart</button>
//     `;

//     productGrid.appendChild(card);
// });


async function loadProducts() {

    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();

    data.forEach(p => {

        let card = document.createElement("div");
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
    });
}

loadProducts();