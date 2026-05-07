

// =====================================
// CART PAGE LOGIC
// Displays cart items
// Allows editing (color, size, qty)
// Calculates totals
// Saves changes to localStorage
// =====================================


// Load cart when page opens
function renderCart() {

    let cart = getCart();
    let area = document.getElementById("cart-area");

    area.innerHTML = "";

    let total = 0;

    // Loop through all cart items
    cart.forEach((item, index) => {

        // Calculate total for this item
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        // Create container
        let div = document.createElement("div");
        div.className = "cart-item";

        // Build dropdowns dynamically based on product ID
        let colorOptions = getColorOptions(item);
        let sizeOptions = getSizeOptions(item);

        // Render item
        div.innerHTML = `
            <strong>${item.name}</strong><br>

            <span>Price: $${item.price.toFixed(2)}</span><br><br>

            <!-- COLOR -->
            Color:
            <select onchange="updateItem(${index})" id="color-${index}">
                ${colorOptions}
            </select>
            <br>

            <!-- SIZE -->
            Size:
            <select onchange="updateItem(${index})" id="size-${index}">
                ${sizeOptions}
            </select>
            <br><br>

            <!-- QUANTITY -->
            Quantity:
            <input type="number" min="1"
                value="${item.qty}"
                onchange="updateQty(${index}, this.value)">

            <br><br>

            <!-- ITEM TOTAL -->
            <strong>Item Total: $${itemTotal.toFixed(2)}</strong>

            <br><br>

            <!-- REMOVE -->
            <button onclick="removeItem(${index})">Remove</button>
        `;

        area.appendChild(div);
    });

    // Update total display
    document.getElementById("total-box").textContent = total.toFixed(2);
}


// =====================================
// UPDATE COLOR / SIZE
// =====================================
function updateItem(index) {

    let cart = getCart();

    // Get updated values from dropdowns
    let color = document.getElementById(`color-${index}`).value;
    let size = document.getElementById(`size-${index}`).value;

    // Save changes
    cart[index].color = color;
    cart[index].size = size;

    saveCart(cart);
    renderCart();
}


// =====================================
// UPDATE QUANTITY
// =====================================
function updateQty(index, qty) {

    let cart = getCart();

    // Ensure minimum quantity of 1
    cart[index].qty = Math.max(1, parseInt(qty));

    saveCart(cart);
    renderCart();
}


// =====================================
// REMOVE ITEM
// =====================================
function removeItem(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    renderCart();
}


// =====================================
// COLOR OPTIONS BY PRODUCT ID
// =====================================
function getColorOptions(item) {

    const colors = {
        1: ["Gold", "Silver"],     // Crown
        2: ["Black", "Red"],      // Shirt
        3: ["Gold", "Silver"],     // Keychain
        4: ["Full Color"],         // Poster
        5: ["Red", "Gold"]      // Mug
    };

    let options = colors[item.id] || [];

    return options.map(c =>
        `<option value="${c}" ${c === item.color ? "selected" : ""}>${c}</option>`
    ).join("");
}


// =====================================
// SIZE OPTIONS BY PRODUCT ID
// =====================================
function getSizeOptions(item) {

    const sizes = {
        1: ["One Size"],
        2: ["Small", "Medium", "Large"],
        3: ["Standard"],
        4: ["Small", "Large"],
        5: ["Standard"]
    };

    let options = sizes[item.id] || [];

    return options.map(s =>
        `<option value="${s}" ${s === item.size ? "selected" : ""}>${s}</option>`
    ).join("");
}