const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* Theme toggle — UI Stack light/dark */
const themeBtn = document.getElementById("theme-toggle");
function currentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function setTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  if (themeBtn) themeBtn.textContent = next === "dark" ? "Light" : "Dark";
}
if (themeBtn) {
  themeBtn.textContent = currentTheme() === "dark" ? "Light" : "Dark";
  themeBtn.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });
}

/* Expandable experience */
document.querySelectorAll(".job-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const job = btn.closest(".job");
    if (!job) return;
    const open = job.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
});

/* Mini terminal */
const termOut = document.getElementById("term-out");
const termForm = document.getElementById("term-form");
const termInput = document.getElementById("term-input");

const HELP = `available commands:
  help       show this list
  whoami     jump to profile
  skills     jump to skills + certs
  experience jump to experience log
  contact    jump to contact
  blog       open blog
  cv         download CV / Lebenslauf
  clear      clear terminal
  uptime     years in ops
  theme      toggle light/dark`;

function appendLine(text, cls) {
  if (!termOut) return;
  const line = document.createElement("div");
  line.className = cls;
  line.textContent = text;
  termOut.appendChild(line);
  termOut.scrollTop = termOut.scrollHeight;
}

function go(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function runCommand(raw) {
  const input = raw.trim();
  if (!input) return;
  appendLine(`$ ${input}`, "term-line-in");

  const [cmd, ...rest] = input.toLowerCase().split(/\s+/);
  const arg = rest.join(" ");

  switch (cmd) {
    case "help":
    case "?":
      appendLine(HELP, "term-line-out");
      break;
    case "whoami":
      appendLine("Ankit Kumar — DevOps & Cloud Infrastructure · targeting Germany", "term-line-out");
      go("#whoami");
      break;
    case "skills":
    case "ls":
      appendLine("listing ./skills and ./certs.txt …", "term-line-out");
      go("#skills");
      break;
    case "experience":
    case "cat":
    case "quests":
      appendLine("opening ./experience.log …", "term-line-out");
      go("#experience");
      break;
    case "contact":
    case "open":
      if (cmd === "open" && arg && !arg.includes("contact")) {
        if (arg.includes("blog")) {
          window.open("https://blog.iankitkumar.in", "_blank", "noopener");
          appendLine("spawned blog.iankitkumar.in", "term-line-out");
          break;
        }
        if (arg.includes("cv") || arg.includes("lebenslauf")) {
          window.location.href = "./Ankit_Kumar_CV.pdf";
          appendLine("fetching Ankit_Kumar_CV.pdf …", "term-line-out");
          break;
        }
      }
      appendLine("mail@iankitkumar.in · LinkedIn · GitHub", "term-line-out");
      go("#contact");
      break;
    case "blog":
      window.open("https://blog.iankitkumar.in", "_blank", "noopener");
      appendLine("opened https://blog.iankitkumar.in", "term-line-out");
      break;
    case "cv":
    case "lebenslauf":
    case "resume":
      window.location.href = "./Ankit_Kumar_CV.pdf";
      appendLine("downloading CV / Lebenslauf …", "term-line-out");
      break;
    case "theme":
      setTheme(currentTheme() === "dark" ? "light" : "dark");
      appendLine(`theme → ${currentTheme()}`, "term-line-out");
      break;
    case "clear":
      if (termOut) termOut.innerHTML = "";
      break;
    case "uptime":
      appendLine("up 4+ years — enterprise ops · Splunk · Azure · automation", "term-line-out");
      break;
    default:
      appendLine(`command not found: ${cmd}  (try help)`, "term-line-out");
  }
}

if (termOut) {
  appendLine("spawn ankit.sh — type help to explore", "term-line-out");
}

termForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = termInput?.value ?? "";
  runCommand(value);
  if (termInput) termInput.value = "";
});
