/**
 * ============================================================
 *  NTLF MEDICAL – About Page JavaScript
 *  script-about.js
 *
 *  Handles: loader, dark mode, navigation, scroll-to-top,
 *  FAQ accordion, scroll entry animations, cart badge, footer year.
 * ============================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initDarkMode();
  initNavigation();
  initScrollTop();
  initCartBadge();
  initFAQ();
  initScrollAnimations();
  initFooterYear();
});

/* ── Loader ──────────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 1400);
}

/* ── Dark Mode ───────────────────────────────────────────────── */
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  const saved  = localStorage.getItem('ntlf-theme') || 'light';
  document.body.setAttribute('data-theme', saved);

  toggle && toggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('ntlf-theme', next);
  });
}

/* ── Navigation ──────────────────────────────────────────────── */
function initNavigation() {
  const header    = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // The about page header is always solid (not transparent hero)
  header && header.classList.add('scrolled');

  window.addEventListener('scroll', () =>
    header && header.classList.toggle('scrolled', window.scrollY > 20)
  , { passive: true });

  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (navLinks && hamburger &&
        !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ── Scroll Top ──────────────────────────────────────────────── */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () =>
    btn.classList.toggle('show', window.scrollY > 500), { passive: true }
  );
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Cart Badge ──────────────────────────────────────────────── */
function initCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('ntlf-cart') || '[]');
  const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
    el.textContent = count;
  });
}

/* ── FAQ Accordion ───────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });

      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── Scroll Animations ───────────────────────────────────────── */
function initScrollAnimations() {
  const selectors = [
    '.mvv-card', '.supply-card', '.team-card',
    '.adv-card', '.story-highlights .sh-item'
  ];
  const targets = document.querySelectorAll(selectors.join(', '));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 75);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    observer.observe(el);
  });
}

/* ── Footer Year ─────────────────────────────────────────────── */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Toast Utility ───────────────────────────────────────────── */
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className   = `toast show${type ? ' ' + type : ''}`;
  setTimeout(() => { toast.className = 'toast'; }, 3600);
}
