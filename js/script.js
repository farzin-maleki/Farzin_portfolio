// ---------- Mobile drawer nav ----------
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const backdrop = document.getElementById("navBackdrop");

function openMenu() {
  nav.classList.add("open");
  backdrop.classList.add("show");
  document.body.classList.add("menu-open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  nav.classList.remove("open");
  backdrop.classList.remove("show");
  document.body.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Open menu");
}

function toggleMenu() {
  nav.classList.contains("open") ? closeMenu() : openMenu();
}

burger.addEventListener("click", toggleMenu);
backdrop.addEventListener("click", closeMenu);

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Reset the drawer if the viewport grows back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

// ---------- Smooth scroll for in-page links ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ---------- Header shade + back-to-top button ----------
const header = document.querySelector(".header");
const toTop = document.getElementById("toTop");

const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  toTop.classList.toggle("show", window.scrollY > 500);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ---------- Bidirectional reveal (animates on scroll-down AND scroll-up) ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("reveal--visible", entry.isIntersecting);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ---------- Active nav link highlighting ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + id),
        );
      }
    });
  },
  { threshold: 0.5 },
);
sections.forEach((s) => navObserver.observe(s));

// ---------- Typed rotating role ----------
const roles = [
  "Frontend Developer",
  "Web Developer",
  "JavaScript Developer",
  "Freelance Developer",
];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (reduceMotion) {
  typed.textContent = roles[0];
} else {
  let r = 0,
    c = 0,
    deleting = false;
  const type = () => {
    const word = roles[r];
    typed.textContent = deleting
      ? word.substring(0, c--)
      : word.substring(0, c++);
    let delay = deleting ? 45 : 90;
    if (!deleting && c === word.length + 1) {
      deleting = true;
      delay = 1600;
    } else if (deleting && c === 0) {
      deleting = false;
      r = (r + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  };
  type();
}

// ---------- Contact form (EmailJS) ----------
(function () {
  const EMAILJS_PUBLIC_KEY = "y-GUM83X5K7MbDnDA";
  const EMAILJS_SERVICE_ID = "service_ur47euf";
  const EMAILJS_TEMPLATE_ID = "template_lfpanuw";

  const form = document.getElementById("contactForm");
  if (!form || typeof emailjs === "undefined") return;

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const submitBtn = document.getElementById("cfSubmit");
  const status = document.getElementById("formStatus");
  const defaultBtn = submitBtn.innerHTML;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        status.textContent = "✓ Thanks! Your message has been sent.";
        status.classList.add("success");
        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        status.textContent = "✗ Something went wrong — please try again.";
        status.classList.add("error");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = defaultBtn;
      });
  });
})();
