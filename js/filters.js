/***************************************************
 * filters.js
 * Handles filtering of properties based on user input
 * (keyword, city, type, price, bedrooms, and bathrooms) and
 * highlights the city border on the map when a city is selected.
 ***************************************************/

(function() {
  const filterBtn = document.getElementById("btn-filter");

  // Dummy city borders (replace these with real boundaries if available)
  const cityBorders = {
    "cairo":      [[30.0, 31.0], [30.0, 31.5], [30.5, 31.5], [30.5, 31.0]],
    "giza":       [[29.8, 31.1], [29.8, 31.3], [30.0, 31.3], [30.0, 31.1]],
    "alexandria": [[31.1, 29.8], [31.1, 30.0], [31.4, 30.0], [31.4, 29.8]],
    "hurghada":   [[27.0, 33.0], [27.0, 33.5], [27.5, 33.5], [27.5, 33.0]],
    "new cairo":  [[29.8, 31.4], [29.8, 31.6], [30.0, 31.6], [30.0, 31.4]]
  };

  let cityHighlightLayer; // To store the Leaflet polygon

  // Highlight the selected city's border on the map.
  function highlightCity(city) {
    if (!window.map) {
      console.error("Map object (window.map) not found.");
      return;
    }
    // Remove any existing highlighted border.
    if (cityHighlightLayer) {
      window.map.removeLayer(cityHighlightLayer);
      cityHighlightLayer = null;
    }
    const borders = cityBorders[city];
    if (!borders) {
      console.warn("No border coordinates found for city:", city);
      return;
    }
    console.log("Adding city border for:", city, borders);
    cityHighlightLayer = L.polygon(borders, {
      color: '#ff0000',  // Red border
      weight: 3,
      fill: false  // Set to true with fillOpacity if needed for debugging
    }).addTo(window.map);
    // Bring the polygon to the front
    cityHighlightLayer.bringToFront();
    // Optionally, zoom the map to fit the city border.
    window.map.fitBounds(cityHighlightLayer.getBounds());
  }

  // Remove any highlighted city border.
  function removeHighlightCity() {
    if (cityHighlightLayer && window.map) {
      window.map.removeLayer(cityHighlightLayer);
      cityHighlightLayer = null;
    }
  }

  filterBtn.addEventListener("click", () => {
    // Retrieve filter values
    const keyword    = document.getElementById("search-input").value.toLowerCase();
    const cityFilter = document.getElementById("city-select").value; // City filter
    const type       = document.getElementById("property-type").value;
    const maxPrice   = parseInt(document.getElementById("price-range").value, 10) || 10000000;
    const bedrooms   = document.getElementById("bedrooms").value;
    const bathrooms  = document.getElementById("bathrooms").value;

    // Filter the properties
    const filtered = window.allProperties.filter((prop) => {
      const matchesKeyword =
        prop.title.toLowerCase().includes(keyword) ||
        prop.location.city.toLowerCase().includes(keyword) ||
        prop.location.neighborhood.toLowerCase().includes(keyword);

      const matchesCity = (cityFilter === "all")
        ? true
        : (prop.location.city.toLowerCase() === cityFilter);

      const matchesType      = (type === "all") ? true : (prop.type === type);
      const matchesPrice     = prop.price <= maxPrice;
      const matchesBedrooms  = (bedrooms === "any") ? true : (prop.bedrooms >= parseInt(bedrooms));
      const matchesBathrooms = (bathrooms === "any") ? true : (prop.bathrooms >= parseInt(bathrooms));

      return matchesKeyword && matchesCity && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms;
    });

    // Recreate markers using the filtered property data.
    window.createMarkers(filtered);

    // Highlight or remove the city border.
    if (cityFilter !== "all") {
      highlightCity(cityFilter);
    } else {
      removeHighlightCity();
    }
  });
})();
