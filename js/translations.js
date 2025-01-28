/***************************************************
 * translations.js
 * Handles the bilingual (EN/AR) translation logic
 ***************************************************/

// Translation dictionary
window.translations = {
    en: {
      homeLink: "Home",
      propLink: "Properties",
      contactLink: "Contact",
  
      filterToggle: "Show Filters",
      filterTitle: "Filter Properties",
      searchLabel: "Search by keyword:",
      typeLabel: "Property Type:",
      typeAll: "All Types",
      typeApartment: "Apartment",
      typeVilla: "Villa",
      typeCommercial: "Commercial",
      priceLabel: "Max Price (EGP):",
      bedroomLabel: "Bedrooms:",
      bathroomLabel: "Bathrooms:",
      any: "Any",
      filterBtn: "Apply Filters",
      locateBtn: "Locate Me",
      exploreBtn: "Explore Hotspots",
  
      footerContact: "Contact: +20 123 456 789",
      subscribeLabel: "Subscribe for updates:",
      subscribeBtn: "Subscribe",
  
      favoriteList: "Favorites:",
      compareList: "Compare:",
      compareBtn: "View Comparison",
  
      propPrice: "Price",
      propType: "Type",
      propBeds: "Bedrooms",
      propBaths: "Bathrooms",
  
      modalMoreInfo: "Request More Info",
      addedToFav: "Added to Favorites",
      removedFromFav: "Removed from Favorites",
      addedToCompare: "Added to Comparison",
      removedFromCompare: "Removed from Comparison",
      contactSuccess: "Inquiry sent! We'll contact you soon."
    },
  
    ar: {
      homeLink: "الرئيسية",
      propLink: "العقارات",
      contactLink: "اتصل بنا",
  
      filterToggle: "إظهار الفلاتر",
      filterTitle: "فلترة العقارات",
      searchLabel: "ابحث بالكلمة الرئيسية:",
      typeLabel: "نوع العقار:",
      typeAll: "جميع الأنواع",
      typeApartment: "شقة",
      typeVilla: "فيلا",
      typeCommercial: "تجاري",
      priceLabel: "أقصى سعر (ج.م):",
      bedroomLabel: "عدد الغرف:",
      bathroomLabel: "عدد الحمامات:",
      any: "أي",
      filterBtn: "تطبيق الفلاتر",
      locateBtn: "موقعي",
      exploreBtn: "استكشف المناطق",
  
      footerContact: "اتصال: +20 123 456 789",
      subscribeLabel: "اشترك للحصول على التحديثات:",
      subscribeBtn: "اشترك",
  
      favoriteList: "المفضلة:",
      compareList: "المقارنة:",
      compareBtn: "عرض المقارنة",
  
      propPrice: "السعر",
      propType: "النوع",
      propBeds: "غرف النوم",
      propBaths: "الحمامات",
  
      modalMoreInfo: "طلب المزيد من المعلومات",
      addedToFav: "تمت الإضافة للمفضلة",
      removedFromFav: "تمت الإزالة من المفضلة",
      addedToCompare: "تمت الإضافة للمقارنة",
      removedFromCompare: "تمت الإزالة من المقارنة",
      contactSuccess: "تم إرسال الاستفسار! سنتواصل معك قريبًا."
    }
  };
  
  // Current language
  window.currentLang = localStorage.getItem("siteLang") || "en";
  
  // Switch language function
  window.updateLanguage = function(lang) {
    window.currentLang = lang;
    localStorage.setItem("siteLang", lang);
  
    const btnEn = document.getElementById("btn-en");
    const btnAr = document.getElementById("btn-ar");
  
    // Update active button styles & direction
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
      if (window.translations[lang][key]) {
        el.textContent = window.translations[lang][key];
      }
    });
  };
  
  // Initialize language immediately
  window.updateLanguage(window.currentLang);
  
  // Add event listeners for language buttons
  window.addEventListener("DOMContentLoaded", () => {
    const btnEn = document.getElementById("btn-en");
    const btnAr = document.getElementById("btn-ar");
  
    btnEn.addEventListener("click", () => window.updateLanguage("en"));
    btnAr.addEventListener("click", () => window.updateLanguage("ar"));
  });
  