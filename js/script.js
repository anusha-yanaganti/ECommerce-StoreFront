/* Updated script.js with Cart Functionality and Search Bar */

const products = [
    { id: 1, name: "Smartphone", category: "electronics", price: 500, image: "assets/phn.jpg", available: true },
    { id: 2, name: "Laptop", category: "electronics", price: 1000, image: "assets/lappy.jpg", available: true },
    { id: 3, name: "T-shirt", category: "clothing", price: 20, image: "assets/tshirt.jpg", available: true },
    { id: 4, name: "Blender", category: "home", price: 70, image: "assets/blender.jpg", available: false },
    { id: 5, name: "Headphones", category: "electronics", price: 150, image: "assets/headphns.jpg", available: true },
    { id: 6, name: "Jacket", category: "clothing", price: 40, image: "assets/jack.jpg", available: true },
];

// Reference to the Product Grid Section, Filters, and Search Bar
const productGrid = document.querySelector('.product-grid');
const categoryFilter = document.getElementById('category');
const priceRangeFilter = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const availabilityFilter = document.getElementById('availability');
const cartButton = document.querySelector('.cart button');
const searchBar = document.getElementById('search-bar');

// Function to display products in the grid
function displayProducts(filteredProducts) {
    productGrid.innerHTML = ''; // Clear the grid before displaying products

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>No products found</p>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="openProductModal(${product.id})">View Details</button>

            `;
            productGrid.appendChild(productCard);
        });
    }
}

// Function to filter products based on selected criteria
function filterProducts() {
    let filteredProducts = [...products]; // Create a copy of the products array

    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    const maxPrice = priceRangeFilter.value;
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);

    // Filter by availability (in stock)
    if (availabilityFilter.checked) {
        filteredProducts = filteredProducts.filter(product => product.available);
    }

    // Update the price value display
    priceValue.textContent = `$${maxPrice}`;

    // Display filtered products
    displayProducts(filteredProducts);
}

// Function to handle search functionality
function searchProducts(event) {
    const query = event.target.value.toLowerCase(); // Get the search query

    // Filter products by name (case insensitive)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    // Display the filtered products
    displayProducts(filteredProducts);
}

// Function to add a product to the cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} has been added to your cart!`);
    updateCartCount();
}

// Function to update cart count in the UI
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.querySelector('.cart button');
    if (!cartButton) return;

    const totalItems = cart.length > 0
        ? cart.reduce((total, item) => total + (item.quantity || 0), 0)
        : 0;

    cartButton.textContent = `Cart (${totalItems})`;
}


// Select modal elements
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");
const modalAddToCart = document.getElementById("modal-add-to-cart");
const closeModalBtn = document.querySelector(".close-btn");

// Function to open the product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    modalImage.src = product.image;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `$${product.price}`;
    modalDescription.textContent = "This is a great product."; // Replace with actual description if available
    modalAddToCart.setAttribute("onclick", `addToCart(${product.id})`);

    modal.style.display = "flex"; // Show the modal
}

// Close the modal when clicking the close button
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal if user clicks outside content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("price-range");

    function updateSliderBackground() {
        const min = slider.min || 0;
        const max = slider.max || 100; // Default range if not set
        const value = slider.value;

        const percentage = ((value - min) / (max - min)) * 100 + "%";
        slider.style.setProperty("--progress", percentage);
    }

    slider.addEventListener("input", updateSliderBackground);
    updateSliderBackground(); // Initialize on page load
});


// Event listeners for filters
categoryFilter.addEventListener('change', filterProducts);
priceRangeFilter.addEventListener('input', filterProducts);
availabilityFilter.addEventListener('change', filterProducts);

// Event listener for search bar
searchBar.addEventListener('input', searchProducts);

// Ensure cart count is correct on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Initial display of all products
displayProducts(products);
updateCartCount();
