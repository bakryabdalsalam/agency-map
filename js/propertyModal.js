/***************************************************
 * propertyModal.js
 * Controls displaying property details in a modal,
 * and contact actions for WhatsApp and Call/SMS.
 ***************************************************/

(function() {
  const modal = document.getElementById("property-modal");
  const closeBtn = modal.querySelector(".close-btn");
  const modalBody = document.getElementById("modal-body");

  // Show property details in modal
  window.showPropertyDetails = function(id) {
    const property = window.allProperties.find((p) => p.id === id);
    if (!property) return;

    // Build modal content (including images if available)
    let imagesHtml = "";
    if (property.images && property.images.length) {
      imagesHtml = property.images
        .map((img) => `<img src="${img}" alt="Property Image" />`)
        .join("");
    }

    // Replace the single request button with two buttons:
    // one for WhatsApp and one for Call/SMS.
    modalBody.innerHTML = `
      <h2>${property.title}</h2>
      <p><strong>${translations[currentLang].propPrice}:</strong> ${property.price} EGP</p>
      <p><strong>${translations[currentLang].propType}:</strong> ${property.type}</p>
      <p><strong>${translations[currentLang].propBeds}:</strong> ${property.bedrooms}</p>
      <p><strong>${translations[currentLang].propBaths}:</strong> ${property.bathrooms}</p>
      <div class="modal-images">${imagesHtml}</div>
      <div class="contact-buttons">
        <button onclick="contactPropertyWhatsapp('${property.title}')">
          WhatsApp
        </button>
        <button onclick="contactPropertyCall('${property.title}')">
          Call / SMS
        </button>
      </div>
    `;

    // Show modal
    modal.style.display = "block";
  };

  // Close the modal when clicking the close button or outside the modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Contact property via WhatsApp
  window.contactPropertyWhatsapp = function(propertyTitle) {
    const whatsappNumber = '1234567890'; // <-- Replace with your WhatsApp number
    // Customize the message to include the property title
    const message = encodeURIComponent(`Hello, I'm interested in ${propertyTitle}`);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  // Contact property via Call or SMS
  window.contactPropertyCall = function(propertyTitle) {
    const phoneNumber = '1234567890'; // <-- Replace with your phone number
    // Ask the user if they want to call or send an SMS.
    // (For example, OK = call; Cancel = SMS)
    if (confirm("Would you like to call? Press OK for a call, or Cancel to send a message.")) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      const message = encodeURIComponent(`Hello, I'm interested in ${propertyTitle}`);
      window.location.href = `sms:${phoneNumber}?body=${message}`;
    }
  };
})();
