/**
 * ============================================================
 *  NTLF MEDICAL – Admin Dashboard  (script-admin.js)
 *
 *  When a customer places an order the admin receives:
 *    1. An OS-level browser popup notification (even if the
 *       admin tab is minimised or behind other windows).
 *       Clicking it focuses the tab and opens All Orders.
 *    2. A green flash on the "All Orders" sidebar button.
 *    3. An in-page toast message.
 *    4. The Overview and All Orders panels refresh instantly.
 *
 *  Data keys (must match script-orders.js):
 *    ntlf-admin-products  -- localStorage (custom products)
 *    ntlf-orders          -- localStorage (customer orders)
 *
 *  Demo password: admin123
 * ============================================================
 */

"use strict";

var ADMIN_PW = "zhiggy";
var SESSION_KEY = "ntlf-admin-session";
var CUSTOM_KEY = "ntlf-admin-products";
var ORDERS_KEY = "ntlf-orders";
var OVERRIDE_KEY = "ntlf-product-overrides"; /* edits to built-in products */

var CAT_LABELS = {
  gloves: "Gloves & PPE",
  syringes: "Syringes & Cannula",
  "lab-supplies": "Lab Supplies",
  "wound-care": "Wound Care",
  respiratory: "Respiratory",
  diagnostics: "Diagnostics",
  consumables: "Consumables",
  furniture: "Hospital Furniture",
  equipment: "Medical Equipment",
};

/* ── Single entry point ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  wireLoginForm();
  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    showDashboard();
  }
});

/* ── Auth ───────────────────────────────────────────────── */
function wireLoginForm() {
  document.getElementById("togglePass")?.addEventListener("click", function () {
    var inp = document.getElementById("adminPass");
    var btn = document.getElementById("togglePass");
    if (!inp) return;
    if (inp.type === "password") {
      inp.type = "text";
      btn.textContent = "🙈";
    } else {
      inp.type = "password";
      btn.textContent = "👁";
    }
  });

  document
    .getElementById("loginForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("adminName")?.value || "").trim();
      var role = (
        document.getElementById("adminRole")?.value || "Admin"
      ).trim();
      var pw = (document.getElementById("adminPass")?.value || "").trim();
      var nameErr = document.getElementById("nameError");
      var pwErr = document.getElementById("loginError");

      /* Validate name */
      if (!name) {
        if (nameErr) nameErr.textContent = "Please enter your name.";
        document.getElementById("adminName")?.focus();
        return;
      }
      if (nameErr) nameErr.textContent = "";

      /* Validate password */
      if (pw === ADMIN_PW) {
        sessionStorage.setItem(SESSION_KEY, "1");
        sessionStorage.setItem("ntlf-admin-name", name);
        sessionStorage.setItem("ntlf-admin-role", role);
        if (pwErr) pwErr.textContent = "";
        showDashboard();
      } else {
        if (pwErr) pwErr.textContent = "Incorrect password. Please try again.";
        var inp = document.getElementById("adminPass");
        if (inp) {
          inp.value = "";
          inp.focus();
        }
      }
    });

  document.getElementById("logoutBtn")?.addEventListener("click", doLogout);
  document
    .getElementById("logoutBtnMobile")
    ?.addEventListener("click", doLogout);
}

function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
}

/* ── Show dashboard ─────────────────────────────────────── */
function showDashboard() {
  var ls = document.getElementById("loginScreen");
  var ad = document.getElementById("adminDash");
  if (ls) ls.style.display = "none";
  if (ad) ad.style.display = "";

  initClock();
  initTabs();
  initMobileSidebar();
  initAddProductForm();
  initManageSearch();
  initEditModal();
  initClearOrders();
  initRealTimeRefresh();

  /* Populate topbar identity from sessionStorage */
  var storedName = sessionStorage.getItem("ntlf-admin-name") || "Admin";
  var storedRole = sessionStorage.getItem("ntlf-admin-role") || "Staff";
  var nameEl = document.getElementById("topbarName");
  var roleEl = document.getElementById("topbarRole");
  var avatarEl = document.getElementById("adminAvatar");
  if (nameEl) nameEl.textContent = storedName;
  if (roleEl) roleEl.textContent = storedRole;
  if (avatarEl) avatarEl.textContent = storedName.charAt(0).toUpperCase();

  renderOverview();
  renderManageTable();
  renderAdminOrders();
}

/* ── Data helpers ───────────────────────────────────────── */
function getCustomProducts() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveCustomProducts(list) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}
function getAllProducts() {
  var base = typeof NTLF_PRODUCTS !== "undefined" ? NTLF_PRODUCTS : [];
  var overrides = getOverrides();
  /* Apply any admin edits (price, name, desc) to built-in products */
  var baseEdited = base.map(function (p) {
    return overrides[p.id] ? Object.assign({}, p, overrides[p.id]) : p;
  });
  return baseEdited.concat(getCustomProducts());
}
function getOverrides() {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveOverrides(obj) {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(obj));
}
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
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
function getCatLabel(id) {
  var cats = typeof NTLF_CATEGORIES !== "undefined" ? NTLF_CATEGORIES : [];
  var match = cats.find(function (c) {
    return c.id === id;
  });
  return match ? match.label : CAT_LABELS[id] || (id || "").replace(/-/g, " ");
}
function setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ── Live clock ─────────────────────────────────────────── */
function initClock() {
  var el = document.getElementById("adminTime");
  if (!el) return;
  function tick() {
    el.textContent = new Date().toLocaleString("en-GH", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  tick();
  setInterval(tick, 30000);
}

/* ── Tab navigation ─────────────────────────────────────── */
var TAB_TITLES = {
  overview: "Dashboard Overview",
  "add-product": "Add New Product",
  "manage-products": "Manage Products",
  "orders-tab": "All Customer Orders",
};

function initTabs() {
  document.querySelectorAll(".anav-btn[data-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.dataset.tab);
    });
  });
  document.querySelectorAll(".anav-btn-text[data-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.dataset.tab);
    });
  });
}

function switchTab(id) {
  document.querySelectorAll(".admin-tab").forEach(function (t) {
    t.classList.remove("active");
  });
  document.querySelectorAll(".anav-btn[data-tab]").forEach(function (b) {
    b.classList.remove("active");
  });
  var tab = document.getElementById("tab-" + id);
  var btn = document.querySelector('.anav-btn[data-tab="' + id + '"]');
  if (tab) tab.classList.add("active");
  if (btn) btn.classList.add("active");
  var titleEl = document.getElementById("tabTitle");
  if (titleEl) titleEl.textContent = TAB_TITLES[id] || id;
  document.getElementById("adminSidebar")?.classList.remove("open");
  if (id === "overview") renderOverview();
  if (id === "manage-products") renderManageTable();
  if (id === "orders-tab") renderAdminOrders();
}

/* ── Mobile sidebar ─────────────────────────────────────── */
function initMobileSidebar() {
  var sidebar = document.getElementById("adminSidebar");
  var openBtn = document.getElementById("sidebarOpenBtn");
  var closeBtn = document.getElementById("sidebarClose");
  var overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:190;display:none;";
  document.body.appendChild(overlay);
  function open() {
    sidebar?.classList.add("open");
    overlay.style.display = "block";
  }
  function close() {
    sidebar?.classList.remove("open");
    overlay.style.display = "none";
  }
  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", close);
}

/* ── Overview ───────────────────────────────────────────── */
function renderOverview() {
  var all = getAllProducts();
  var orders = getOrders();
  var custom = getCustomProducts();
  var revenue = orders.reduce(function (s, o) {
    return s + (o.total || 0);
  }, 0);
  setText("ovProducts", all.length);
  setText("ovOrders", orders.length);
  setText("ovRevenue", formatPrice(revenue));
  setText("ovCustom", custom.length);
  setText("ordersBadge", orders.length);
  renderRecentOrders(orders);
  renderCategoryBreakdown(all);
}

function renderRecentOrders(orders) {
  var el = document.getElementById("ovRecentOrders");
  if (!el) return;
  var recent = orders.slice(-5).reverse();
  if (!recent.length) {
    el.innerHTML = '<p class="empty-msg">No orders yet.</p>';
    return;
  }
  el.innerHTML =
    '<table class="mini-table">' +
    "<thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Date</th></tr></thead>" +
    "<tbody>" +
    recent
      .map(function (o) {
        return (
          "<tr>" +
          "<td><strong>" +
          (o.id || "-") +
          "</strong></td>" +
          "<td>" +
          (o.name || "-") +
          "</td>" +
          '<td style="color:var(--green);font-weight:700">' +
          formatPrice(o.total || 0) +
          "</td>" +
          "<td>" +
          new Date(o.date).toLocaleDateString("en-GH") +
          "</td>" +
          "</tr>"
        );
      })
      .join("") +
    "</tbody></table>";
}

function renderCategoryBreakdown(products) {
  var el = document.getElementById("ovCatBreakdown");
  if (!el) return;
  var counts = {};
  products.forEach(function (p) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  var sorted = Object.entries(counts).sort(function (a, b) {
    return b[1] - a[1];
  });
  var maxVal = sorted[0] ? sorted[0][1] : 1;
  el.innerHTML = sorted
    .map(function (entry) {
      var cat = entry[0],
        count = entry[1];
      var pct = Math.round((count / maxVal) * 100);
      return (
        '<div class="cat-stat-row">' +
        '<span class="cat-stat-label">' +
        getCatLabel(cat) +
        "</span>" +
        '<div class="cat-stat-bar-wrap"><div class="cat-stat-bar" style="width:' +
        pct +
        '%"></div></div>' +
        '<span class="cat-stat-count">' +
        count +
        "</span>" +
        "</div>"
      );
    })
    .join("");
}

/* ── Add product form ───────────────────────────────────── */
function initAddProductForm() {
  var form = document.getElementById("addProductForm");
  if (!form) return;
  ["pName", "pCategory", "pPrice", "pQuantity"].forEach(function (id) {
    document.getElementById(id)?.addEventListener("input", updatePreview);
  });
  document
    .getElementById("clearFormBtn")
    ?.addEventListener("click", function () {
      form.reset();
      hidePreview();
      clearFormErrors();
    });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateAddForm()) return;
    var name = document.getElementById("pName").value.trim();
    var category = document.getElementById("pCategory").value;
    var price = parseFloat(document.getElementById("pPrice").value);
    var quantity = document.getElementById("pQuantity").value.trim();
    var desc = document.getElementById("pDescription").value.trim();
    var specsRaw = document.getElementById("pSpecs").value || "";
    var specs = specsRaw
      .split("\n")
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    var imgPath =
      document.getElementById("pImage").value.trim() ||
      "assets/images/products/product-" + Date.now() + ".jpg";
    var badge = document.getElementById("pBadge").value.trim();
    var featured = document.getElementById("pFeatured").checked;
    var customs = getCustomProducts();
    customs.push({
      id: Date.now(),
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      description: desc,
      specs: specs,
      image: imgPath,
      badge: badge || undefined,
      featured: featured,
      custom: true,
    });
    saveCustomProducts(customs);
    showToast('"' + name + '" added to catalog!', "success");
    form.reset();
    hidePreview();
    clearFormErrors();
    renderOverview();
    renderManageTable();
  });
}

function validateAddForm() {
  var valid = true;
  [
    { id: "pName", err: "err-pName", msg: "Product name is required." },
    { id: "pCategory", err: "err-pCategory", msg: "Please select a category." },
    { id: "pPrice", err: "err-pPrice", msg: "Enter a valid price." },
    {
      id: "pQuantity",
      err: "err-pQuantity",
      msg: "Pack / unit size is required.",
    },
    {
      id: "pDescription",
      err: "err-pDescription",
      msg: "A description is required.",
    },
  ].forEach(function (r) {
    var el = document.getElementById(r.id);
    var err = document.getElementById(r.err);
    var val = el ? el.value.trim() : "";
    var bad = !val || (r.id === "pPrice" && isNaN(parseFloat(val)));
    if (err) err.textContent = bad ? r.msg : "";
    if (bad) {
      if (!valid && el) el.focus();
      valid = false;
    }
  });
  return valid;
}
function clearFormErrors() {
  document.querySelectorAll(".field-error").forEach(function (el) {
    el.textContent = "";
  });
}
function updatePreview() {
  var name = document.getElementById("pName")?.value.trim();
  var catId = document.getElementById("pCategory")?.value;
  var price = document.getElementById("pPrice")?.value;
  var qty = document.getElementById("pQuantity")?.value.trim();
  var prev = document.getElementById("productPreview");
  if (!name && !catId) {
    hidePreview();
    return;
  }
  if (prev) prev.style.display = "block";
  setText("prevName", name || "-");
  setText("prevCat", getCatLabel(catId) || "-");
  setText(
    "prevPrice",
    price ? formatPrice(parseFloat(price) || 0) : "GH\u20B5 -",
  );
  setText("prevUnit", qty ? "per " + qty : "");
}
function hidePreview() {
  var p = document.getElementById("productPreview");
  if (p) p.style.display = "none";
}

/* ── Manage products table ──────────────────────────────── */
var manageQ = "",
  manageCat = "";

function initManageSearch() {
  document
    .getElementById("manageSearch")
    ?.addEventListener("input", function (e) {
      manageQ = e.target.value.toLowerCase();
      renderManageTable();
    });
  document
    .getElementById("manageCatFilter")
    ?.addEventListener("change", function (e) {
      manageCat = e.target.value;
      renderManageTable();
    });
}

function renderManageTable() {
  var tbody = document.getElementById("manageTableBody");
  var meta = document.getElementById("manageMeta");
  if (!tbody) return;
  var list = getAllProducts();
  if (manageCat)
    list = list.filter(function (p) {
      return p.category === manageCat;
    });
  if (manageQ)
    list = list.filter(function (p) {
      return p.name.toLowerCase().includes(manageQ);
    });
  if (meta)
    meta.textContent =
      "Showing " + list.length + " product" + (list.length !== 1 ? "s" : "");
  if (!list.length) {
    tbody.innerHTML =
      '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted)">No products found.</td></tr>';
    return;
  }
  tbody.innerHTML = list
    .map(function (p, i) {
      return (
        "<tr>" +
        '<td style="color:var(--text-muted);font-size:.8rem">' +
        (i + 1) +
        "</td>" +
        '<td><div class="tbl-product"><div class="tbl-img"><i class=\"fas fa-box-medical\"></i></div>' +
        '<div><div class="tbl-name">' +
        p.name +
        "</div>" +
        '<div class="tbl-cat">' +
        getCatLabel(p.category) +
        "</div></div></div></td>" +
        "<td>" +
        getCatLabel(p.category) +
        "</td>" +
        '<td style="font-weight:700;color:var(--green)">' +
        formatPrice(p.price) +
        "</td>" +
        "<td>" +
        (p.quantity || "-") +
        "</td>" +
        "<td>" +
        (p.custom
          ? '<span class="badge-source badge-custom">Custom</span>'
          : '<span class="badge-source badge-default">Built-in</span>') +
        "</td>" +
        '<td><div class="tbl-actions">' +
        '<button class="btn-tbl btn-tbl-edit" onclick="openEditModal(' +
        p.id +
        ')">Edit</button>' +
        (p.custom
          ? '<button class="btn-tbl btn-tbl-del" onclick="deleteProduct(' +
            p.id +
            ')">Delete</button>'
          : '<span class="builtin-tag">Protected</span>') +
        "</div></td></tr>"
      );
    })
    .join("");
}

window.deleteProduct = function (id) {
  if (!confirm("Delete this custom product from the catalog?")) return;
  saveCustomProducts(
    getCustomProducts().filter(function (p) {
      return p.id !== id;
    }),
  );
  renderManageTable();
  renderOverview();
  showToast("Product removed.", "error");
};

/* ── Edit modal ─────────────────────────────────────────── */
function initEditModal() {
  document
    .getElementById("editModalClose")
    ?.addEventListener("click", closeEditModal);
  document
    .getElementById("cancelEdit")
    ?.addEventListener("click", closeEditModal);
  document.getElementById("editModal")?.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) closeEditModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeEditModal();
  });
  document
    .getElementById("editProductForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      saveEditedProduct();
    });
}
window.openEditModal = function (id) {
  var p = getAllProducts().find(function (x) {
    return x.id === id;
  });
  if (!p) return;
  document.getElementById("editProductId").value = p.id;
  document.getElementById("editName").value = p.name;
  document.getElementById("editPrice").value = p.price;
  document.getElementById("editQuantity").value = p.quantity || "";
  document.getElementById("editDesc").value = p.description || "";
  document.getElementById("editModal").style.display = "flex";
};
function closeEditModal() {
  var m = document.getElementById("editModal");
  if (m) m.style.display = "none";
}
function saveEditedProduct() {
  var id = parseInt(document.getElementById("editProductId").value);
  var name = document.getElementById("editName").value.trim();
  var price = parseFloat(document.getElementById("editPrice").value);
  var qty = document.getElementById("editQuantity").value.trim();
  var desc = document.getElementById("editDesc").value.trim();
  if (!name || isNaN(price)) {
    showToast("Fill in all required fields.", "error");
    return;
  }

  /* Check if this is a custom (admin-added) product */
  var customs = getCustomProducts();
  var custIdx = customs.findIndex(function (p) {
    return p.id === id;
  });

  if (custIdx !== -1) {
    /* Custom product: update in ntlf-admin-products */
    customs[custIdx] = Object.assign({}, customs[custIdx], {
      name: name,
      price: price,
      quantity: qty,
      description: desc,
    });
    saveCustomProducts(customs);
  } else {
    /* Built-in product: save changes to ntlf-product-overrides
       This key is read by script-products.js and script-details.js
       so the edit reflects on every page immediately. */
    var overrides = getOverrides();
    overrides[id] = Object.assign(overrides[id] || {}, {
      name: name,
      price: price,
      quantity: qty,
      description: desc,
    });
    saveOverrides(overrides);
  }

  closeEditModal();
  renderManageTable();
  renderOverview();
  showToast(
    "Product updated! Changes will reflect on the products and details pages.",
    "success",
  );
}

/* ── Admin orders tab ───────────────────────────────────── */
function renderAdminOrders() {
  var el = document.getElementById("adminOrdersList");
  var orders = getOrders();
  if (!el) return;
  setText("ordersBadge", orders.length);
  if (!orders.length) {
    el.innerHTML =
      '<p class="empty-msg" style="padding:20px 0">No orders yet. Orders appear here automatically when customers check out.</p>';
    return;
  }
  el.innerHTML = orders
    .slice()
    .reverse()
    .map(function (o) {
      var items = Array.isArray(o.items) ? o.items : [];
      var itemsHtml = items
        .map(function (i) {
          return (
            '<div class="ao-item-row">' +
            '<span class="ao-item-name">' +
            i.name +
            ' <span style="color:var(--text-muted)">\xd7' +
            (i.qty || 1) +
            "</span></span>" +
            '<span class="ao-item-price">' +
            formatPrice((i.price || 0) * (i.qty || 1)) +
            "</span>" +
            "</div>"
          );
        })
        .join("");
      return (
        '<div class="admin-order-card">' +
        '<div class="ao-header">' +
        '<span class="ao-id">' +
        (o.id || "-") +
        "</span>" +
        '<span class="ao-date">' +
        new Date(o.date).toLocaleString("en-GH") +
        "</span>" +
        '<span class="order-status status-pending">Pending</span>' +
        "</div>" +
        '<div class="ao-customer">' +
        "<div><strong>Name:</strong> " +
        (o.name || "-") +
        "</div>" +
        "<div><strong>Phone:</strong> " +
        (o.phone || "-") +
        "</div>" +
        "<div><strong>Email:</strong> " +
        (o.email || "-") +
        "</div>" +
        "<div><strong>Org:</strong> " +
        (o.hospital || "-") +
        "</div>" +
        '<div style="grid-column:1/-1"><strong>Address:</strong> ' +
        (o.address || "-") +
        "</div>" +
        "</div>" +
        '<div class="ao-items">' +
        '<div class="ao-items-title">Items (' +
        items.length +
        ")</div>" +
        (itemsHtml ||
          '<span style="color:var(--text-muted);font-size:.83rem">No items recorded.</span>') +
        "</div>" +
        '<div class="ao-total"><span>Order Total</span><span>' +
        formatPrice(o.total || 0) +
        "</span></div>" +
        (o.notes
          ? '<div class="ao-notes"><strong>Notes:</strong> ' +
            o.notes +
            "</div>"
          : "") +
        "</div>"
      );
    })
    .join("");
}

function initClearOrders() {
  document
    .getElementById("clearOrdersBtn")
    ?.addEventListener("click", function () {
      if (!confirm("Delete ALL orders? This cannot be undone.")) return;
      localStorage.removeItem(ORDERS_KEY);
      renderAdminOrders();
      renderOverview();
      showToast("All orders cleared.", "error");
    });
}

/* ════════════════════════════════════════════════════════
   BROWSER PUSH NOTIFICATION PERMISSION
   Asks the browser once when the admin first logs in.
   The browser remembers the answer permanently, so this
   prompt only ever appears one time.
════════════════════════════════════════════════════════ */
function requestNotificationPermission() {
  if (!("Notification" in window)) return; /* browser does not support it */
  if (Notification.permission === "granted") return; /* already allowed */
  if (Notification.permission === "denied") return; /* admin declined */

  /* permission is 'default' — show the system prompt */
  Notification.requestPermission().then(function (result) {
    if (result === "granted") {
      showToast(
        "Notifications enabled! You will receive an alert for every new order.",
        "success",
      );
    }
  });
}

/* ════════════════════════════════════════════════════════
   FIRE OS-LEVEL NOTIFICATION FOR A NEW ORDER
   Appears as a system notification outside the browser.
   Stays on screen until the admin dismisses it.
   Clicking it brings the admin tab to focus and opens
   the All Orders panel directly.
════════════════════════════════════════════════════════ */
function fireOrderNotification(order) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  var items = Array.isArray(order.items) ? order.items : [];
  var preview = items
    .slice(0, 2)
    .map(function (i) {
      return i.name + " x" + (i.qty || 1);
    })
    .join(", ");
  if (items.length > 2) preview += " + " + (items.length - 2) + " more";

  var notif = new Notification("New Order Received - NTLF Medical", {
    body: [
      "Order ID: " + (order.id || "-"),
      "Customer: " + (order.name || "-"),
      "Phone: " + (order.phone || "-"),
      "Items: " + (preview || "-"),
      "Total: GHc " + Number(order.total || 0).toFixed(2),
    ].join("\n"),
    icon: "assets/icons/favicon.ico",
    badge: "assets/icons/favicon.ico",
    tag: order.id /* prevents duplicate popups for same order */,
    requireInteraction: true /* stays visible until admin dismisses it  */,
  });

  /* Clicking the popup: focus this tab, go to All Orders */
  notif.onclick = function () {
    window.focus();
    switchTab("orders-tab");
    notif.close();
  };
}

/* ════════════════════════════════════════════════════════
   REAL-TIME ORDER REFRESH — THREE LAYERS

   Layer 1 — Browser Notification API (OS popup)
     Fires an OS-level alert for every new order.
     Works even when the admin tab is minimised.

   Layer 2 — localStorage storage event (cross-tab)
     Fires instantly when the orders page writes a new
     order in a different browser tab.

   Layer 3 — 15-second poll (same-tab safety net)
     Catches edge cases where the storage event does not
     fire (e.g. order placed in the same tab).
════════════════════════════════════════════════════════ */
function initRealTimeRefresh() {
  /* Request OS notification permission immediately on login */
  requestNotificationPermission();

  var lastCount = getOrders().length;

  /* ── Layer 2: cross-tab storage event ── */
  window.addEventListener("storage", function (e) {
    if (e.key !== ORDERS_KEY) return;

    var newOrders = [];
    try {
      newOrders = JSON.parse(e.newValue || "[]");
    } catch {
      return;
    }

    if (newOrders.length > lastCount) {
      var incoming = newOrders[newOrders.length - 1];
      lastCount = newOrders.length;

      /* Refresh the dashboard panels */
      renderOverview();
      renderAdminOrders();
      setText("ordersBadge", newOrders.length);

      /* Flash the "All Orders" sidebar button green for 4 seconds */
      var navBtn = document.querySelector('.anav-btn[data-tab="orders-tab"]');
      if (navBtn) {
        navBtn.style.background = "rgba(37,211,102,.25)";
        navBtn.style.color = "#4ade80";
        setTimeout(function () {
          navBtn.style.background = "";
          navBtn.style.color = "";
        }, 4000);
      }

      /* In-page toast */
      showToast(
        "New order " +
          (incoming ? incoming.id : "") +
          " from " +
          (incoming ? incoming.name : "a customer") +
          "!",
        "success",
      );

      /* Layer 1: OS-level browser notification */
      if (incoming) fireOrderNotification(incoming);
    }
  });

  /* ── Layer 3: same-tab 15-second poll ── */
  setInterval(function () {
    var cur = getOrders().length;
    if (cur !== lastCount) {
      lastCount = cur;
      renderOverview();
      renderAdminOrders();
      setText("ordersBadge", cur);
    }
  }, 15000);
}

/* ── Toast ──────────────────────────────────────────────── */
function showToast(msg, type) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast show" + (type ? " " + type : "");
  clearTimeout(t._tmr);
  t._tmr = setTimeout(function () {
    t.className = "toast";
  }, 3200);
}
