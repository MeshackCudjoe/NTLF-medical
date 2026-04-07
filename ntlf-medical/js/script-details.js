/**
 * ============================================================
 *  NTLF MEDICAL – Product Details Page  (script-details.js)
 *
 *  Reads ?id= from URL → finds product in NTLF_PRODUCTS →
 *  renders full details: name, price, description, specs,
 *  image gallery with zoom, tabs, related products, add-to-cart.
 *
 *  Depends on:  products-data.js  (must load first in HTML)
 *  Cart key:    ntlf-cart
 *  Theme key:   ntlf-theme
 * ============================================================
 */

"use strict";

/* ════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
════════════════════════════════════════════════════════ */
function formatPrice(num) {
  if (typeof num !== "number" || isNaN(num)) return "GH₵ —";
  return (
    "GH₵ " +
    num.toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/* Cart uses same key as products page: ntlf-cart */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("ntlf-cart") || "[]");
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem("ntlf-cart", JSON.stringify(cart));
}
function refreshCartBadge() {
  const total = getCart().reduce((s, i) => s + (i.qty || 1), 0);
  document
    .querySelectorAll("#cartCount, .cart-badge, .cart-count")
    .forEach((el) => {
      el.textContent = total;
    });
}

function getCatLabel(catId) {
  /* NTLF_CATEGORIES is declared in products-data.js */
  if (typeof NTLF_CATEGORIES !== "undefined") {
    const match = NTLF_CATEGORIES.find((c) => c.id === catId);
    if (match) return match.label;
  }
  return (catId || "").replace(/-/g, " ");
}

function getAllProducts() {
  const base = typeof NTLF_PRODUCTS !== "undefined" ? NTLF_PRODUCTS : [];
  const custom = (() => {
    try {
      return JSON.parse(localStorage.getItem("ntlf-admin-products") || "[]");
    } catch {
      return [];
    }
  })();
  const overrides = (() => {
    try {
      return JSON.parse(localStorage.getItem("ntlf-product-overrides") || "{}");
    } catch {
      return {};
    }
  })();
  // Apply admin overrides (price/name/desc changes) to built-in products
  const baseWithOverrides = base.map(function (p) {
    return overrides[p.id] ? Object.assign({}, p, overrides[p.id]) : p;
  });
  return [...baseWithOverrides, ...custom];
}

function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast show" + (type !== "success" ? " " + type : "");
  clearTimeout(t._tmr);
  t._tmr = setTimeout(() => {
    t.className = "toast";
  }, 3200);
}

/* ════════════════════════════════════════════════════════
   THEME
════════════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem("ntlf-theme") || "light";
  document.body.dataset.theme = saved;
  updateThemeIcon(saved);
  document.getElementById("darkToggle")?.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("ntlf-theme", next);
    updateThemeIcon(next);
  });
}
function updateThemeIcon(theme) {
  /* sun/moon spans handle this via CSS — nothing to do */
}

/* ════════════════════════════════════════════════════════
   NAV / HAMBURGER / STICKY
════════════════════════════════════════════════════════ */
function initNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.getElementById("navbar");

  hamburger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => {
    if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
      navLinks?.classList.remove("open");
    }
  });
  window.addEventListener(
    "scroll",
    () => {
      navbar?.classList.toggle("scrolled", window.scrollY > 20);
    },
    { passive: true },
  );
}

/* ════════════════════════════════════════════════════════
   SCROLL TO TOP
════════════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("visible", window.scrollY > 400),
    { passive: true },
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* ════════════════════════════════════════════════════════
   LOADER
════════════════════════════════════════════════════════ */
function hideLoader() {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 700);
}

/* ════════════════════════════════════════════════════════
   IMAGE GALLERY
   Builds thumbnails from a product's image path.
   Since we only have one real image path, we generate 4
   placeholder views showing the same image (replace with
   real product photos by adding product-name-2.jpg etc.)
════════════════════════════════════════════════════════ */
function buildGallery(product) {
  const mainImg = document.getElementById("mainImage");
  const thumbsCont = document.getElementById("galleryThumbs");
  const zoomModal = document.getElementById("zoomModal");
  const zoomedImg = document.getElementById("zoomedImage");
  const mainWrap = document.getElementById("mainImageWrap");

  if (!mainImg || !thumbsCont) return;

  /* Set main image */
  mainImg.src = product.image || "";
  mainImg.alt = product.name;
  mainImg.onerror = function () {
    this.style.display = "none";
    const ph = document.createElement("div");
    ph.className = "gallery-placeholder";
    ph.innerHTML = '<i class="fas fa-box-open"></i><p>' + product.name + "</p>";
    this.parentElement.appendChild(ph);
  };

  /* Badge */
  const badge = document.getElementById("galleryBadge");
  if (badge) {
    badge.textContent = product.featured ? "⭐ Featured" : product.badge || "";
    badge.style.display = badge.textContent ? "block" : "none";
  }

  /* Build 4 thumbnails (same image — replace with multi-image paths if available) */
  const thumbUrls = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];
  thumbsCont.innerHTML = "";
  thumbUrls.forEach((src, i) => {
    const div = document.createElement("div");
    div.className = "gallery-thumb" + (i === 0 ? " active" : "");
    div.title = product.name + " — view " + (i + 1);
    div.innerHTML = `<img src="${src || ""}" alt="View ${i + 1}" onerror="this.style.opacity='0.3'" />`;
    div.addEventListener("click", () => {
      mainImg.src = src || "";
      mainImg.style.display = "";
      document
        .querySelectorAll(".gallery-thumb")
        .forEach((t) => t.classList.remove("active"));
      div.classList.add("active");
    });
    thumbsCont.appendChild(div);
  });

  /* Zoom on click */
  mainWrap?.addEventListener("click", () => {
    if (!product.image) return;
    if (zoomedImg) zoomedImg.src = mainImg.src;
    if (zoomModal) zoomModal.classList.add("active");
  });
  document.getElementById("zoomClose")?.addEventListener("click", () => {
    zoomModal?.classList.remove("active");
  });
  zoomModal?.addEventListener("click", (e) => {
    if (e.target === zoomModal) zoomModal.classList.remove("active");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") zoomModal?.classList.remove("active");
  });
}

/* ════════════════════════════════════════════════════════
   PRODUCT TABS
════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + tabId)?.classList.add("active");
    });
  });
}

/* ════════════════════════════════════════════════════════
   QUANTITY CONTROLS
════════════════════════════════════════════════════════ */
function initQtyControls() {
  const inp = document.getElementById("qtyInput");
  document.getElementById("qtyMinus")?.addEventListener("click", () => {
    const v = parseInt(inp?.value) || 1;
    if (inp && v > 1) inp.value = v - 1;
  });
  document.getElementById("qtyPlus")?.addEventListener("click", () => {
    const v = parseInt(inp?.value) || 1;
    if (inp && v < 999) inp.value = v + 1;
  });
  inp?.addEventListener("change", () => {
    const v = parseInt(inp.value);
    if (isNaN(v) || v < 1) inp.value = 1;
    if (v > 999) inp.value = 999;
  });
}

/* ════════════════════════════════════════════════════════
   ADD TO CART
════════════════════════════════════════════════════════ */
function initAddToCart(product) {
  document.getElementById("addToCartBtn")?.addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qtyInput")?.value) || 1;
    const cart = getCart();
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
        unit: product.quantity,
        image: product.image,
      });
    }
    saveCart(cart);
    refreshCartBadge();
    showToast("✓ " + product.name + " added to cart!", "success");

    /* Button feedback */
    const btn = document.getElementById("addToCartBtn");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Added!';
      btn.style.background = "#0d9e6e";
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
      }, 1800);
    }
  });
}

/* ════════════════════════════════════════════════════════
   RELATED PRODUCTS
════════════════════════════════════════════════════════ */
function renderRelated(product) {
  const grid = document.getElementById("relatedGrid");
  if (!grid) return;

  const all = getAllProducts();

  /* Get up to 4 from same category, excluding current */
  let related = all
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  /* If fewer than 4, fill with products from other categories */
  if (related.length < 4) {
    const fillers = all
      .filter((p) => p.id !== product.id && !related.find((r) => r.id === p.id))
      .slice(0, 4 - related.length);
    related = [...related, ...fillers];
  }

  grid.innerHTML = "";
  related.forEach((p) => {
    const card = document.createElement("article");
    card.className = "related-card";
    card.innerHTML = `
      <div class="related-card-img">
        <img src="${p.image || ""}" alt="${p.name}"
          onerror="this.parentElement.innerHTML='<span class=\\'ph-icon\\'>🏥</span>'" />
      </div>
      <div class="related-card-body">
        <div class="related-card-cat">${getCatLabel(p.category)}</div>
        <h4 class="related-card-name">${p.name}</h4>
        <div class="related-card-price">${formatPrice(p.price)}</div>
        <div class="related-card-unit">per ${p.quantity}</div>
        <a href="product-details.html?id=${p.id}" class="related-card-btn">View Details</a>
      </div>`;
    card.querySelector(".related-card-btn")?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "product-details.html?id=" + p.id;
    });
    grid.appendChild(card);
  });
}

/* ════════════════════════════════════════════════════════
   POPULATE SPECS TABLE (right-panel inline table)
════════════════════════════════════════════════════════ */
function buildSpecsTable(specs) {
  const tbody = document.getElementById("specsBody");
  const wrap = document.getElementById("productSpecs");
  if (!tbody) return;
  if (!specs || specs.length === 0) {
    if (wrap) wrap.style.display = "none";
    return;
  }
  tbody.innerHTML = "";
  specs.forEach((spec) => {
    const colonIdx = spec.indexOf(":");
    let label, value;
    if (colonIdx > -1) {
      label = spec.slice(0, colonIdx).trim();
      value = spec.slice(colonIdx + 1).trim();
    } else {
      label = spec;
      value = "—";
    }
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${label}</td><td>${value}</td>`;
    tbody.appendChild(tr);
  });
}

/* ════════════════════════════════════════════════════════
   MAIN: LOAD AND RENDER PRODUCT
════════════════════════════════════════════════════════ */
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  const all = getAllProducts();
  const product = all.find((p) => p.id === id);

  /* ── Not found ── */
  if (!id || !product) {
    document.getElementById("notFound").style.display = "block";
    document.getElementById("productContent").style.display = "none";
    document.getElementById("productTabs").style.display = "none";
    const rel = document.querySelector(".related-section");
    if (rel) rel.style.display = "none";
    return;
  }

  /* ── Page title & breadcrumb ── */
  document.title = product.name + " | NTLF Medical";
  const crumb = document.getElementById("breadcrumbProduct");
  if (crumb) crumb.textContent = product.name;

  /* ── Category tag ── */
  const catEl = document.getElementById("productCategory");
  if (catEl) catEl.textContent = getCatLabel(product.category);

  /* ── Product name ── */
  const nameEl = document.getElementById("productName");
  if (nameEl) nameEl.textContent = product.name;

  /* ── SKU ── */
  const skuEl = document.getElementById("productSKU");
  if (skuEl) skuEl.textContent = "NTLF-" + String(product.id).padStart(5, "0");

  /* ── Price ── */
  const priceEl = document.getElementById("productPrice");
  if (priceEl) priceEl.textContent = formatPrice(product.price);

  /* ── Unit ── */
  const unitEl = document.getElementById("productUnit");
  if (unitEl) unitEl.textContent = "per " + product.quantity;

  /* ── Short description (right panel) ── */
  const descEl = document.getElementById("productDescription");
  if (descEl) descEl.textContent = product.description || "";

  /* ── Specs table (right panel) ── */
  buildSpecsTable(product.specs);

  /* ── Tab: Full Description ── */
  const tabDesc = document.getElementById("tabFullDesc");
  if (tabDesc) {
    tabDesc.textContent =
      (product.description || "") +
      " This product is sourced from certified manufacturers and meets international medical quality standards. " +
      "Suitable for use in hospitals, clinics, laboratories, pharmacies and healthcare facilities across Ghana.";
  }

  /* ── Tab: Specifications list ── */
  const specsList = document.getElementById("tabSpecsList");
  if (specsList) {
    if (product.specs && product.specs.length > 0) {
      specsList.innerHTML = product.specs
        .map((s) => `<li><span class="spec-check">✓</span>${s}</li>`)
        .join("");
    } else {
      specsList.innerHTML =
        "<li>No detailed specifications available. Contact us for more information.</li>";
    }
  }

  /* ── WhatsApp order button ── */
  const waMsg = encodeURIComponent(
    "Hello NTLF Medical, I am interested in ordering: " +
      product.name +
      " (" +
      formatPrice(product.price) +
      " per " +
      product.quantity +
      "). " +
      "Please provide more details.",
  );
  const waBtn = document.getElementById("whatsappBtn");
  if (waBtn) waBtn.href = "https://wa.me/233541406489?text=" + waMsg;

  /* ── Gallery ── */
  buildGallery(product);

  /* ── Add to cart ── */
  initAddToCart(product);

  /* ── Related products ── */
  renderRelated(product);
}

/* ════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  hideLoader();
  initTheme();
  initNav();
  initScrollTop();
  initTabs();
  initQtyControls();
  refreshCartBadge();
  loadProduct();

  /* Footer year */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
