const cover = document.getElementById("cover");
const main = document.getElementById("mainContent");
const openButton = document.getElementById("openInvitation");

openButton.addEventListener("click", () => {
  cover.classList.add("opening");
  setTimeout(() => {
    cover.style.display = "none";
    main.classList.add("visible");
    main.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 500);
});

const targetDate = new Date("2030-01-10T09:00:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;
  const values = {
    days: Math.max(0, Math.floor(distance / 86400000)),
    hours: Math.max(0, Math.floor((distance / 3600000) % 24)),
    minutes: Math.max(0, Math.floor((distance / 60000) % 60)),
    seconds: Math.max(0, Math.floor((distance / 1000) % 60))
  };
  Object.entries(values).forEach(([key, value]) => {
    document.getElementById(key).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

function openMaps() {
  const destination = encodeURIComponent("Stadion Tangerang");
  window.open(`https://www.google.com/maps/search/?api=1&query=${destination}`, "_blank");
}

const form = document.getElementById("rsvpForm");
const messages = document.getElementById("guestMessages");
const success = document.getElementById("successMessage");

function renderMessages() {
  const data = JSON.parse(localStorage.getItem("weddingMessages") || "[]");
  messages.innerHTML = data.map(item => `
    <article class="guest-card">
      <strong>${escapeHtml(item.name)}</strong>
      <small>${escapeHtml(item.attendance)}</small>
      <p>${escapeHtml(item.message)}</p>
    </article>
  `).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const item = {
    name: document.getElementById("guestName").value.trim(),
    attendance: document.getElementById("attendance").value,
    message: document.getElementById("message").value.trim()
  };
  const data = JSON.parse(localStorage.getItem("weddingMessages") || "[]");
  data.push(item);
  localStorage.setItem("weddingMessages", JSON.stringify(data.slice(-100)));
  form.reset();
  success.hidden = false;
  renderMessages();
});

renderMessages();
