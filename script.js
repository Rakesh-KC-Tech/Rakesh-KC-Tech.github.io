// Theme toggle (remembers choice; defaults to system setting)
const root = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", () => {
  const current =
    root.getAttribute("data-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Highlight the nav link for the section in view
const links = [...navLinks.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  }),
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
