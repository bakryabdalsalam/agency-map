/***************************************************
 * map.js
 * Initializes the Leaflet map, marker clusters,
 * geolocation, and "Explore Hotspots" functionality.
 ***************************************************/

(function() {
  // Initialize the map centered on Egypt
  const map = L.map("map").setView([30.0444, 31.2357], 6);
  // Expose the map globally so that other modules (like filters) can use it.
  window.map = map;
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);
  
  // Marker cluster group
  window.markersCluster = L.markerClusterGroup();
  map.addLayer(window.markersCluster);
  
  // Keep an array of all markers
  window.allMarkers = [];
  
  // Function to create markers based on properties array
  window.createMarkers = function(properties) {
    window.markersCluster.clearLayers(); // Clear existing markers
    window.allMarkers = []; // Reset the markers array
  
    properties.forEach((prop) => {
      const marker = L.marker([prop.location.lat, prop.location.lng]);
  
      // Popup content with property info and action buttons
      const popupHtml = `
        <div style="min-width:150px">
          <strong>${prop.title}</strong><br>
          <span>${translations[currentLang].propPrice}: ${prop.price} EGP</span><br>
          <button onclick="showPropertyDetails(${prop.id})" style="margin-top:5px;">
            ${translations[currentLang].modalMoreInfo}
          </button>
          <br><br>
          <!-- Favorites & Compare Buttons -->
          <button onclick="toggleFavorite(${prop.id})">❤️</button>
          <button onclick="toggleCompare(${prop.id})">🔍</button>
        </div>
      `;
  
      marker.bindPopup(popupHtml);
      window.markersCluster.addLayer(marker);
      window.allMarkers.push(marker);
    });
  };
  
  // Initially create markers for all properties
  window.createMarkers(window.allProperties);
  
  // -------------------- GEOLOCATION --------------------
  const btnLocate = document.getElementById("btn-locate");
  btnLocate.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView([latitude, longitude], 14);
        },
        (err) => {
          console.error(err);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });
  
  // -------------------- EXPLORE HOTSPOTS --------------------
  const btnExplore = document.getElementById("btn-explore");
  btnExplore.addEventListener("click", () => {
    // Example hotspots (Cairo, Alexandria, Hurghada)
    const hotspots = [
      { lat: 30.0444, lng: 31.2357, zoom: 10 }, // Cairo
      { lat: 31.2001, lng: 29.9187, zoom: 11 }, // Alexandria
      { lat: 27.2579, lng: 33.8116, zoom: 11 }  // Hurghada
    ];
    let i = 0;
    const interval = setInterval(() => {
      const spot = hotspots[i];
      map.flyTo([spot.lat, spot.lng], spot.zoom, { duration: 2 });
      i++;
      if (i >= hotspots.length) {
        clearInterval(interval);
      }
    }, 3000);
  });
})();
