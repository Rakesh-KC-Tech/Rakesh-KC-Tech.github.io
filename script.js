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
const words = ["Web Developer", "Full-Stack Developer", "CS Student", "Security Learner"];
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

// Reveal on scroll (also animates skill bars)
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

// Back-to-top button
const backTop = document.getElementById("backTop");
addEventListener("scroll", () => backTop.classList.toggle("show", scrollY > 400), { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();
