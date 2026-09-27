const root = document.documentElement;
const body = document.body;

// Theme toggle (dark by default; remembers choice)
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile sidebar
const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => {
  body.classList.toggle("nav-open");
  menuToggle.querySelector("i").className = body.classList.contains("nav-open") ? "bi bi-x" : "bi bi-list";
});
document.querySelectorAll("#sideNav a, .profile-name a").forEach((a) =>
  a.addEventListener("click", () => {
    body.classList.remove("nav-open");
    menuToggle.querySelector("i").className = "bi bi-list";
  })
);

// Typing effect
const words = ["Full-Stack Web Developer", "Next.js & Supabase Developer", "Computer Science Student"];
const typed = document.getElementById("typed");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) {
  typed.textContent = words[0];
} else {
  let w = 0, i = 0, deleting = false;
  (function tick() {
    const word = words[w];
    i += deleting ? -1 : 1;
    typed.textContent = word.slice(0, i);
    let delay = deleting ? 50 : 100;
    if (!deleting && i === word.length) { deleting = true; delay = 1600; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 400; }
    setTimeout(tick, delay);
  })();
}

// Download CV: prints the page with the print stylesheet (choose "Save as PDF")
document.getElementById("downloadCv").addEventListener("click", () => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  window.print();
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Active nav link
const links = [...document.querySelectorAll("#sideNav a")];
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  }),
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// Back-to-top button + reading progress bar
const backTop = document.getElementById("backTop");
const progress = document.getElementById("progress");
function onScroll() {
  backTop.classList.toggle("show", scrollY > 400);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Spotlight that follows the cursor on cards
document.querySelectorAll(".spot").forEach((card) =>
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  })
);

// Count numbers up when they scroll into view
const countObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countObserver.unobserve(e.target);
    const el = e.target, to = +el.dataset.to;
    if (reduceMotion) return;
    const start = performance.now(), dur = 1200;
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }),
  { threshold: 0.6 }
);
document.querySelectorAll(".count").forEach((el) => countObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
