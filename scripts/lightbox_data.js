"use strict";

// Title
let lightboxTitle = "Cliffoeds Lovely Gallery";

// Your images (PUT YOUR REAL FILE NAMES HERE)
let imgFiles = [
    "images/cave.png",
    "images/llamas.png",
    "images/town.png",
    "images/funergy.png",
    "images/dumberland.png",
    "images/plants.png",
    "images/meteor.png",
    "images/wind.png"
];

// Captions
let imgCaptions = [
    "The Royal Room",
    "El Dorado Room",
    "Fresh Homemade Breakfast",
    "Saturday BBQ Night",
    "Family Activities & Fun",
    "Relaxing Backyard Retreat"
];

// Count
let imgCount = imgFiles.length;

// Add lightbox click to gallery images
let galleryPics = document.querySelectorAll(".gallery-grid img");

galleryPics.forEach(img => {
   img.onclick = createOverlay;
});