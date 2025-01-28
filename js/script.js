// --------------------------------------------------
// 1. Bilingual Text Definitions
// --------------------------------------------------
const translations = {
    en: {
      filterTitle: "Filter Properties",
      searchLabel: "Search by keyword:",
      typeLabel: "Property Type:",
      typeAll: "All Types",
      typeApartment: "Apartment",
      typeVilla: "Villa",
      typeCommercial: "Commercial",
      priceLabel: "Price Range:",
      bedroomLabel: "Bedrooms:",
      bathroomLabel: "Bathrooms:",
      any: "Any",
      filterBtn: "Apply Filters",
      footerContact: "Contact: +20 123 456 789",
      subscribeLabel: "Subscribe for updates:",
      subscribeBtn: "Subscribe"
    },
    ar: {
      filterTitle: "فلترة العقارات",
      searchLabel: "ابحث بالكلمة الرئيسية:",
      typeLabel: "نوع العقار:",
      typeAll: "جميع الأنواع",
      typeApartment: "شقة",
      typeVilla: "فيلا",
      typeCommercial: "تجاري",
      priceLabel: "نطاق السعر:",
      bedroomLabel: "عدد الغرف:",
      bathroomLabel: "عدد الحمامات:",
      any: "أي",
      filterBtn: "تطبيق الفلاتر",
      footerContact: "اتصال: +20 123 456 789",
      subscribeLabel: "اشترك للحصول على التحديثات:",
      subscribeBtn: "اشترك"
    }
  };
  
  // --------------------------------------------------
  // 2. Language Toggle Logic
  // --------------------------------------------------
  let currentLang = localStorage.getItem("siteLang") || "en";
  const btnEn = document.getElementById("btn-en");
  const btnAr = document.getElementById("btn-ar");
  
  function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("siteLang", lang);
  
    // Update active button styles
    if (lang === "en") {
      btnEn.classList.add("active");
      btnAr.classList.remove("active");
      document.body.dir = "ltr";
    } else {
      btnAr.classList.add("active");
      btnEn.classList.remove("active");
      document.body.dir = "rtl";
    }
  
    // Translate elements
    document.querySelectorAll("[data-lang]").forEach(el => {
      const key = el.getAttribute("data-lang");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }
  
  // Event Listeners for language buttons
  btnEn.addEventListener("click", () => updateLanguage("en"));
  btnAr.addEventListener("click", () => updateLanguage("ar"));
  
  // Initialize on page load
  updateLanguage(currentLang);
  
  // --------------------------------------------------
  // 3. Map Initialization (Leaflet)
  // --------------------------------------------------
  const map = L.map("map").setView([30.0444, 31.2357], 6); // Centered on Egypt
  
  // Add a base map layer (OpenStreetMap tiles)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);
  
  // --------------------------------------------------
  // 4. Load Properties and Create Markers
  // --------------------------------------------------
  let allProperties = [];  // Will store all fetched properties
  let markers = [];        // Store Leaflet markers for filtering
  
  fetch("../data/properties.json")  // Adjust path if needed
    .then(response => response.json())
    .then(data => {
      allProperties = data;
      createMarkers(allProperties);
    })
    .catch(err => {
      console.error("Error loading properties:", err);
    });
  
  function createMarkers(properties) {
    // Clear existing markers from map
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  
    properties.forEach(prop => {
      const marker = L.marker([prop.location.lat, prop.location.lng]).addTo(map);
  
      // Create a popup for the marker
      const popupContent = `
        <h3>${prop.title}</h3>
        <p>Price: ${prop.price} EGP</p>
        <p>${prop.type.toUpperCase()}</p>
        <button onclick="showPropertyDetails(${prop.id})">View More</button>
      `;
      marker.bindPopup(popupContent);
  
      markers.push(marker);
    });
  }
  
  // --------------------------------------------------
  // 5. Filtering Logic
  // --------------------------------------------------
  const filterBtn = document.getElementById("btn-filter");
  
  filterBtn.addEventListener("click", () => {
    const keyword = document.getElementById("search-input").value.toLowerCase();
    const type = document.getElementById("property-type").value;
    const maxPrice = parseInt(document.getElementById("price-range").value, 10) || 10000000;
    const bedrooms = document.getElementById("bedrooms").value;
    const bathrooms = document.getElementById("bathrooms").value;
  
    const filtered = allProperties.filter(prop => {
      const inKeyword = prop.title.toLowerCase().includes(keyword) ||
                        prop.location.city.toLowerCase().includes(keyword) ||
                        prop.location.neighborhood.toLowerCase().includes(keyword);
      const inType = (type === "all") ? true : (prop.type === type);
      const inPrice = prop.price <= maxPrice;
      const inBedrooms = (bedrooms === "any") ? true : (prop.bedrooms >= parseInt(bedrooms));
      const inBathrooms = (bathrooms === "any") ? true : (prop.bathrooms >= parseInt(bathrooms));
  
      return inKeyword && inType && inPrice && inBedrooms && inBathrooms;
    });
  
    // Update map markers
    createMarkers(filtered);
  });
  
  // --------------------------------------------------
  // 6. Property Details Modal
  // --------------------------------------------------
  const modal = document.getElementById("property-modal");
  const closeBtn = document.querySelector(".close-btn");
  const modalBody = document.getElementById("modal-body");
  
  function showPropertyDetails(id) {
    // Find the property by ID
    const property = allProperties.find(p => p.id === id);
    if (!property) return;
  
    // Build HTML content for the modal
    let imagesHtml = "";
    if (property.images && property.images.length) {
      imagesHtml = property.images.map(img => `<img src="${img}" alt="Property Image" style="width:100%;max-width:400px;">`).join("");
    }
  
    modalBody.innerHTML = `
      <h2>${property.title}</h2>
      <p><strong>Price:</strong> ${property.price} EGP</p>
      <p><strong>Type:</strong> ${property.type}</p>
      <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
      ${imagesHtml}
      <button onclick="contactProperty(${property.id})">Request More Info</button>
    `;
    modal.style.display = "block";
  }
  
  // Close modal on close button click
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Close modal if user clicks outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
  // --------------------------------------------------
  // 7. Contact / Inquiry Action
  // --------------------------------------------------
  function contactProperty(id) {
    alert(`You requested more info about property ID: ${id}`);
    // Here you could open another form, send data to server, etc.
  }
  
  // Expose function globally (for inline onclick usage)
  window.showPropertyDetails = showPropertyDetails;
  window.contactProperty = contactProperty;
  