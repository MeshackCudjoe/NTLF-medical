function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => loader.classList.add("hidden"), 1200);
}
/**
 * NTLF MEDICAL – Contact Page Script
 * script-contact.js
 */

// ─── Theme ─────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("ntlf_theme") || "light";
  document.body.dataset.theme = saved;
  updateThemeIcon(saved);
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("ntlf_theme", next);
    updateThemeIcon(next);
  });
}
function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (icon) icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function initNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => {
    if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
      navLinks?.classList.remove("open");
    }
  });
  window.addEventListener("scroll", () => {
    document
      .getElementById("navbar")
      ?.classList.toggle("scrolled", window.scrollY > 20);
  });
}

// ─── Scroll Top ────────────────────────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  window.addEventListener("scroll", () =>
    btn?.classList.toggle("visible", window.scrollY > 400),
  );
  btn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// ─── Cart Badge ────────────────────────────────────────────────────────────
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("ntlf_cart") || "[]");
  const count = cart.reduce((a, c) => a + c.qty, 0);
  document
    .querySelectorAll(".cart-count")
    .forEach((el) => (el.textContent = count));
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ─── Loader ────────────────────────────────────────────────────────────────
function hideLoader() {
  setTimeout(
    () => document.getElementById("loader")?.classList.add("hidden"),
    800,
  );
}

// ─── Character Counter ─────────────────────────────────────────────────────
function initCharCounter() {
  const textarea = document.getElementById("contactMessage");
  const counter = document.getElementById("charCount");
  if (!textarea || !counter) return;
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / 500`;
    if (len > 450) counter.style.color = "var(--accent)";
    else if (len > 480) counter.style.color = "#ef4444";
    else counter.style.color = "var(--text-muted)";
    if (len > 500) textarea.value = textarea.value.slice(0, 500);
  });
}

// ─── Contact Form Validation & Submit ──────────────────────────────────────
function initContactForm() {
  const form = document.getElementById("contactForm");
  const successDiv = document.getElementById("formSuccess");
  const sendAnother = document.getElementById("sendAnother");
  if (!form) return;

  // Live validation helpers
  function clearError(fieldId, errId) {
    document.getElementById(fieldId)?.classList.remove("invalid");
    const err = document.getElementById(errId);
    if (err) err.textContent = "";
  }
  function setError(fieldId, errId, message) {
    document.getElementById(fieldId)?.classList.add("invalid");
    const err = document.getElementById(errId);
    if (err) err.textContent = message;
  }

  // Add input styles on validation state
  document
    .querySelectorAll(
      ".input-wrap input, .input-wrap select, .input-wrap textarea",
    )
    .forEach((el) => {
      el.style.transition = "border-color .2s, box-shadow .2s";
      el.addEventListener(
        "focus",
        () => (el.style.borderColor = "var(--primary)"),
      );
      el.addEventListener("blur", () => {
        if (!el.value) el.style.borderColor = "var(--border)";
      });
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");
    const terms = document.getElementById("agreeTerms");

    // Reset errors
    [
      "nameError",
      "emailError",
      "subjectError",
      "messageError",
      "termsError",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    [name, email, subject, message].forEach(
      (el) => el && (el.style.borderColor = "var(--border)"),
    );

    // Validate Name
    if (!name?.value.trim() || name.value.trim().length < 2) {
      setError(
        "contactName",
        "nameError",
        "Please enter your full name (at least 2 characters).",
      );
      name.style.borderColor = "#ef4444";
      valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.value.trim() || !emailRegex.test(email.value)) {
      setError(
        "contactEmail",
        "emailError",
        "Please enter a valid email address.",
      );
      email.style.borderColor = "#ef4444";
      valid = false;
    }

    // Validate Subject
    if (!subject?.value) {
      setError("contactSubject", "subjectError", "Please select a subject.");
      subject.style.borderColor = "#ef4444";
      valid = false;
    }

    // Validate Message
    if (!message?.value.trim() || message.value.trim().length < 10) {
      setError(
        "contactMessage",
        "messageError",
        "Please enter a message (at least 10 characters).",
      );
      message.style.borderColor = "#ef4444";
      valid = false;
    }

    // Validate Terms
    if (!terms?.checked) {
      document.getElementById("termsError").textContent =
        "You must agree to the Privacy Policy and Terms.";
      valid = false;
    }

    if (!valid) return;

    // Simulate submission (loading state)
    const btn = document.getElementById("submitBtn");
    btn.querySelector(".btn-text").style.display = "none";
    btn.querySelector(".btn-loading").style.display = "inline-flex";
    btn.disabled = true;

    // Store contact message in localStorage for demo
    const messages = JSON.parse(localStorage.getItem("ntlf_contacts") || "[]");
    messages.push({
      id: Date.now(),
      name: name.value.trim(),
      email: email.value.trim(),
      phone: document.getElementById("contactPhone")?.value.trim() || "",
      subject: subject.value,
      message: message.value.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem("ntlf_contacts", JSON.stringify(messages));

    // Simulate network delay
    setTimeout(() => {
      form.style.display = "none";
      successDiv.style.display = "block";
      showToast("Message sent successfully!", "success");
    }, 1800);
  });

  // Send another message
  sendAnother?.addEventListener("click", () => {
    successDiv.style.display = "none";
    form.style.display = "block";
    form.reset();
    document.getElementById("charCount").textContent = "0 / 500";
    const btn = document.getElementById("submitBtn");
    btn.querySelector(".btn-text").style.display = "inline-flex";
    btn.querySelector(".btn-loading").style.display = "none";
    btn.disabled = false;
  });
}

// ─── Initialize ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  hideLoader();
  initTheme();
  initNav();
  initScrollTop();
  updateCartBadge();
  initCharCounter();
  initContactForm();
  document.getElementById("year") &&
    (document.getElementById("year").textContent = new Date().getFullYear());
});
