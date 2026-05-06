console.log("E-Commerce Website Loaded");
let hamburger = document.querySelector(".hamburger");
let nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

let slides = document.querySelectorAll(".hero-slider img");
let index = 0;

setInterval(() => {

    slides[index].classList.remove("active");

    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add("active");

}, 3000);



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
            <p>$${p.price}</p>
            <button>Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

loadProducts();