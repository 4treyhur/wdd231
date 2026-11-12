// Fictional member businesses inspired by Pachuca, Hidalgo
const members = [
  { name: "Pastes El Minero", tagline: "Pachuca's original Cornish-Mexican pastes", email: "hola@pasteselminero.example", phone: "(771) 555-0101", url: "pasteselminero.example", level: "Gold" },
  { name: "Café Reloj Monumental", tagline: "Coffee from Hidalgo's sierra, roasted daily", email: "cafe@relojcafe.example", phone: "(771) 555-0122", url: "relojcafe.example", level: "Silver" },
  { name: "Plata y Cantera", tagline: "Handmade silver jewelry and stonework", email: "ventas@platacantera.example", phone: "(771) 555-0143", url: "platacantera.example", level: "Gold" },
  { name: "Tours Real del Monte", tagline: "Mine tours and mountain day trips", email: "reservas@toursrdm.example", phone: "(771) 555-0165", url: "toursrdm.example", level: "Silver" },
  { name: "Barbacoa Hidalguense La Hacienda", tagline: "Slow-cooked barbacoa, family recipe", email: "contacto@lahacienda.example", phone: "(771) 555-0187", url: "barbacoalahacienda.example", level: "Bronze" },
  { name: "Librería La Bella Airosa", tagline: "Books, comics and local authors", email: "libros@bellaairosa.example", phone: "(771) 555-0209", url: "bellaairosa.example", level: "Bronze" },
  { name: "Tecnoparque Pachuca", tagline: "IT support for small businesses", email: "soporte@tecnoparque.example", phone: "(771) 555-0231", url: "tecnoparque.example", level: "Gold" },
  { name: "Panadería La Reforma", tagline: "Fresh bread and pastries since 1962", email: "pedidos@panaderialareforma.example", phone: "(771) 555-0254", url: "panaderialareforma.example", level: "Silver" },
  { name: "Hotel Casa Cristo Rey", tagline: "Boutique stays in downtown Pachuca", email: "hotel@casacristorey.example", phone: "(771) 555-0276", url: "casacristorey.example", level: "Gold" }
];

const container = document.querySelector("#directory");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

function renderMembers() {
  container.innerHTML = members.map(m => `
    <article class="card">
      <div class="card-head">
        <h2>${m.name}</h2>
        <p>${m.tagline}</p>
      </div>
      <div class="card-body">
        <div class="logo" role="img" aria-label="${m.name} logo">${m.name[0]}</div>
        <dl>
          <dt>EMAIL:</dt><dd><a href="mailto:${m.email}">${m.email}</a></dd>
          <dt>PHONE:</dt><dd><a href="tel:${m.phone.replace(/[^\d]/g, "")}">${m.phone}</a></dd>
          <dt>URL:</dt><dd><a href="https://${m.url}" target="_blank" rel="noopener">${m.url}</a></dd>
          <dd class="badge">Membership: ${m.level}</dd>
        </dl>
      </div>
    </article>`).join("");
}

function setView(view) {
  container.className = view;
  gridBtn.setAttribute("aria-pressed", view === "grid");
  listBtn.setAttribute("aria-pressed", view === "list");
  try { localStorage.setItem("directoryView", view); } catch (e) {}
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// Theme toggle
const root = document.documentElement;
function setTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch (e) {}
}
document.querySelector("#theme-toggle").addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// Mobile menu
const menuBtn = document.querySelector("#menu-toggle");
const nav = document.querySelector("#main-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// Init
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setTheme(savedTheme);
  else if (matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
} catch (e) {}
renderMembers();
let savedView = "grid";
try { savedView = localStorage.getItem("directoryView") || "grid"; } catch (e) {}
setView(savedView);