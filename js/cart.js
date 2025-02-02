
document.addEventListener("DOMContentLoaded", function () {
    // Get cart data from localStorage or create an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Reference to cart container elements
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");

    // Function to display cart items
    function displayCart() {
        cartItemsContainer.innerHTML = ""; // Clear previous items
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "Total: $0.00"; // Ensure proper empty cart message
            return;
        }
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
        
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>
                        Quantity: 
                        <button class="decrease-btn" data-index="${index}"> - </button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </p>
                </div>
                <button class="remove-btn" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
        
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });
        

        cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Add event listeners to increase and decrease buttons
        document.querySelectorAll(".increase-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = parseInt(event.target.dataset.index, 10);
                increaseQuantity(index);
            });
        });

        document.querySelectorAll(".decrease-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = parseInt(event.target.dataset.index, 10);
                decreaseQuantity(index);
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = parseInt(event.target.dataset.index, 10);
                removeFromCart(index);
            });
        });
    }

    // Function to increase quantity
    function increaseQuantity(index) {
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        displayCart(); // Refresh cart display
    }

    // Function to decrease quantity
    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1; // Decrease quantity
        } else {
            cart.splice(index, 1); // Remove item if quantity reaches 0
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        displayCart(); // Refresh cart display
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove item from the array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        displayCart(); // Refresh cart display
    }

    // Function to clear the entire cart
    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
    });
    // Redirect to checkout page
document.getElementById("checkout-button").addEventListener("click", () => {
    window.location.href = "checkout.html";
});


    // Initial display of cart on page load
    displayCart();
});
