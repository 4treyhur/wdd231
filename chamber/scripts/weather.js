// Directory page: load members from JSON and switch between grid / list views
const container = document.querySelector("#directory");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

async function renderMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { members } = await response.json();

    container.replaceChildren();
    members.forEach(m => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-head">
          <h2>${m.name}</h2>
          <p>${m.tagline}</p>
        </div>
        <div class="card-body">
          <img class="logo" src="${m.logo}" alt="${m.name} logo" width="88" height="88" loading="lazy">
          <dl>
            <dt>EMAIL:</dt><dd><a href="mailto:${m.email}">${m.email}</a></dd>
            <dt>PHONE:</dt><dd><a href="tel:${m.phone.replace(/\D/g, "")}">${m.phone}</a></dd>
            <dt>URL:</dt><dd><a href="https://${m.url}" target="_blank" rel="noopener">${m.url}</a></dd>
            <dd class="badge">Membership: ${m.level}</dd>
          </dl>
        </div>`;
      container.append(card);
    });
  } catch (error) {
    console.error("Directory error:", error);
    container.innerHTML = "<p>The directory is not available right now.</p>";
  }
}

function setView(view) {
  container.className = view;
  gridBtn.setAttribute("aria-pressed", view === "grid");
  listBtn.setAttribute("aria-pressed", view === "list");
  try { localStorage.setItem("directoryView", view); } catch (e) {}
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

renderMembers();
let savedView = "grid";
try { savedView = localStorage.getItem("directoryView") || "grid"; } catch (e) {}
setView(savedView);