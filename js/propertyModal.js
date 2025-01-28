/***************************************************
 * propertyModal.js
 * Controls displaying property details in a modal,
 * and a contact action (e.g., "Request More Info").
 ***************************************************/

(function() {
    const modal = document.getElementById("property-modal");
    const closeBtn = modal.querySelector(".close-btn");
    const modalBody = document.getElementById("modal-body");
  
    // Show property details in modal
    window.showPropertyDetails = function(id) {
      const property = window.allProperties.find((p) => p.id === id);
      if (!property) return;
  
      // Build modal content
      let imagesHtml = "";
      if (property.images && property.images.length) {
        imagesHtml = property.images
          .map((img) => `<img src="${img}" alt="Prop Image" />`)
          .join("");
      }
  
      modalBody.innerHTML = `
        <h2>${property.title}</h2>
        <p><strong>${translations[currentLang].propPrice}:</strong> ${property.price} EGP</p>
        <p><strong>${translations[currentLang].propType}:</strong> ${property.type}</p>
        <p><strong>${translations[currentLang].propBeds}:</strong> ${property.bedrooms}</p>
        <p><strong>${translations[currentLang].propBaths}:</strong> ${property.bathrooms}</p>
        <div class="modal-images">${imagesHtml}</div>
        <button onclick="contactProperty(${property.id})" style="margin-top:1rem;">
          ${translations[currentLang].modalMoreInfo}
        </button>
      `;
  
      // Show modal
      modal.style.display = "block";
    };
  
    // Close the modal
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Contact property (dummy action)
    window.contactProperty = function(id) {
      alert(translations[currentLang].contactSuccess);
      // In a real application, you might open a form or
      // send a request to the server here.
    };
  })();
  