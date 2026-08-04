const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

document.querySelectorAll(".entry-head").forEach((btn) => {
  btn.addEventListener("click", () => {
    const entry = btn.closest(".entry");
    if (!entry) return;
    const open = entry.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
});

const termOut = document.getElementById("term-out");
const termForm = document.getElementById("term-form");
const termInput = document.getElementById("term-input");

const HELP = `commands: help · experience · skills · contact · cv · blog · clear`;

function appendLine(text, cls) {
  if (!termOut) return;
  const line = document.createElement("div");
  line.className = cls;
  line.textContent = text;
  termOut.appendChild(line);
  termOut.scrollTop = termOut.scrollHeight;
}

function go(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function runCommand(raw) {
  const input = raw.trim();
  if (!input) return;
  appendLine(`$ ${input}`, "term-line-in");
  const cmd = input.toLowerCase().split(/\s+/)[0];

  switch (cmd) {
    case "help":
    case "?":
      appendLine(HELP, "term-line-out");
      break;
    case "whoami":
      appendLine("Ankit Kumar — DevOps & Cloud · Germany-bound", "term-line-out");
      go("#whoami");
      break;
    case "experience":
    case "cat":
    case "quests":
      go("#experience");
      appendLine("opened ./experience.log", "term-line-out");
      break;
    case "skills":
    case "ls":
      go("#skills");
      appendLine("opened ./skills", "term-line-out");
      break;
    case "contact":
    case "open":
      go("#contact");
      appendLine("mail@iankitkumar.in", "term-line-out");
      break;
    case "cv":
    case "lebenslauf":
    case "resume":
      window.location.href = "./Ankit_Kumar_CV.pdf";
      appendLine("fetching CV.pdf …", "term-line-out");
      break;
    case "blog":
      window.open("https://blog.iankitkumar.in", "_blank", "noopener");
      appendLine("spawned blog.iankitkumar.in", "term-line-out");
      break;
    case "clear":
      if (termOut) termOut.innerHTML = "";
      break;
    default:
      appendLine(`not found: ${cmd} — try help`, "term-line-out");
  }
}

termForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  runCommand(termInput?.value ?? "");
  if (termInput) termInput.value = "";
});
