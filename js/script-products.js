/**
 * ============================================================
 *  NTLF MEDICAL – Products Catalog JavaScript
 *  script-products.js
 *
 *  Handles: loader, dark mode, navigation, product rendering,
 *  search, category filtering, price filtering, sorting,
 *  grid/list view toggle, pagination, quick-view modal,
 *  add-to-cart, URL param pre-filtering, cart badge.
 * ============================================================
 */

'use strict';

/* ── Constants ──────────────────────────────────────────────── */
const ITEMS_PER_PAGE = 12;

/* ── State ──────────────────────────────────────────────────── */
const state = {
  allProducts:   [],   // full product list (static + admin)
  filtered:      [],   // after filter/search/sort
  currentPage:   1,
  activeCategory:'all',
  searchQuery:   '',
  sortBy:        'default',
  priceMin:      null,
  priceMax:      null,
  viewMode:      'grid',  // 'grid' | 'list'
};

/* ══════════════════════════════════════════════════════════════
   INITIALISE
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initDarkMode();
  initNavigation();
  initCartBadge();
  initScrollTop();
  initFooterYear();
  loadProducts();
  buildCategoryList();
  initSearch();
  initSortSelect();
  initPriceFilter();
  initViewToggle();
  initFilterToggle();
  readURLParams();         // apply ?cat= from URL
  applyFiltersAndRender(); // first render
});

/* ══════════════════════════════════════════════════════════════
   LOADER
══════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 1200);
}

/* ══════════════════════════════════════════════════════════════
   DARK MODE
══════════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════ */
function initNavigation() {
  const header    = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header && header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!navLinks || !hamburger) return;
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   CART BADGE
══════════════════════════════════════════════════════════════ */
function initCartBadge() { updateCartBadge(); }

function updateCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('ntlf-cart') || '[]');
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
    el.textContent = total;
  });
}

function addToCart(productId) {
  const product = state.allProducts.find(p => p.id === productId);
  if (!product) return;

  const cart    = JSON.parse(localStorage.getItem('ntlf-cart') || '[]');
  const existing = cart.find(c => c.id === productId);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
    showToast(`${product.name} — quantity updated in cart`, 'success');
  } else {
    cart.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      qty:   1,
      unit:  product.quantity,
      image: product.image,
    });
    showToast(`${product.name} added to cart!`, 'success');
  }

  localStorage.setItem('ntlf-cart', JSON.stringify(cart));
  updateCartBadge();
}

/* ══════════════════════════════════════════════════════════════
   SCROLL TOP
══════════════════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () =>
    btn.classList.toggle('show', window.scrollY > 500), { passive: true }
  );
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ══════════════════════════════════════════════════════════════
   LOAD PRODUCTS
   Merges static NTLF_PRODUCTS with any admin-added products
══════════════════════════════════════════════════════════════ */
function loadProducts() {
  const adminProds = JSON.parse(localStorage.getItem('ntlf-admin-products') || '[]');

  // Apply admin overrides (price/name/desc edits on built-in products)
  const overrides = JSON.parse(localStorage.getItem('ntlf-product-overrides') || '{}');
  const baseProducts = NTLF_PRODUCTS.map(function(p) {
    if (overrides[p.id]) {
      return Object.assign({}, p, overrides[p.id]);
    }
    return p;
  });

  state.allProducts = [...baseProducts, ...adminProds];

  // Update hero count
  const countEl = document.getElementById('totalCount');
  if (countEl) countEl.textContent = state.allProducts.length + '+';
}

/* ══════════════════════════════════════════════════════════════
   BUILD CATEGORY LIST (sidebar)
══════════════════════════════════════════════════════════════ */
function buildCategoryList() {
  const list = document.getElementById('categoryList');
  if (!list) return;

  list.innerHTML = '';
  NTLF_CATEGORIES.forEach(cat => {
    const count = cat.id === 'all'
      ? state.allProducts.length
      : state.allProducts.filter(p => p.category === cat.id).length;

    const li  = document.createElement('li');
    const btn = document.createElement('button');
    btn.className  = 'cat-btn' + (cat.id === state.activeCategory ? ' active' : '');
    btn.dataset.cat = cat.id;
    btn.setAttribute('aria-pressed', cat.id === state.activeCategory);
    btn.innerHTML  = `
      <span class="cat-btn-label">
        <span class="cat-btn-icon" aria-hidden="true" style="--cat-color:${cat.color || '#1a56db'}">
          <i class="${cat.icon || 'fas fa-tag'}"></i>
        </span>
        ${cat.label}
      </span>
      <span class="cat-btn-count">${count}</span>`;
    btn.addEventListener('click', () => {
      setCategory(cat.id);
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function setCategory(catId) {
  state.activeCategory = catId;
  state.currentPage    = 1;

  // Update button styles
  document.querySelectorAll('.cat-btn').forEach(b => {
    const isActive = b.dataset.cat === catId;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive);
  });

  applyFiltersAndRender();
  updateActiveFilterTags();
}

/* ══════════════════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════════════════ */
function initSearch() {
  const input    = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchQuery = input.value.trim().toLowerCase();
      state.currentPage = 1;
      clearBtn.style.display = state.searchQuery ? 'block' : 'none';
      applyFiltersAndRender();
      updateActiveFilterTags();
    }, 280);
  });

  clearBtn && clearBtn.addEventListener('click', () => {
    input.value        = '';
    state.searchQuery  = '';
    state.currentPage  = 1;
    clearBtn.style.display = 'none';
    applyFiltersAndRender();
    updateActiveFilterTags();
    input.focus();
  });

  // Clear filters empty state button
  document.getElementById('clearFiltersBtn')?.addEventListener('click', resetAllFilters);
  document.getElementById('resetFilters')?.addEventListener('click', resetAllFilters);
}

/* ══════════════════════════════════════════════════════════════
   SORT SELECT
══════════════════════════════════════════════════════════════ */
function initSortSelect() {
  const sel = document.getElementById('sortSelect');
  if (!sel) return;
  sel.addEventListener('change', () => {
    state.sortBy      = sel.value;
    state.currentPage = 1;
    applyFiltersAndRender();
  });
}

/* ══════════════════════════════════════════════════════════════
   PRICE FILTER
══════════════════════════════════════════════════════════════ */
function initPriceFilter() {
  const applyBtn = document.getElementById('applyPriceBtn');
  if (!applyBtn) return;

  applyBtn.addEventListener('click', () => {
    const minInput = document.getElementById('priceMin');
    const maxInput = document.getElementById('priceMax');
    state.priceMin    = minInput && minInput.value !== '' ? parseFloat(minInput.value) : null;
    state.priceMax    = maxInput && maxInput.value !== '' ? parseFloat(maxInput.value) : null;
    state.currentPage = 1;
    applyFiltersAndRender();
    updateActiveFilterTags();
  });
}

/* ══════════════════════════════════════════════════════════════
   VIEW TOGGLE (grid / list)
══════════════════════════════════════════════════════════════ */
function initViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.viewMode = btn.dataset.view;
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('productsGrid');
      grid && grid.classList.toggle('list-view', state.viewMode === 'list');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   MOBILE FILTER TOGGLE
══════════════════════════════════════════════════════════════ */
function initFilterToggle() {
  const btn   = document.getElementById('filterToggle');
  const panel = document.getElementById('filterPanel');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });
}

/* ══════════════════════════════════════════════════════════════
   READ URL PARAMS
   Supports ?cat=gloves, ?search=syringe
══════════════════════════════════════════════════════════════ */
function readURLParams() {
  const params = new URLSearchParams(window.location.search);

  const cat = params.get('cat');
  if (cat) {
    // Check if valid category
    const valid = NTLF_CATEGORIES.find(c => c.id === cat);
    if (valid) state.activeCategory = cat;
  }

  const search = params.get('search');
  if (search) {
    state.searchQuery = search.toLowerCase();
    const inp = document.getElementById('searchInput');
    if (inp) inp.value = search;
    const clr = document.getElementById('searchClear');
    if (clr) clr.style.display = 'block';
  }
}

/* ══════════════════════════════════════════════════════════════
   RESET ALL FILTERS
══════════════════════════════════════════════════════════════ */
function resetAllFilters() {
  state.activeCategory = 'all';
  state.searchQuery    = '';
  state.sortBy         = 'default';
  state.priceMin       = null;
  state.priceMax       = null;
  state.currentPage    = 1;

  // Reset UI
  const inp    = document.getElementById('searchInput');
  const clr    = document.getElementById('searchClear');
  const minInp = document.getElementById('priceMin');
  const maxInp = document.getElementById('priceMax');
  const sort   = document.getElementById('sortSelect');

  if (inp)    inp.value = '';
  if (clr)    clr.style.display = 'none';
  if (minInp) minInp.value = '';
  if (maxInp) maxInp.value = '';
  if (sort)   sort.value = 'default';

  document.querySelectorAll('.cat-btn').forEach(b => {
    const isAll = b.dataset.cat === 'all';
    b.classList.toggle('active', isAll);
    b.setAttribute('aria-pressed', isAll);
  });

  applyFiltersAndRender();
  updateActiveFilterTags();
}

/* ══════════════════════════════════════════════════════════════
   ACTIVE FILTER TAGS (above product grid)
══════════════════════════════════════════════════════════════ */
function updateActiveFilterTags() {
  const bar = document.getElementById('activeFilters');
  if (!bar) return;
  bar.innerHTML = '';

  const addTag = (label, clearFn) => {
    const tag    = document.createElement('span');
    tag.className = 'filter-tag';
    tag.innerHTML = `${label} <button class="filter-tag-remove" aria-label="Remove ${label} filter">✕</button>`;
    tag.querySelector('.filter-tag-remove').addEventListener('click', clearFn);
    bar.appendChild(tag);
  };

  if (state.activeCategory !== 'all') {
    const cat = NTLF_CATEGORIES.find(c => c.id === state.activeCategory);
    addTag(`Category: ${cat ? cat.label : state.activeCategory}`, () => setCategory('all'));
  }
  if (state.searchQuery) {
    addTag(`Search: "${state.searchQuery}"`, () => {
      state.searchQuery = '';
      const inp = document.getElementById('searchInput');
      if (inp) inp.value = '';
      const clr = document.getElementById('searchClear');
      if (clr) clr.style.display = 'none';
      state.currentPage = 1;
      applyFiltersAndRender();
      updateActiveFilterTags();
    });
  }
  if (state.priceMin !== null) {
    addTag(`Min: GH₵${state.priceMin}`, () => {
      state.priceMin = null;
      const inp = document.getElementById('priceMin');
      if (inp) inp.value = '';
      state.currentPage = 1;
      applyFiltersAndRender();
      updateActiveFilterTags();
    });
  }
  if (state.priceMax !== null) {
    addTag(`Max: GH₵${state.priceMax}`, () => {
      state.priceMax = null;
      const inp = document.getElementById('priceMax');
      if (inp) inp.value = '';
      state.currentPage = 1;
      applyFiltersAndRender();
      updateActiveFilterTags();
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   APPLY FILTERS, SORT & RENDER
══════════════════════════════════════════════════════════════ */
function applyFiltersAndRender() {
  let products = [...state.allProducts];

  // 1. Category filter
  if (state.activeCategory !== 'all') {
    products = products.filter(p => p.category === state.activeCategory);
  }

  // 2. Search filter
  if (state.searchQuery) {
    const q = state.searchQuery;
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  }

  // 3. Price filter
  if (state.priceMin !== null) {
    products = products.filter(p => p.price >= state.priceMin);
  }
  if (state.priceMax !== null) {
    products = products.filter(p => p.price <= state.priceMax);
  }

  // 4. Sort
  switch (state.sortBy) {
    case 'price-asc':  products.sort((a, b) => a.price - b.price); break;
    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   products.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc':  products.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'featured':   products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    default: break; // keep original order
  }

  state.filtered = products;

  // Update results count
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    const total = products.length;
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end   = Math.min(state.currentPage * ITEMS_PER_PAGE, total);
    countEl.textContent = total === 0
      ? 'No products found'
      : total <= ITEMS_PER_PAGE
        ? `Showing all ${total} product${total !== 1 ? 's' : ''}`
        : `Showing ${start}–${end} of ${total} products`;
  }

  renderProducts();
  renderPagination();
}

/* ══════════════════════════════════════════════════════════════
   RENDER PRODUCT CARDS
══════════════════════════════════════════════════════════════ */
function renderProducts() {
  const grid  = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  if (!grid) return;

  const total = state.filtered.length;

  // Show/hide empty state
  if (total === 0) {
    grid.innerHTML  = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  // Paginate
  const start    = (state.currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = state.filtered.slice(start, start + ITEMS_PER_PAGE);

  // Apply list-view class based on current mode
  grid.classList.toggle('list-view', state.viewMode === 'list');

  grid.innerHTML = '';
  paginated.forEach((product, i) => {
    const card = createProductCard(product, i);
    grid.appendChild(card);
  });
}

/* ── Build a single product card element ────────────────────── */
function createProductCard(product, animIndex) {
  const catLabel = getCategoryLabel(product.category);
  const card     = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-id', product.id);
  card.style.animationDelay = `${animIndex * 40}ms`;

  // Badge HTML
  let badgeHtml = '';
  if (product.badge) {
    const cls = product.badge.toLowerCase().includes('popular') ? 'pc-badge-popular'
              : product.badge.toLowerCase().includes('new')     ? 'pc-badge-new'
              : 'pc-badge-featured';
    badgeHtml = `<div class="pc-badges"><span class="pc-badge ${cls}">${product.badge}</span></div>`;
  } else if (product.featured && !product.badge) {
    badgeHtml = `<div class="pc-badges"><span class="pc-badge pc-badge-featured">Featured</span></div>`;
  }

  card.innerHTML = `
    <div class="pc-img">
      ${badgeHtml}
      <div class="pc-img-ph">
        <div class="ph-icon" aria-hidden="true"><i class="fas fa-kit-medical"></i></div>
        <div class="ph-name">${product.name}</div>
      </div>
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.style.display='none'"
      />
      <button class="pc-quick-view" data-id="${product.id}" aria-label="Quick view ${product.name}">
        👁 Quick View
      </button>
    </div>
    <div class="pc-body">
      <div class="pc-cat">${catLabel}</div>
      <h3 class="pc-name">${product.name}</h3>
      <p class="pc-desc">${product.description || ''}</p>
      <div class="pc-footer">
        <div class="pc-price-block">
          <span class="pc-price">${formatPrice(product.price)}</span>
          <span class="pc-unit">per ${product.quantity}</span>
        </div>
        <div class="pc-actions">
          <a class="pc-btn-detail" href="product-details.html?id=${product.id}" aria-label="View details for ${product.name}">Details</a>
          <button class="pc-btn-cart" data-cart-id="${product.id}" aria-label="Add ${product.name} to cart" title="Add to cart">🛒</button>
        </div>
      </div>
    </div>`;

  // Quick view click
  card.querySelector('.pc-quick-view').addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    openQuickView(product.id);
  });

  // Add to cart click
  card.querySelector('.pc-btn-cart').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
    // Visual feedback on button
    const btn = e.currentTarget;
    btn.textContent = '✓';
    btn.style.background = 'var(--green)';
    btn.style.color = '#fff';
    setTimeout(() => { btn.textContent = '🛒'; btn.style.background = ''; btn.style.color = ''; }, 1500);
  });

  // Navigate to product detail on card click
  card.addEventListener('click', (e) => {
    if (e.target.closest('.pc-quick-view') || e.target.closest('.pc-btn-cart') || e.target.closest('.pc-btn-detail')) return;
    window.location.href = `product-details.html?id=${product.id}`;
  });
  card.style.cursor = 'pointer';

  return card;
}

/* ══════════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════════ */
function renderPagination() {
  const wrap = document.getElementById('paginationWrap');
  if (!wrap) return;

  const total     = state.filtered.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (totalPages <= 1) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = '';

  const createBtn = (label, page, disabled = false, isActive = false) => {
    const btn = document.createElement('button');
    btn.className   = 'page-btn' + (isActive ? ' active' : '');
    btn.textContent = label;
    btn.disabled    = disabled;
    btn.addEventListener('click', () => {
      state.currentPage = page;
      applyFiltersAndRender();
      document.querySelector('.catalog-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return btn;
  };

  // Prev
  wrap.appendChild(createBtn('← Prev', state.currentPage - 1, state.currentPage === 1));

  // Page numbers (show ±2 of current, always show 1 and last)
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - state.currentPage) <= 2) {
      wrap.appendChild(createBtn(i, i, false, i === state.currentPage));
    } else if (Math.abs(i - state.currentPage) === 3) {
      const dot = document.createElement('span');
      dot.className   = 'page-btn';
      dot.textContent = '…';
      dot.style.pointerEvents = 'none';
      wrap.appendChild(dot);
    }
  }

  // Next
  wrap.appendChild(createBtn('Next →', state.currentPage + 1, state.currentPage === totalPages));
}

/* ══════════════════════════════════════════════════════════════
   QUICK VIEW MODAL
══════════════════════════════════════════════════════════════ */
function openQuickView(productId) {
  const product = state.allProducts.find(p => p.id === productId);
  if (!product) return;

  const modal  = document.getElementById('quickViewModal');
  const inner  = document.getElementById('modalInner');
  if (!modal || !inner) return;

  const catLabel = getCategoryLabel(product.category);

  inner.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">
        <img
          src="${product.image}"
          alt="${product.name}"
          onerror="this.style.display='none'"
        />
      </div>
      <div class="modal-info">
        <div class="modal-cat">${catLabel}</div>
        <h2 class="modal-name" id="modalTitle">${product.name}</h2>
        <div class="modal-price">${formatPrice(product.price)}</div>
        <div class="modal-unit">per ${product.quantity}</div>
        <p class="modal-desc">${product.description || ''}</p>
        ${product.specs && product.specs.length ? `
          <div class="modal-specs">
            <h4>Specifications</h4>
            <ul>${product.specs.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>` : ''}
        <div class="modal-actions">
          <a class="btn btn-primary" href="product-details.html?id=${product.id}">
            View Full Details
          </a>
          <button class="btn btn-outline" id="modalAddCart" data-id="${product.id}">
            🛒 Add to Cart
          </button>
        </div>
        <div style="margin-top:14px;">
          <a
            href="https://wa.me/233541406489?text=Hello%2C%20I%20am%20interested%20in%20ordering%3A%20${encodeURIComponent(product.name)}%20at%20${encodeURIComponent(formatPrice(product.price))}"
            target="_blank" rel="noopener noreferrer"
            class="btn btn-wa" style="width:100%;justify-content:center;margin-top:6px;"
          >
            💬 Order via WhatsApp
          </a>
        </div>
      </div>
    </div>`;

  // Add to cart from modal
  inner.querySelector('#modalAddCart')?.addEventListener('click', () => {
    addToCart(product.id);
  });

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('quickViewModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

/** Format a number as GH₵ price */
function formatPrice(num) {
  if (typeof num !== 'number') return 'GH₵ —';
  return 'GH₵ ' + num.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Get readable category label from category id */
function getCategoryLabel(catId) {
  const match = NTLF_CATEGORIES.find(c => c.id === catId);
  return match ? match.label : (catId || '').replace(/-/g, ' ');
}

/** Footer year */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════ */
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className   = `toast show${type ? ' ' + type : ''}`;
  setTimeout(() => { toast.className = 'toast'; }, 3400);
}
window.showToast = showToast;