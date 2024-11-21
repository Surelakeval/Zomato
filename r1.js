let cart = [];

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    
    // Clear the current cart items
    cartItemsElement.innerHTML = '';
    
    // Calculate the total amount
    let total = 0;
    
    // Loop through the cart and display each item
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsElement.appendChild(li);
        total += item.price;
    });
    
    // Update the total amount
    totalAmountElement.textContent = `Total: ${total}`;
}

// Function to handle adding items to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const name = productElement.getAttribute('data-name');
        const price = parseFloat(productElement.getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

// Handle the checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    document.getElementById('address-form').style.display = 'block';
});

// Handle the delivery form submission
document.getElementById('delivery-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const address = document.getElementById('address').value;
    const summaryElement = document.getElementById('summary');
    
    // Create order summary
    summaryElement.innerHTML = `<strong>Delivery Address:</strong> ${address}<br><strong>Order Items:</strong><br>`;
    cart.forEach(item => {
        summaryElement.innerHTML += `${item.name} - ${item.price}<br>`;
    });
    summaryElement.innerHTML += `<strong>Total: ${cart.reduce((total, item) => total + item.price, 0)}</strong>`;
    
    // Show order summary
    document.getElementById('order-summary').style.display = 'block';
});