// ====== ग्राहकासाठी बदलायच्या सेटिंग्ज ======
const ACADEMY_NAME = "उत्कर्ष Academy";

// WhatsApp नंबर देशाच्या कोडसह, पण + किंवा spaces शिवाय लिहा.
// खालील 919999999999 हा फक्त डेमो नंबर आहे. खरा नंबर टाका.
const WHATSAPP_NUMBER = "919921489189";

// ====== मोबाइल मेनू ======
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "मेनू बंद करा" : "मेनू उघडा");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "मेनू उघडा");
    menuToggle.textContent = "☰";
  });
});

// Footer वर्ष
document.getElementById("year").textContent = new Date().getFullYear();

// कोर्स कार्डवरील चौकशी बटण फॉर्ममध्ये कोर्स निवडते.
document.querySelectorAll("[data-course]").forEach((link) => {
  link.addEventListener("click", () => {
    const courseSelect = document.getElementById("course");
    courseSelect.value = link.dataset.course;
  });
});

// फॉर्म माहिती WhatsApp संदेशात भरतो. कोणताही डेटा या वेबसाइटवर साठवला जात नाही.
document.getElementById("enquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const studentName = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const message = document.getElementById("message").value.trim();

  if (!studentName || !phone || !course) {
    document.getElementById("formNote").textContent = "कृपया नाव, मोबाईल नंबर आणि कोर्स भरा.";
    return;
  }

  if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
    document.getElementById("formNote").textContent = "कृपया योग्य मोबाईल नंबर टाका.";
    return;
  }

  if (WHATSAPP_NUMBER === "919921489189") {
    const continueDemo = confirm(
      "हा डेमो WhatsApp नंबर आहे. विक्रीपूर्वी script.js मधील WHATSAPP_NUMBER मध्ये क्लासचा खरा नंबर टाका. तरीही सध्याचा डेमो संदेश पाहायचा आहे का?"
    );
    if (!continueDemo) return;
  }

  const text = [
    `नमस्कार ${ACADEMY_NAME},`,
    "मला प्रवेशाबद्दल चौकशी करायची आहे.",
    `विद्यार्थ्याचे नाव: ${studentName}`,
    `मोबाईल नंबर: ${phone}`,
    `कोर्स: ${course}`,
    message ? `अधिक माहिती: ${message}` : ""
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
