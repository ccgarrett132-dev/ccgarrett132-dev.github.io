// Coordinates 
  var lat = 35.18792143714981;
  var lon = -101.84707696794004;

// Initialize Map
  var map = L.map('map').setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add Marker
  var marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup("<b>Cliffoeds</b><br>Loading weather...").openPopup();

// Weather Fetch
  fetch("https://api.weather.gov/points/" + lat + "," + lon)
    .then(function(res) { return res.json(); })
    .then(function(data) { return fetch(data.properties.forecast); })
    .then(function(res) { return res.json(); })
    .then(function(weather) {
      var current = weather.properties.periods[0];
      marker.setPopupContent("<b>Cliffoeds</b><br>" + current.temperature + "°F and " + current.shortForecast);
    })
    .catch(function(err) {
      marker.setPopupContent("<b>Cliffoeds</b><br>Weather unavailable");
    });
