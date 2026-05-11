/* GET URL PARAMETER */
let params = new URLSearchParams(window.location.search);

let productId = params.get("id");

console.log(productId);

/* LOAD PRODUCT */
async function loadProduct() {

    let res =await fetch(`https://fakestoreapi.com/products/${productId}`);

    let product = await res.json();

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