// checkout.js

// Function to display the order summary
function displayOrderSummary() {
    // Get cart data from localStorage (or a global variable if you prefer)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const orderSummaryDiv = document.getElementById('order-summary');
    const orderTotalElem = document.getElementById('order-total');
    let total = 0;

    orderSummaryDiv.innerHTML = ''; // Clear previous order summary
    cart.forEach(item => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('order-item');
        itemElem.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummaryDiv.appendChild(itemElem);
        total += item.price * item.quantity;
    });

    orderTotalElem.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to handle the checkout form submission
function handleCheckoutFormSubmission(event) {
    event.preventDefault(); // Prevent form submission

    // Get user details from the form
    const userDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
    };

    // Check if all fields are filled
    if (userDetails.name && userDetails.email && userDetails.address && userDetails.phone) {
        // Simulate order confirmation
        alert(`Order placed successfully!\nName: ${userDetails.name}\nEmail: ${userDetails.email}\nTotal: $${document.getElementById('order-total').textContent.split(': $')[1]}`);
        
        // Clear the cart after checkout (if using localStorage)
        localStorage.removeItem('cart');

        // Hide the checkout form
        document.getElementById('checkout-form').style.display = 'none';

        // Show the Thank You message
        document.getElementById('thank-you-message').style.display = 'block';

    } else {
        alert('Please fill in all the details.');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Display the order summary on page load
    displayOrderSummary();

    // Add event listener for form submission (clicking the submit button)
    document.getElementById('place-order').addEventListener('click', function(event) {
        event.preventDefault();  // Ensure it doesn't submit the form
        handleCheckoutFormSubmission(event);
    });
});
