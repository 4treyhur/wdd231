// ---------- Weather for Pachuca (OpenWeatherMap) ----------

const API_KEY = "e10c3421e782583f38c5f02bf7899cb9";
const LAT = 20.1011;   // Pachuca de Soto
const LON = -98.7591;
const API_BASE = "https://api.openweathermap.org/data/2.5";

const tempEl = document.querySelector("#temperature");
const descEl = document.querySelector("#description");
const windEl = document.querySelector("#wind");
const chillEl = document.querySelector("#windChill");
const iconEl = document.querySelector("#weather-icon");
const forecastEl = document.querySelector("#forecast");

// Wind chill (metric): temp in °C, wind in km/h
function calculateWindChill(tempC, speedKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16);
}

async function getWeather(endpoint) {
  const url = `${API_BASE}/${endpoint}?lat=${LAT}&lon=${LON}&units=metric&lang=en&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// Date string (YYYY-MM-DD) in the city's local time
function localDate(unixSeconds, offsetSeconds) {
  return new Date((unixSeconds + offsetSeconds) * 1000).toISOString().slice(0, 10);
}

function showCurrent(data) {
  const temp = data.main.temp;
  const windKmh = data.wind.speed * 3.6; // m/s → km/h

  tempEl.textContent = `${Math.round(temp)} °C`;
  descEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconEl.alt = data.weather[0].description;
  iconEl.hidden = false;
  windEl.textContent = `${windKmh.toFixed(1)} km/h`;

  // Wind chill only applies when temp <= 10 °C and wind > 4.8 km/h
  chillEl.textContent = (temp <= 10 && windKmh > 4.8)
    ? `${calculateWindChill(temp, windKmh).toFixed(1)} °C`
    : "N/A";
}

function showForecast(data) {
  const offset = data.city.timezone;
  const today = localDate(Math.floor(Date.now() / 1000), offset); // today in Pachuca

  // Group the 3-hour entries by local day
  const days = {};
  for (const item of data.list) {
    const day = localDate(item.dt, offset);
    if (day <= today) continue; // start with tomorrow
    (days[day] ??= []).push(item.main.temp);
  }

  forecastEl.innerHTML = Object.entries(days).slice(0, 3).map(([day, temps]) => {
    const name = new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" });
    return `<li><span>${name}</span><span>High ${Math.round(Math.max(...temps))} °C · Low ${Math.round(Math.min(...temps))} °C</span></li>`;
  }).join("");
}

async function loadWeather() {
  try {
    const [current, forecast] = await Promise.all([getWeather("weather"), getWeather("forecast")]);
    showCurrent(current);
    showForecast(forecast);
  } catch (error) {
    console.error("Weather error:", error);
    descEl.textContent = "Weather data is not available right now.";
  }
}

loadWeather();
