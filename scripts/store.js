
// =====================================
// STORE PAGE LOGIC
// Adds products from shop → cart
// Saves everything in localStorage
// =====================================


// Add selected product to cart
function addToCart(name, price, id) {

    // Get selected options from shop page
    const color = document.getElementById("color-" + id).value;
    const size = document.getElementById("size-" + id).value;
    const qty = parseInt(document.getElementById("qty-" + id).value);

    // Load current cart from localStorage
    let cart = getCart();

    // Add new item with all required data
    cart.push({
        id: id,          // used to match product options later
        name: name,      // product name
        price: price,    // product price
        color: color,    // selected color
        size: size,      // selected size
        qty: qty         // quantity selected
    });

    // Save updated cart back to storage
    saveCart(cart);

    // Confirmation message
    alert("Item added to cart!");
}