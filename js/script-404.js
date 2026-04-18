/**
 * NTLF MEDICAL – 404 Page Script
 * script-404.js
 */

// Theme
function initTheme() {
  const saved = localStorage.getItem("ntlf_theme") || "light";
  document.body.dataset.theme = saved;
  const icon = document.getElementById("themeIcon");
  if (icon) icon.className = saved === "dark" ? "fas fa-sun" : "fas fa-moon";
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("ntlf_theme", next);
    const ic = document.getElementById("themeIcon");
    if (ic) ic.className = next === "dark" ? "fas fa-sun" : "fas fa-moon";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());
});
