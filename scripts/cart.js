let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let cartItems =
document.getElementById("cartItems");

let cartTotal =
document.getElementById("cartTotal");

let checkoutBtn =
document.getElementById("checkoutBtn");

/* DISPLAY CART */

function displayCart()
{
    cartItems.innerHTML = "";

    let total = 0;

    /* EMPTY CART */

    if(cart.length === 0)
    {
        cartItems.innerHTML =
        `<h2>Your cart is empty 😢</h2>`;

        checkoutBtn.disabled = true;

        cartTotal.innerText = "0";

        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        let div =
        document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `

            <img src="${item.image}">

            <div class="cart-info">

                <h3>${item.title}</h3>

                <p>$${item.price}</p>

            </div>

            <div class="cart-quantity">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

                Remove

            </button>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.innerText = total.toFixed(2);

    updateCartCount();
}

/* INCREASE */

function increaseQuantity(index)
{
    cart[index].quantity++;

    saveCart();
}

/* DECREASE */

function decreaseQuantity(index)
{
    if(cart[index].quantity > 1)
    {
        cart[index].quantity--;

        saveCart();
    }
}

/* REMOVE */

function removeItem(index)
{
    cart.splice(index,1);

    saveCart();
}

/* SAVE */

function saveCart()
{
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

/* CART COUNT */

function updateCartCount()
{
    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    document.querySelector(".cart-count")
    .innerText = totalItems;
}

/* START */

displayCart();