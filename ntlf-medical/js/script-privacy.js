/**
 * NTLF MEDICAL – Privacy Policy & Terms of Service Script
 * script-privacy.js
 *
 * Handles: loader, dark mode (Sora theme keys), nav/hamburger,
 *          scroll-to-top, TOC active highlight on scroll,
 *          cart badge count, footer year.
 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  initLoader();
  initTheme();
  initNav();
  initScrollTop();
  initTocHighlight();
  refreshCartBadge();
  initFooterYear();
});

/* ── Loader ─────────────────────────────────────────────── */
function initLoader() {
  setTimeout(function () {
    var loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 1000);
}

/* ── Theme (uses ntlf-theme key — matches all pages) ────── */
function initTheme() {
  var saved = localStorage.getItem("ntlf-theme") || "light";
  document.body.setAttribute("data-theme", saved);

  document.getElementById("darkToggle")?.addEventListener("click", function () {
    var next =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("ntlf-theme", next);
  });
}

/* ── Navigation & hamburger ─────────────────────────────── */
function initNav() {
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  hamburger?.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", function (e) {
    if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
      navLinks?.classList.remove("open");
    }
  });
}

/* ── Scroll to top ──────────────────────────────────────── */
function initScrollTop() {
  var btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    function () {
      btn.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true },
  );
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── TOC active link on scroll ──────────────────────────── */
function initTocHighlight() {
  var links = document.querySelectorAll(".toc-link");
  var sections = document.querySelectorAll(".legal-section[id]");
  if (!sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) {
            l.classList.remove("active");
          });
          var active = document.querySelector(
            '.toc-link[href="#' + entry.target.id + '"]',
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-15% 0% -70% 0%" },
  );

  sections.forEach(function (s) {
    observer.observe(s);
  });

  /* Smooth scroll on TOC click */
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ── Cart badge ─────────────────────────────────────────── */
function refreshCartBadge() {
  try {
    var cart = JSON.parse(localStorage.getItem("ntlf-cart") || "[]");
    var count = cart.reduce(function (s, i) {
      return s + (i.qty || 1);
    }, 0);
    document.querySelectorAll("#cartBadge, .cart-badge").forEach(function (el) {
      el.textContent = count;
    });
  } catch (e) {
    /* silent */
  }
}

/* ── Footer year ────────────────────────────────────────── */
function initFooterYear() {
  var el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}
