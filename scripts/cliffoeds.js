/* 
   Cliffoeds Hotel Project
   JavaScript functionality (pricing + reviews)
   Author: Clay Garrett
   Date: 04/02/2026
*/

"use strict";

/* =========================
   PRICING VALUES
========================= */
const PRICES = {
    laundry: 20,
    wine: 100,
    pets: 30
};

/* =========================
   STARTUP
========================= */
window.addEventListener("load", init);

function init() {
    setupPricing();
    displayReviews();
}

/* =========================
   PRICING LOGIC
========================= */
function setupPricing() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("change", calculateTotal);
    });

    calculateTotal();
}

function calculateTotal() {
    const room = document.querySelector('input[name="room"]:checked');
    const nights = parseInt(document.getElementById("nights")?.value) || 0;

    let total = 0;

    // room cost
    if (room) {
        total += parseFloat(room.value) * nights;
    }

    // extras cost
    total += getExtrasTotal();

    const totalDisplay = document.getElementById("total");
    if (totalDisplay) {
        totalDisplay.textContent = formatCurrency(total);
    }
}

function getExtrasTotal() {
    let total = 0;

    if (document.getElementById("laundry")?.checked) {
        total += PRICES.laundry;
    }

    if (document.getElementById("wine")?.checked) {
        total += PRICES.wine;
    }

    if (document.getElementById("pets")?.checked) {
        total += PRICES.pets;
    }

    return total;
}

function formatCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

/* =========================
   REVIEWS DATA
========================= */
const reviewData = [
    {
        name: "ChefBayardee",
        type: "P",
        stars: 5,
        date: "06/11/2025",
        source: "TripSplatter",
        title: "A Truly Royal Experience",
        text: "Everything about Cliffoeds was flawless. From the rooms to the service, I felt like royalty the entire stay. No place can compare, and I've been to the hidden Valley!"
    },
    {
        name: "G.Ramsey",
        type: "N",
        stars: 5,
        date: "03/17/2026",
        source: "BookingBlunder",
        title: "Luxury at Its Finest",
        text: "The themed rooms, the food, the atmosphere… absolutely incredible. Worth every penny."
    },
    {
        name: "Num1Hater",
        type: "",
        stars: 5,
        date: "02/20/2025",
        source: "Yelp-ish",
        title: "I Tried to Find a Problem…",
        text: "I spent my entire stay trying to find something wrong. Bad service? Nope. Dirty room? Nope. Even the coffee was perfect. Honestly frustrating — I wanted to complain about something. 5 stars, I guess."
    },
    {
        name: "T.Woods",
        type: "",
        stars: 5,
        date: "11/10/2009",
        source: "OrbitzOffBrand",
        title: "Will Absolutely Return",
        text: "This is hands down the best place I’ve stayed. The weekend events and hospitality were top-tier."
    }
];

/* =========================
   SHOW REVIEWS
========================= */
function displayReviews() {
    const reviewSection = document.getElementById("reviewSection");

    if (!reviewSection) return;

    reviewData.forEach(review => {
        const reviewHTML = createReviewHTML(review);
        reviewSection.insertAdjacentHTML("beforeend", reviewHTML);
    });
}

/* builds one review card */
function createReviewHTML(review) {

    let highlightClass = "";

    if (review.type === "P") {
        highlightClass = "prime";
    } else if (review.type === "N") {
        highlightClass = "new";
    }

    return `
        <div class="review-card ${highlightClass}">
            <h3 class="review-title">${review.title}</h3>
            
            <div class="review-meta">
                <span class="review-author">By ${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>

            <div class="review-source">
                <em>via ${review.source}</em>
            </div>

            <div class="review-stars">
                ${createStarImages(review.stars)}
            </div>

            <p class="review-text">${review.text}</p>
        </div>
    `;
}

function createStarImages(rating) {
    return "⭐".repeat(rating);
}