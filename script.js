const XP_TARGET = 1860;
const XP_MAX = 2400;

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const xpFill = document.getElementById("xp-fill");
const xpValue = document.getElementById("xp-value");
const skillTree = document.querySelector(".skill-tree");

function animateXp() {
  if (!xpFill || !xpValue) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    xpFill.style.width = `${(XP_TARGET / XP_MAX) * 100}%`;
    xpValue.textContent = String(XP_TARGET);
    return;
  }

  xpFill.style.width = `${(XP_TARGET / XP_MAX) * 100}%`;
  const start = performance.now();
  const duration = 1200;

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    xpValue.textContent = String(Math.round(XP_TARGET * eased));
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (entry.target.id === "xp-fill" || entry.target.classList.contains("progress-section")) {
        animateXp();
      }
      if (entry.target.classList.contains("skill-tree")) {
        entry.target.classList.add("is-inview");
      }
      observer.unobserve(entry.target);
    }
  },
  { threshold: 0.35 },
);

const progressSection = document.querySelector(".progress-section");
if (progressSection) observer.observe(progressSection);
if (skillTree) observer.observe(skillTree);

// Subtle parallax on the expedition map
const map = document.querySelector(".hero-visual");
if (map && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 6;
      map.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    { passive: true },
  );
}
