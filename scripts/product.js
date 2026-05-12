/* GET URL PARAMETER */
let params = new URLSearchParams(window.location.search);

let productId = params.get("id");
let product;
let quantity = 1;
console.log(productId);

/* LOAD PRODUCT */
async function loadProduct() {

    let res =await fetch(`https://fakestoreapi.com/products/${productId}`);

    product = await res.json();
    console.log(product);
    
    /* UPDATE HTML */
    document.getElementById("detailImage").src =product.image;
    
    document.getElementById("detailTitle").innerText =product.title;
    
    document.getElementById("detailPrice").innerText =`$${product.price}`;
    
    document.getElementById("detailDescription").innerText =product.description;

    document.getElementById("totalPrice").innerText=(product.price*quantity).toFixed(2);
}

loadProduct();



/* ADD TO CART BUTTON */
let addToCartBtn =document.getElementById("addToCartBtn");

addToCartBtn.addEventListener("click", () => {

    /* GET EXISTING CART */
    let cart =JSON.parse(localStorage.getItem("cart")) || [];

    /* CHECK IF PRODUCT ALREADY EXISTS */
    let existingProduct=cart.find(item=>item.id===product.id);

    /* IF EXISTS -> UPDATE QUANTITY */
    if(existingProduct)
    {
        existingProduct.quantity+=quantity;
    }
    /* ELSE -> ADD NEW PRODUCT */
    else
    {
        /* ADD CURRENT PRODUCT */
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    /* SAVE BACK TO LOCALSTORAGE */
    localStorage.setItem("cart", JSON.stringify(cart));

    /* UPDATE CART COUNT */
    updateCartCount();

    /* SUCCESS MESSAGE */
    let msg =document.getElementById("cartMessage");

    msg.innerText = "Added To Cart ✅";
    msg.style.transform="scale(1.1)";
    msg.style.opacity = "1";

    setTimeout(() => {
        msg.style.transform="scale(1)";
        msg.style.opacity = "0";

    }, 2000);
});


/* CART COUNT */

function updateCartCount() {

    let cart =JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems=0;
    cart.forEach(item => {
        totalItems+=item.quantity || 1;
    })
    document.querySelector(".cart-count").innerText =totalItems;
}

/* RUN ON PAGE LOAD */
updateCartCount();


/* QUANTITY BUTTONS */

let plusBtn =document.getElementById("plusBtn");

let minusBtn =document.getElementById("minusBtn");

plusBtn.addEventListener("click", () => {

    if(quantity<10)
    {
        quantity++;
    }

    updateQuantity();
});

minusBtn.addEventListener("click", () => {

    if(quantity > 1)
    {
        quantity--;

        updateQuantity();
    }
});

function updateQuantity()
{
    document.getElementById("quantity").innerText =quantity;

    document.getElementById("totalPrice").innerText =(product.price * quantity).toFixed(2);
}

