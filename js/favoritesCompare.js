/***************************************************
 * favoritesCompare.js
 * Manages Favorites and Comparison lists (both stored
 * in localStorage), plus the Comparison Modal logic.
 ***************************************************/

(function() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
  
    const favListCount = document.getElementById("fav-list-count");
    const compListCount = document.getElementById("comp-list-count");
    const compareModal = document.getElementById("compare-modal");
    const compareClose = compareModal.querySelector(".compare-close");
    const compareBody = document.getElementById("compare-body");
    const btnViewCompare = document.getElementById("btn-view-compare");
  
    // Update UI counts
    function updateCounts() {
      favListCount.textContent = favorites.length;
      compListCount.textContent = compareList.length;
    }
    updateCounts();
  
    // Toggle favorite
    window.toggleFavorite = function(id) {
      if (favorites.includes(id)) {
        favorites = favorites.filter((fid) => fid !== id);
        alert(translations[currentLang].removedFromFav);
      } else {
        favorites.push(id);
        alert(translations[currentLang].addedToFav);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateCounts();
    };
  
    // Toggle compare
    window.toggleCompare = function(id) {
      if (compareList.includes(id)) {
        compareList = compareList.filter((cid) => cid !== id);
        alert(translations[currentLang].removedFromCompare);
      } else {
        compareList.push(id);
        alert(translations[currentLang].addedToCompare);
      }
      localStorage.setItem("compareList", JSON.stringify(compareList));
      updateCounts();
    };
  
    // Show comparison modal
    btnViewCompare.addEventListener("click", () => {
      // Build a table of all compare properties
      let html = "<h2>Comparison</h2><table border='1' style='width:100%;border-collapse:collapse'>";
      html += "<tr><th>Title</th><th>Price</th><th>Type</th><th>Bedrooms</th><th>Bathrooms</th></tr>";
  
      compareList.forEach((cid) => {
        const prop = window.allProperties.find((p) => p.id === cid);
        if (prop) {
          html += `<tr>
            <td>${prop.title}</td>
            <td>${prop.price}</td>
            <td>${prop.type}</td>
            <td>${prop.bedrooms}</td>
            <td>${prop.bathrooms}</td>
          </tr>`;
        }
      });
  
      html += "</table>";
      compareBody.innerHTML = html;
  
      compareModal.style.display = "block";
    });
  
    // Close comparison modal
    compareClose.addEventListener("click", () => {
      compareModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === compareModal) {
        compareModal.style.display = "none";
      }
    });
  
  })();
  