
// =====================================
// SHIPPING / CHECKOUT PAGE LOGIC
// Shows cart summary
// Handles form validation and submission
// Clears cart after order is placed
// =====================================


// Initialize checkout page
function initShippingPage() {

    // Display order summary when page loads
    showSummary();

    // Listen for form submission
    document.getElementById("form")
        .addEventListener("submit", submitForm);
}


// =====================================
// DISPLAY CART SUMMARY
// =====================================
function showSummary() {

    // Get cart from localStorage
    let cart = getCart();

    // Get summary container
    let div = document.getElementById("summary");

    let total = 0;

    // Build summary HTML for each item
    div.innerHTML = cart.map(item => {

        // Calculate subtotal for item
        let sub = item.price * item.qty;

        // Add to total order price
        total += sub;

        return `${item.name} x ${item.qty} = $${sub}<br>`;

    }).join("");

    // Display final total
    div.innerHTML += `<strong>Total: $${total}</strong>`;
}


// =====================================
// HANDLE FORM SUBMISSION
// =====================================
function submitForm(e) {

    // Prevent page reload
    e.preventDefault();

    // Get form input values
    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let zip = document.getElementById("zip").value.trim();

    // Message box for feedback
    let msg = document.getElementById("message");

    // =====================================
    // VALIDATION RULES
    // =====================================

    // Check name is not empty
    if (name === "") {
        msg.innerHTML = "Enter name";
        return;
    }

    // Check address is not empty
    if (address === "") {
        msg.innerHTML = "Enter address";
        return;
    }

    // Check ZIP is exactly 5 digits
    if (!/^\d{5}$/.test(zip)) {
        msg.innerHTML = "Zip must be 5 digits";
        return;
    }

    // If all checks pass
    msg.innerHTML = "Order placed!";

    // Clear cart after successful order
    localStorage.removeItem("cart");
}