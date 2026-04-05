/*    JavaScript 7th Edition
      Chapter 2
      Chapter Project

      Fan Trick Fine Art Photography
      Variables and functions
      Author: Clay Garrett
      Date:   04/02/2026

      Filename: cliffoeds
 */

// declare global constants for the application

"use strict";

/* ===== PRICES ===== */
const PRICES = {
    laundry: 20,   // per stay
    wine: 100,     // per stay
    pets: 30       // per stay
};

/* ===== SETUP ===== */
window.addEventListener("load", setupPage);

function setupPage() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("change", calculateTotal);
    });

    calculateTotal();
}

/* ===== MAIN CALCULATION ===== */
function calculateTotal() {

    const room = document.querySelector('input[name="room"]:checked');
    const nights = parseInt(document.getElementById("nights").value) || 0;

    let total = 0;

    // Room cost
    if (room) {
        total += parseFloat(room.value) * nights;
    }

    // Extras
    total += getExtrasTotal();

    // Display
    document.getElementById("total").textContent = formatCurrency(total);
}

/* ===== EXTRAS ===== */
function getExtrasTotal() {

    let extrasTotal = 0;

    if (document.getElementById("laundry").checked) {
        extrasTotal += PRICES.laundry;
    }

    if (document.getElementById("wine").checked) {
        extrasTotal += PRICES.wine;
    }

    if (document.getElementById("pets").checked) {
        extrasTotal += PRICES.pets;
    }

    return extrasTotal;
}

/* ===== FORMAT ===== */
function formatCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}



   

  