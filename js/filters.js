/***************************************************
 * filters.js
 * Handles the filtering of properties based on
 * user input (keyword, type, price, bedrooms, baths).
 ***************************************************/

(function() {
    const filterBtn = document.getElementById("btn-filter");
    
    filterBtn.addEventListener("click", () => {
      const keyword = document.getElementById("search-input").value.toLowerCase();
      const type = document.getElementById("property-type").value;
      const maxPrice = parseInt(document.getElementById("price-range").value, 10) || 10000000;
      const bedrooms = document.getElementById("bedrooms").value;
      const bathrooms = document.getElementById("bathrooms").value;
  
      const filtered = window.allProperties.filter((prop) => {
        const matchesKeyword =
          prop.title.toLowerCase().includes(keyword) ||
          prop.location.city.toLowerCase().includes(keyword) ||
          prop.location.neighborhood.toLowerCase().includes(keyword);
  
        const matchesType = (type === "all") ? true : (prop.type === type);
        const matchesPrice = prop.price <= maxPrice;
        const matchesBedrooms = (bedrooms === "any") ? true : (prop.bedrooms >= parseInt(bedrooms));
        const matchesBathrooms = (bathrooms === "any") ? true : (prop.bathrooms >= parseInt(bathrooms));
  
        return matchesKeyword && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms;
      });
  
      // Recreate markers with filtered data
      window.createMarkers(filtered);
    });
  
  })();
  