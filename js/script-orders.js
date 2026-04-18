/**
 * ============================================================
 *  NTLF MEDICAL – Orders / Cart Page  (script-orders.js)
 *
 *  When an order is placed this script does THREE things:
 *
 *  1. SAVES the order to localStorage (ntlf-orders)
 *     → The admin dashboard reads this same key, so the order
 *       appears instantly in the Admin → Overview and All Orders.
 *
 *  2. FIRES a WhatsApp notification to NTLF Medical's business
 *     number (233541406489) in a new tab. The message contains:
 *       – Order ID, customer name, phone, hospital, address
 *       – Full itemised list with quantities and line totals
 *       – Grand total
 *       – Order notes (if any)
 *     WhatsApp Web / the WhatsApp app opens pre-filled — the
 *     business owner just taps Send.
 *
 *  3. SHOWS the customer a confirmation modal with a
 *     "Send via WhatsApp" button so they can also confirm
 *     directly to the business if they prefer.
 *
 *  Cart key:   ntlf-cart   (matches script-products.js)
 *  Orders key: ntlf-orders (matches script-admin.js)
 *  Theme key:  ntlf-theme
 * ============================================================
 */

"use strict";

/* ── Config ─────────────────────────────────────────────────── */
var CART_KEY = "ntlf-cart";
var ORDERS_KEY = "ntlf-orders";
var THEME_KEY = "ntlf-theme";
/* NTLF Medical's WhatsApp business number (international, no +) */
var BUSINESS_WA = "233541406489";

/* ════════════════════════════════════════════════════════
   SINGLE ENTRY POINT
════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initNav();
  initScrollTop();
  initTabs();
  initProceedCheckout();
  initBackToCart();
  initCheckoutForm();
  initConfirmModal();
  renderCart();
  renderHistory();
  refreshAllBadges();
  initFooterYear();
});

/* ════════════════════════════════════════════════════════
   THEME
════════════════════════════════════════════════════════ */
function initTheme() {
  var saved = localStorage.getItem(THEME_KEY) || "light";
  document.body.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", function () {
      var next =
        document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      updateThemeIcon(next);
    });
}
function updateThemeIcon(theme) {
  var icon = document.querySelector("#themeToggle i");
  if (icon) icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

/* ════════════════════════════════════════════════════════
   NAVIGATION + HAMBURGER
════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════
   SCROLL TO TOP
════════════════════════════════════════════════════════ */
function initScrollTop() {
  var btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    function () {
      btn.classList.toggle("show", window.scrollY > 500);
    },
    { passive: true },
  );
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ════════════════════════════════════════════════════════
   TAB SWITCHER
════════════════════════════════════════════════════════ */
function initTabs() {
  document
    .querySelectorAll(".orders-tab-btn[data-tab]")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        openTab(btn.dataset.tab);
      });
    });
}

function openTab(tabId) {
  document.querySelectorAll(".orders-tab-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.tab === tabId);
  });
  document.querySelectorAll(".orders-tab-panel").forEach(function (p) {
    p.classList.toggle("active", p.id === "panel-" + tabId);
  });
}

/* ════════════════════════════════════════════════════════
   CART HELPERS
════════════════════════════════════════════════════════ */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function cartTotal(cart) {
  return cart.reduce(function (s, i) {
    return s + (i.price || 0) * (i.qty || 1);
  }, 0);
}
function cartItemCount(cart) {
  return cart.reduce(function (s, i) {
    return s + (i.qty || 1);
  }, 0);
}
function formatPrice(n) {
  return (
    "GH\u20B5 " +
    Number(n || 0).toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function refreshAllBadges() {
  var cart = getCart();
  var count = cartItemCount(cart);
  document.querySelectorAll("#cartCount, .cart-count").forEach(function (el) {
    el.textContent = count;
  });
  var cartBadge = document.getElementById("cartTabBadge");
  if (cartBadge) cartBadge.textContent = count;
  var histBadge = document.getElementById("historyTabBadge");
  if (histBadge) histBadge.textContent = getOrders().length;
}

/* ════════════════════════════════════════════════════════
   RENDER CART TAB
════════════════════════════════════════════════════════ */
function renderCart() {
  var cart = getCart();
  var itemsEl = document.getElementById("cartItems");
  var emptyEl = document.getElementById("emptyCart");
  var layoutEl = document.querySelector(".cart-layout");
  if (!itemsEl) return;

  if (!cart.length) {
    if (layoutEl) layoutEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    updateSummaryPanel(cart);
    refreshAllBadges();
    return;
  }

  if (layoutEl) layoutEl.style.display = "";
  if (emptyEl) emptyEl.style.display = "none";

  itemsEl.innerHTML = "";
  cart.forEach(function (item) {
    itemsEl.appendChild(buildCartItemEl(item));
  });

  updateSummaryPanel(cart);
  renderCheckoutSummary(cart);
  refreshAllBadges();
}

function buildCartItemEl(item) {
  var el = document.createElement("div");
  el.className = "cart-item";
  el.dataset.id = item.id;
  var lineTotal = (item.price || 0) * (item.qty || 1);

  el.innerHTML =
    '<div class="cart-item__img">' +
    '<img src="' +
    (item.image || "") +
    '" alt="' +
    item.name +
    '" ' +
    "onerror=\"this.parentElement.innerHTML='<span style=font-size:1.8rem>&#x1F3E5;</span>'\" />" +
    "</div>" +
    '<div class="cart-item__info">' +
    '<div class="cart-item__name">' +
    item.name +
    "</div>" +
    '<div class="cart-item__meta">Unit: ' +
    formatPrice(item.price || 0) +
    " / " +
    (item.unit || "1pc") +
    "</div>" +
    '<div class="cart-item__price">' +
    formatPrice(lineTotal) +
    "</div>" +
    "</div>" +
    '<div class="cart-item__controls">' +
    '<button class="qty-btn qty-minus" aria-label="Decrease">&#8722;</button>' +
    '<span class="qty-display">' +
    (item.qty || 1) +
    "</span>" +
    '<button class="qty-btn qty-plus" aria-label="Increase">&#43;</button>' +
    "</div>" +
    '<button class="cart-item__remove" aria-label="Remove item"><i class="fas fa-trash-alt"></i></button>';

  el.querySelector(".qty-minus").addEventListener("click", function () {
    changeQty(item.id, -1);
  });
  el.querySelector(".qty-plus").addEventListener("click", function () {
    changeQty(item.id, +1);
  });
  el.querySelector(".cart-item__remove").addEventListener("click", function () {
    removeItem(item.id);
  });
  return el;
}

function changeQty(id, delta) {
  var cart = getCart();
  var item = cart.find(function (c) {
    return c.id === id;
  });
  if (!item) return;
  var nq = (item.qty || 1) + delta;
  if (nq < 1) {
    removeItem(id);
    return;
  }
  item.qty = nq;
  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  saveCart(
    getCart().filter(function (c) {
      return c.id !== id;
    }),
  );
  renderCart();
  showToast("Item removed from cart.");
}

/* ════════════════════════════════════════════════════════
   SUMMARY PANELS
════════════════════════════════════════════════════════ */
function updateSummaryPanel(cart) {
  var total = cartTotal(cart);
  var count = cartItemCount(cart);
  var sub = document.getElementById("summarySubtotal");
  var cnt = document.getElementById("summaryCount");
  if (sub) sub.textContent = formatPrice(total);
  if (cnt) cnt.textContent = count + " item" + (count !== 1 ? "s" : "");
}

function renderCheckoutSummary(cart) {
  var el = document.getElementById("checkoutItems");
  var totEl = document.getElementById("checkoutTotal");
  if (!el) return;
  if (!cart.length) {
    el.innerHTML =
      '<p style="color:var(--text-muted);font-size:.88rem">Your cart is empty.</p>';
    if (totEl) totEl.textContent = formatPrice(0);
    return;
  }
  el.innerHTML = cart
    .map(function (item) {
      return (
        '<div class="checkout-item">' +
        "<span>" +
        item.name +
        ' <span style="color:var(--text-muted);font-size:.8rem">\xd7' +
        (item.qty || 1) +
        "</span></span>" +
        "<span>" +
        formatPrice((item.price || 0) * (item.qty || 1)) +
        "</span>" +
        "</div>"
      );
    })
    .join("");
  if (totEl) totEl.textContent = formatPrice(cartTotal(cart));
}

/* ════════════════════════════════════════════════════════
   PROCEED TO CHECKOUT
════════════════════════════════════════════════════════ */
function initProceedCheckout() {
  document
    .getElementById("proceedCheckout")
    ?.addEventListener("click", function () {
      var cart = getCart();
      if (!cart.length) {
        showToast("Your cart is empty. Add some products first.", "error");
        return;
      }
      renderCheckoutSummary(cart);
      openTab("checkout");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ════════════════════════════════════════════════════════
   BACK TO CART
════════════════════════════════════════════════════════ */
function initBackToCart() {
  document.getElementById("backToCart")?.addEventListener("click", function () {
    openTab("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ════════════════════════════════════════════════════════
   CHECKOUT FORM
════════════════════════════════════════════════════════ */
function initCheckoutForm() {
  var form = document.getElementById("checkoutForm");
  if (!form) return;

  ["chkName", "chkPhone", "chkAddress"].forEach(function (id) {
    document.getElementById(id)?.addEventListener("input", function () {
      clearFieldError(id);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateCheckoutForm()) return;
    placeOrder();
  });
}

function validateCheckoutForm() {
  var valid = true;

  function check(fieldId, errId, label) {
    var val = (document.getElementById(fieldId)?.value || "").trim();
    var err = document.getElementById(errId);
    if (!val) {
      if (err) err.textContent = label + " is required.";
      if (valid) document.getElementById(fieldId)?.focus();
      valid = false;
    } else {
      if (err) err.textContent = "";
    }
  }

  check("chkName", "e-name", "Full name");
  check("chkPhone", "e-phone", "Phone number");
  check("chkAddress", "e-address", "Delivery address");

  var phone = (document.getElementById("chkPhone")?.value || "").trim();
  var phoneErr = document.getElementById("e-phone");
  if (phone && !/^[\d\s\+\-]{7,15}$/.test(phone)) {
    if (phoneErr) phoneErr.textContent = "Enter a valid phone number.";
    valid = false;
  }
  return valid;
}

function clearFieldError(fieldId) {
  var map = { chkName: "e-name", chkPhone: "e-phone", chkAddress: "e-address" };
  var err = document.getElementById(map[fieldId]);
  if (err) err.textContent = "";
}

/* ════════════════════════════════════════════════════════
   ★  PLACE ORDER
   1. Save to localStorage (admin reads this)
   2. Fire WhatsApp notification to business number
   3. Show confirmation modal with WhatsApp button for customer
════════════════════════════════════════════════════════ */
function placeOrder() {
  var cart = getCart();
  if (!cart.length) {
    showToast("Your cart is empty.", "error");
    return;
  }

  /* ── Build order object ── */
  var orderId = "NTLF-" + Date.now().toString().slice(-8).toUpperCase();
  var order = {
    id: orderId,
    date: new Date().toISOString(),
    name: (document.getElementById("chkName")?.value || "").trim(),
    hospital: (document.getElementById("chkHospital")?.value || "").trim(),
    phone: (document.getElementById("chkPhone")?.value || "").trim(),
    email: (document.getElementById("chkEmail")?.value || "").trim(),
    address: (document.getElementById("chkAddress")?.value || "").trim(),
    notes: (document.getElementById("chkNotes")?.value || "").trim(),
    items: cart.map(function (i) {
      return {
        id: i.id,
        name: i.name,
        price: i.price || 0,
        qty: i.qty || 1,
        unit: i.unit || "",
      };
    }),
    total: cartTotal(cart),
    status: "Pending",
  };

  /* ── 1. Save order to localStorage ── */
  var orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  /* ── 2. Send WhatsApp notification to business ── */
  sendWhatsAppNotification(order);

  /* ── 3. Clear cart & form ── */
  saveCart([]);
  document.getElementById("checkoutForm")?.reset();
  renderCart();

  /* ── 4. Show confirmation modal ── */
  showConfirmModal(order);
}

/* ════════════════════════════════════════════════════════
   ★  WHATSAPP NOTIFICATION  (business number)

   Builds a fully-formatted WhatsApp message and opens it
   in a new tab using the wa.me deep link.
   The business owner just taps "Send" to confirm receipt.
════════════════════════════════════════════════════════ */
function buildWhatsAppMessage(order) {
  /* This message is sent FROM the customer's WhatsApp TO the admin number.
     It contains everything the admin needs to process the order. */
  var lines = [];
  var date = new Date(order.date).toLocaleString("en-GH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  lines.push("🔔 *NEW ORDER — NTLF Medical*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("📋 *Order ID:* " + order.id);
  lines.push("📅 *Date:* " + date);
  lines.push("");
  lines.push("👤 *CUSTOMER INFORMATION*");
  lines.push("• *Name:* " + order.name);
  if (order.hospital) {
    lines.push("• *Organisation:* " + order.hospital);
  }
  lines.push("• *Phone:* " + order.phone);
  if (order.email) {
    lines.push("• *Email:* " + order.email);
  }
  lines.push("• *Address:* " + order.address);
  if (order.notes) {
    lines.push("• *Notes:* " + order.notes);
  }
  lines.push("");
  lines.push("🛒 *ORDER ITEMS (" + order.items.length + ")*");
  lines.push("──────────────────────────────");

  order.items.forEach(function (item, idx) {
    var lineTotal = (item.price || 0) * (item.qty || 1);
    lines.push(
      idx +
        1 +
        ". *" +
        item.name +
        "*" +
        "\n   Qty: " +
        (item.qty || 1) +
        " × GH₵" +
        Number(item.price || 0).toFixed(2) +
        " = GH₵" +
        lineTotal.toFixed(2),
    );
  });

  lines.push("──────────────────────────────");
  lines.push(
    "💰 *ORDER TOTAL: GH₵" + Number(order.total || 0).toFixed(2) + "*",
  );
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("_Sent from NTLF Medical website_");
  lines.push("_Please confirm and contact the customer to arrange delivery._");

  return lines.join("\n");
}

function sendWhatsAppNotification(order) {
  /* Build the pre-filled WhatsApp URL.
     This opens WhatsApp on the CUSTOMER'S device, addressed to the ADMIN.
     The customer taps Send — the admin receives it instantly.
     We do NOT use window.open() here because browsers block auto-popups.
     Instead we give the customer a prominent, impossible-to-miss button
     in the confirmation modal. */
  var message = buildWhatsAppMessage(order);
  var encoded = encodeURIComponent(message);
  order._waUrl = "https://wa.me/" + BUSINESS_WA + "?text=" + encoded;
}

/* ════════════════════════════════════════════════════════
   CONFIRMATION MODAL
════════════════════════════════════════════════════════ */
function showConfirmModal(order) {
  var modal = document.getElementById("confirmModal");
  var msgEl = document.getElementById("confirmMessage");
  var detEl = document.getElementById("confirmDetails");
  var actEl = document.getElementById("confirmActions");
  if (!modal) return;

  /* ── Message line ── */
  if (msgEl) {
    msgEl.textContent =
      "Order " +
      order.id +
      " saved! " +
      "Tap the WhatsApp button below to send your order details to NTLF Medical.";
  }

  /* ── Order summary ── */
  if (detEl) {
    var itemRows = order.items
      .map(function (i) {
        return (
          '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:.84rem;">' +
          "<span>" +
          i.name +
          ' <span style="color:var(--text-muted)">\xd7' +
          (i.qty || 1) +
          "</span></span>" +
          '<span style="font-weight:700;color:var(--blue)">' +
          formatPrice((i.price || 0) * (i.qty || 1)) +
          "</span>" +
          "</div>"
        );
      })
      .join("");

    detEl.innerHTML =
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 16px;margin-bottom:12px;font-size:.85rem;">' +
      '<div><span style="color:var(--text-muted)">Order ID</span><br><strong>' +
      order.id +
      "</strong></div>" +
      '<div><span style="color:var(--text-muted)">Date</span><br><strong>' +
      new Date(order.date).toLocaleDateString("en-GH") +
      "</strong></div>" +
      '<div><span style="color:var(--text-muted)">Name</span><br><strong>' +
      order.name +
      "</strong></div>" +
      '<div><span style="color:var(--text-muted)">Phone</span><br><strong>' +
      order.phone +
      "</strong></div>" +
      (order.hospital
        ? '<div style="grid-column:1/-1"><span style="color:var(--text-muted)">Organisation</span><br><strong>' +
          order.hospital +
          "</strong></div>"
        : "") +
      '<div style="grid-column:1/-1"><span style="color:var(--text-muted)">Address</span><br><strong>' +
      order.address +
      "</strong></div>" +
      "</div>" +
      '<div style="margin-bottom:8px;">' +
      itemRows +
      "</div>" +
      '<div style="display:flex;justify-content:space-between;padding-top:10px;font-family:var(--font-display,sans-serif);font-weight:800;font-size:1rem;">' +
      '<span>Total</span><span style="color:var(--green)">' +
      formatPrice(order.total) +
      "</span>" +
      "</div>";
  }

  /* ── Action buttons — WhatsApp is PRIMARY ── */
  if (actEl) {
    actEl.innerHTML =
      /* ★ PRIMARY: WhatsApp send button — large, green, prominent */
      '<a href="' +
      order._waUrl +
      '" target="_blank" rel="noopener noreferrer" ' +
      'id="waSendBtn" class="btn btn--wa-primary">' +
      '<i class="fab fa-whatsapp"></i> Send Order via WhatsApp' +
      "</a>" +
      /* Secondary: Done → history tab */
      '<button id="closeConfirm" class="btn btn--outline">' +
      '<i class="fas fa-check"></i> Done' +
      "</button>" +
      /* Tertiary: continue shopping */
      '<a href="products.html" class="btn btn--ghost">' +
      "Continue Shopping" +
      "</a>";

    /* Mark WhatsApp as sent once clicked */
    document
      .getElementById("waSendBtn")
      ?.addEventListener("click", function () {
        setTimeout(function () {
          var btn = document.getElementById("waSendBtn");
          if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> WhatsApp Opened';
            btn.style.background = "#1da851";
            btn.style.pointerEvents = "none";
          }
        }, 800);
      });

    /* Wire Done button */
    document
      .getElementById("closeConfirm")
      ?.addEventListener("click", function () {
        modal.style.display = "none";
        renderHistory();
        openTab("history");
        refreshAllBadges();
      });
  }

  modal.style.display = "flex";
  showToast(
    "\u2713 Order " + order.id + " placed! Send it via WhatsApp.",
    "success",
  );
}

function initConfirmModal() {
  /* Clicking the overlay backdrop closes it */
  document
    .getElementById("confirmModal")
    ?.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        e.currentTarget.style.display = "none";
        renderHistory();
        openTab("history");
        refreshAllBadges();
      }
    });
  /* Static Done button (before first order) */
  document
    .getElementById("closeConfirm")
    ?.addEventListener("click", function () {
      var modal = document.getElementById("confirmModal");
      if (modal) modal.style.display = "none";
      renderHistory();
      openTab("history");
      refreshAllBadges();
    });
}

/* ════════════════════════════════════════════════════════
   ORDER HISTORY TAB
════════════════════════════════════════════════════════ */
function renderHistory() {
  var listEl = document.getElementById("orderHistoryList");
  var emptyEl = document.getElementById("emptyHistory");
  if (!listEl) return;

  var orders = getOrders();

  var badge = document.getElementById("historyTabBadge");
  if (badge) badge.textContent = orders.length;

  if (!orders.length) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }
  if (emptyEl) emptyEl.style.display = "none";

  listEl.innerHTML = orders
    .slice()
    .reverse()
    .map(function (order) {
      var items = Array.isArray(order.items) ? order.items : [];
      var preview = items
        .slice(0, 3)
        .map(function (i) {
          return i.name + " \xd7" + (i.qty || 1);
        })
        .join(", ");
      if (items.length > 3) preview += " + " + (items.length - 3) + " more";

      /* WhatsApp re-send button for this order */
      var reMsg = buildWhatsAppMessage(order);
      var reUrl =
        "https://wa.me/" + BUSINESS_WA + "?text=" + encodeURIComponent(reMsg);

      return (
        '<div class="order-history-card">' +
        '<div class="order-history-header">' +
        '<span class="order-history-id">' +
        order.id +
        "</span>" +
        '<span class="order-history-date">' +
        new Date(order.date).toLocaleString("en-GH") +
        "</span>" +
        '<span class="order-status-badge">Pending</span>' +
        '<span class="order-history-total">' +
        formatPrice(order.total || 0) +
        "</span>" +
        "</div>" +
        '<div class="order-history-customer">' +
        "<strong>" +
        (order.name || "\u2014") +
        "</strong>" +
        (order.hospital ? " &bull; " + order.hospital : "") +
        " &bull; " +
        (order.phone || "\u2014") +
        (order.address
          ? '<br><i class="fas fa-map-marker-alt" style="color:var(--blue);margin-right:6px"></i>' +
            order.address
          : "") +
        (order.notes
          ? '<br><i class="fas fa-sticky-note" style="color:var(--amber);margin-right:6px"></i><em>' +
            order.notes +
            "</em>"
          : "") +
        "</div>" +
        '<div class="order-history-items">' +
        "<strong>" +
        items.length +
        " item" +
        (items.length !== 1 ? "s" : "") +
        ":</strong> " +
        (preview || "No details") +
        "</div>" +
        /* WhatsApp resend button on each history card */
        '<div class="order-history-actions">' +
        '<a href="' +
        reUrl +
        '" target="_blank" rel="noopener noreferrer" class="btn-wa-resend">' +
        '<i class="fab fa-whatsapp"></i> Resend to WhatsApp' +
        "</a>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");
}

/* ════════════════════════════════════════════════════════
   TOAST
════════════════════════════════════════════════════════ */
function showToast(msg, type) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast show" + (type ? " " + type : "");
  clearTimeout(t._tmr);
  t._tmr = setTimeout(function () {
    t.className = "toast";
  }, 3400);
}
window.showToast = showToast;

/* ════════════════════════════════════════════════════════
   FOOTER YEAR
════════════════════════════════════════════════════════ */
function initFooterYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
