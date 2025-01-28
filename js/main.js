/***************************************************
 * main.js
 * Any high-level logic that ties the page together,
 * such as the mobile filter panel toggle.
 ***************************************************/

(function() {
    // MOBILE FILTER TOGGLE
    const mobileFilterToggle = document.getElementById("mobile-filter-toggle");
    const filterPanel = document.getElementById("filter-panel");
    let isFilterOpen = false;
  
    mobileFilterToggle.addEventListener("click", () => {
      isFilterOpen = !isFilterOpen;
      if (isFilterOpen) {
        filterPanel.classList.remove("collapsed");
        // Switch button text to "Hide Filters" or "إخفاء الفلاتر"
        mobileFilterToggle.textContent =
          (window.translations[window.currentLang].filterToggle === "Show Filters")
            ? "Hide Filters"
            : "إخفاء الفلاتر";
      } else {
        filterPanel.classList.add("collapsed");
        mobileFilterToggle.textContent = window.translations[window.currentLang].filterToggle;
      }
    });
  
    // By default on small screens, start collapsed
    if (window.innerWidth < 768) {
      filterPanel.classList.add("collapsed");
    }
  })();
  