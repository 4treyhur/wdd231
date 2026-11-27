// Show the required form fields that arrive in the URL (GET method)
const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");

const fields = [
  ["First Name", "first"],
  ["Last Name", "last"],
  ["Email", "email"],
  ["Mobile Phone", "phone"],
  ["Business", "business"],
  ["Submitted", "timestamp"]
];

function formatValue(key, value) {
  if (key !== "timestamp") return value;
  const date = new Date(value);
  return isNaN(date) ? value : date.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
}

function showSummary() {
  if (!params.has("first")) {
    const message = document.createElement("p");
    message.textContent = "No application information found. Please complete the form on the Join page.";
    summary.append(message);
    return;
  }

  const list = document.createElement("dl");
  fields.forEach(([label, key]) => {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = `${label}:`;
    detail.textContent = formatValue(key, params.get(key) || "");
    list.append(term, detail);
  });
  summary.append(list);
}

showSummary();
