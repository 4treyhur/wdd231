// Member spotlights: fetch members.json, keep Gold/Silver, pick 3 at random
const spotlightBox = document.querySelector("#spotlight-cards");

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { members } = await response.json();

    const eligible = members.filter(m => ["gold", "silver"].includes(m.level.toLowerCase()));
    const picks = shuffle(eligible).slice(0, 3);

    spotlightBox.replaceChildren();
    picks.forEach(m => {
      const card = document.createElement("article");
      card.className = "spot";
      card.innerHTML = `
        <img class="logo" src="${m.logo}" alt="${m.name} logo" width="88" height="88" loading="lazy">
        <h3>${m.name}</h3>
        <p><em>${m.tagline}</em></p>
        <span class="level">${m.level} Member</span>
        <address>
          <span>${m.address}</span>
          <a href="tel:${m.phone.replace(/\D/g, "")}">${m.phone}</a>
          <a href="https://${m.url}" target="_blank" rel="noopener">${m.url}</a>
        </address>`;
      spotlightBox.append(card);
    });
  } catch (error) {
    console.error("Spotlights error:", error);
    spotlightBox.innerHTML = '<p class="error">Member spotlights are not available right now.</p>';
  }
}

loadSpotlights();