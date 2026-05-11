/* GET URL PARAMETER */
let params = new URLSearchParams(window.location.search);

let productId = params.get("id");
let product;
console.log(productId);

/* LOAD PRODUCT */
async function loadProduct() {

    let res =await fetch(`https://fakestoreapi.com/products/${productId}`);

    product = await res.json();

    console.log(product);

    /* UPDATE HTML */
    document.getElementById("detailImage").src =
    product.image;

    document.getElementById("detailTitle").innerText =
    product.title;

    document.getElementById("detailPrice").innerText =
    `$${product.price}`;

    document.getElementById("detailDescription").innerText =
    product.description;
}

loadProduct();



/* ADD TO CART BUTTON */
let addToCartBtn =document.getElementById("addToCartBtn");

addToCartBtn.addEventListener("click", () => {

    /* GET EXISTING CART */
    let cart =JSON.parse(localStorage.getItem("cart")) || [];

    /* ADD CURRENT PRODUCT */
    cart.push(product);

    /* SAVE BACK TO LOCALSTORAGE */
    localStorage.setItem("cart", JSON.stringify(cart));

    /* UPDATE CART COUNT */
    updateCartCount();
});


/* CART COUNT */

function updateCartCount() {

    let cart =JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelector(".cart-count").innerText =cart.length;
}

/* RUN ON PAGE LOAD */
updateCartCount();