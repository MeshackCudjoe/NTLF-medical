/**
 * ============================================================
 *  NTLF MEDICAL – Homepage JavaScript
 *  script-home.js
 *
 *  Handles: loader, dark mode, navigation, hero counters,
 *  featured product slider, stats counters, scroll-to-top,
 *  newsletter, FAQ accordion, scroll animations, cart badge.
 * ============================================================
 */

'use strict';

/* ── Run everything when DOM is ready ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initDarkMode();
  initNavigation();
  initCartBadge();
  initHeroCounters();
  initFeaturedSlider();
  initStatsCounters();
  initScrollTop();
  initNewsletter();
  initFAQ();
  initScrollAnimations();
  initFooterYear();
});

/* ══════════════════════════════════════════════════════════════
   LOADER
   Hides the full-screen overlay after assets are ready
══════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Hide after brief delay to allow fonts/layout to settle
  const hideAt = Math.max(1400, performance.now());
  const delay = Math.max(0, hideAt - performance.now());
  setTimeout(() => loader.classList.add('hidden'), delay);
}

/* ══════════════════════════════════════════════════════════════
   DARK MODE
   Persists preference in localStorage; applies on every page
══════════════════════════════════════════════════════════════ */
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  const saved  = localStorage.getItem('ntlf-theme') || 'light';
  applyTheme(saved);

  toggle && toggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('ntlf-theme', next);
  });
}
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
   Sticky header on scroll + mobile hamburger menu
══════════════════════════════════════════════════════════════ */
function initNavigation() {
  const header    = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Sticky header
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run immediately in case page is pre-scrolled

  // Hamburger toggle
  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger into X
    hamburger.classList.toggle('open', isOpen);
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks || !hamburger) return;
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav when a link is clicked
  navLinks && navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   CART BADGE
   Reads cart from localStorage and updates the badge count
══════════════════════════════════════════════════════════════ */
function initCartBadge() {
  updateCartBadge();
}
function updateCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('ntlf-cart') || '[]');
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
    el.textContent = total;
  });
}
// Expose globally so other functions can call it
window.updateCartBadge = updateCartBadge;

/* ══════════════════════════════════════════════════════════════
   HERO COUNTERS
   Animate the 3 numbers in the hero stats row
══════════════════════════════════════════════════════════════ */
function initHeroCounters() {
  const nums = document.querySelectorAll('.hero-stats .stat-num[data-target]');
  if (!nums.length) return;

  const animateNum = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNum(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  nums.forEach(n => observer.observe(n));
}

/* ══════════════════════════════════════════════════════════════
   FEATURED PRODUCTS SLIDER
   Auto-slides left-to-right, pauses on hover, arrow + dot nav
══════════════════════════════════════════════════════════════ */
function initFeaturedSlider() {
  const track    = document.getElementById('sliderTrack');
  const dotsCont = document.getElementById('sliderDots');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  if (!track) return;

  /* ---------- build cards ---------- */
  const featured = getFeaturedProducts(); // from products-data.js
  if (!featured.length) return;

  featured.forEach(product => {
    const card = document.createElement('div');
    card.className = 'slide-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${product.name} – ${formatPrice(product.price)}`);

    card.innerHTML = `
      <div class="slide-img">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.style.display='none'"
        />
        ${product.badge ? `<span class="slide-badge">${product.badge}</span>` : ''}
      </div>
      <div class="slide-cat">${getCategoryLabel(product.category)}</div>
      <h3 class="slide-name">${product.name}</h3>
      <div class="slide-price">${formatPrice(product.price)}</div>
      <div class="slide-qty">Per ${product.quantity}</div>
      <a class="slide-btn" href="product-details.html?id=${product.id}"
         aria-label="View details for ${product.name}">View Details</a>
    `;

    // Navigate to product page on card click (not on button, handled above)
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('slide-btn')) {
        window.location.href = `product-details.html?id=${product.id}`;
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.location.href = `product-details.html?id=${product.id}`;
    });

    track.appendChild(card);
  });

  /* ---------- responsive visible count ---------- */
  function getVisible() {
    if (window.innerWidth < 768)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  /* ---------- dots ---------- */
  let currentIdx = 0;
  let autoTimer;

  function buildDots() {
    if (!dotsCont) return;
    dotsCont.innerHTML = '';
    const visible = getVisible();
    const total   = Math.max(1, featured.length - visible + 1);
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className  = 'slider-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsCont.appendChild(btn);
    }
  }
  buildDots();
  window.addEventListener('resize', buildDots);

  /* ---------- movement ---------- */
  function goTo(idx) {
    const visible  = getVisible();
    const maxIdx   = Math.max(0, featured.length - visible);
    currentIdx     = Math.max(0, Math.min(idx, maxIdx));
    const cardWidth = track.children[0]
      ? track.children[0].offsetWidth + 24 // gap = 24px
      : 0;
    track.style.transform = `translateX(-${currentIdx * cardWidth}px)`;
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === currentIdx)
    );
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    const visible  = getVisible();
    const maxIdx   = Math.max(0, featured.length - visible);
    goTo(currentIdx <= 0 ? maxIdx : currentIdx - 1);
    resetAuto();
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    const visible  = getVisible();
    const maxIdx   = Math.max(0, featured.length - visible);
    goTo(currentIdx >= maxIdx ? 0 : currentIdx + 1);
    resetAuto();
  });

  /* ---------- auto-play ---------- */
  function startAuto() {
    autoTimer = setInterval(() => {
      const visible = getVisible();
      const maxIdx  = Math.max(0, featured.length - visible);
      goTo(currentIdx >= maxIdx ? 0 : currentIdx + 1);
    }, 3800);
  }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', startAuto);
  startAuto();

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(0));
}

/* Helper: get readable category label from id */
function getCategoryLabel(catId) {
  const match = NTLF_CATEGORIES.find(c => c.id === catId);
  return match ? match.label : catId.replace(/-/g, ' ');
}

/* ══════════════════════════════════════════════════════════════
   ANIMATED STATS COUNTERS (dark blue strip section)
══════════════════════════════════════════════════════════════ */
function initStatsCounters() {
  const cards = document.querySelectorAll('.stat-card[data-target]');
  if (!cards.length) return;

  const animateCard = (card) => {
    const target  = parseInt(card.dataset.target, 10);
    const suffix  = card.dataset.suffix || '';
    const numEl   = card.querySelector('.sc-num');
    if (!numEl) return;
    const duration = 2200;
    const start    = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      numEl.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else numEl.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCard(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  cards.forEach(c => observer.observe(c));
}

/* ══════════════════════════════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () =>
    btn.classList.toggle('show', window.scrollY > 500), { passive: true }
  );
  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

/* ══════════════════════════════════════════════════════════════
   NEWSLETTER FORM
══════════════════════════════════════════════════════════════ */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailEl = document.getElementById('nlEmail');
    const email   = emailEl ? emailEl.value.trim() : '';
    const re      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !re.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      emailEl && emailEl.focus();
      return;
    }

    // Save to localStorage (demo)
    const subs = JSON.parse(localStorage.getItem('ntlf-subscribers') || '[]');
    if (!subs.includes(email)) {
      subs.push(email);
      localStorage.setItem('ntlf-subscribers', JSON.stringify(subs));
    }

    showToast('Thank you for subscribing! We\'ll keep you updated.', 'success');
    form.reset();
  });
}

/* ══════════════════════════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════════════════════════ */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all first
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked one
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   SCROLL-TRIGGERED ANIMATIONS
   Elements with data-animate attribute fade up when visible
══════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.service-card, .tcard, .why-item, [data-animate]'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animated');
        }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    if (!el.style.opacity) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
    }
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════════════════════ */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════════
   TOAST UTILITY
══════════════════════════════════════════════════════════════ */
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className   = `toast show${type ? ' ' + type : ''}`;
  setTimeout(() => { toast.className = 'toast'; }, 3600);
}
// Expose globally for use from HTML onclick attributes
window.showToast = showToast;
