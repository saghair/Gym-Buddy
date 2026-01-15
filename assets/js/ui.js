// assets/js/ui.js

export function ensureToastRoot() {
  let root = document.getElementById("toast-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "toast-root";
    document.body.appendChild(root);
  }
  return root;
}

export function toast(title, message, type = "good", ms = 3200) {
  const root = ensureToastRoot();

  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `
    <div class="toast-title">${escapeHtml(title)}</div>
    <div class="toast-body">${escapeHtml(message)}</div>
  `;

  root.appendChild(t);

  // animate in
  requestAnimationFrame(() => t.classList.add("show"));

  // remove
  const remove = () => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 220);
  };

  setTimeout(remove, ms);
  t.addEventListener("click", remove);
}

export function setButtonLoading(btn, isLoading, loadingText = "Loading...") {
  if (!btn) return;
  if (isLoading) {
    btn.dataset.prevText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span>${escapeHtml(loadingText)}`;
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.prevText || btn.textContent;
    delete btn.dataset.prevText;
  }
}

export function daysBetween(a, b) {
  const MS = 24 * 60 * 60 * 1000;
  const da = new Date(a);
  const db = new Date(b);
  da.setHours(0, 0, 0, 0);
  db.setHours(0, 0, 0, 0);
  return Math.round((db - da) / MS);
}

export function formatDateISO(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toISOString().slice(0, 10);
}

export function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
