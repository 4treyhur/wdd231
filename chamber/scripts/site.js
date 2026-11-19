// Shared by all pages: dark mode toggle + mobile menu
const root = document.documentElement;

function setTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

document.querySelector("#theme-toggle").addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const menuBtn = document.querySelector("#menu-toggle");
const nav = document.querySelector("#main-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

try {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else if (matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
} catch (e) {}