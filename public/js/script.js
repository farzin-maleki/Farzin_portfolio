// ---------- Mobile drawer nav ----------
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const backdrop = document.getElementById("navBackdrop");

function openMenu() {
  document.body.style.setProperty(
    "--menu-header-height",
    `${document.querySelector(".header").getBoundingClientRect().height}px`,
  );
  nav.classList.add("open");
  backdrop.classList.add("show");
  document.body.classList.add("menu-open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Close menu");
  document.querySelector("main").inert = true;
  document.querySelector(".footer").inert = true;
  document.getElementById("themeToggle").inert = true;
  document.getElementById("toTop").inert = true;
  nav.querySelector("a").focus();
}

function closeMenu() {
  const wasOpen = nav.classList.contains("open");
  nav.classList.remove("open");
  backdrop.classList.remove("show");
  document.body.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Open menu");
  document.querySelector("main").inert = false;
  document.querySelector(".footer").inert = false;
  document.getElementById("themeToggle").inert = false;
  document.getElementById("toTop").inert = false;
  if (wasOpen) burger.focus();
}

function toggleMenu() {
  nav.classList.contains("open") ? closeMenu() : openMenu();
}

burger.addEventListener("click", toggleMenu);
backdrop.addEventListener("click", closeMenu);

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
  if (e.key === "Tab" && nav.classList.contains("open")) {
    const first = nav.querySelector("a");
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      burger.focus();
    } else if (!e.shiftKey && document.activeElement === burger) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Reset the drawer if the viewport grows back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

// ---------- Smooth scroll for in-page links ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      target.focus({ preventScroll: true });
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
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  }),
);

// ---------- Reveal once on entry; keep content readable afterwards ----------
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal--visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
      )
    : {
        observe: (el) => el.classList.add("reveal--visible"),
        unobserve: () => {},
      };
document.documentElement.classList.add("reveal-ready");
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Active page links are marked in each HTML page.

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

if (typed && reduceMotion) {
  typed.textContent = roles[0];
} else if (typed) {
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

// ---------- work articles ----------

const projects = [
  {
    id: 1,
    url: "https://farhad-nouri.com",
    img: "farhad-nouri.webp",
    title: "Athlete & Coaching Site",
    description: `A bilingual personal brand and fitness-coaching site for an athlete, with online booking and automated payments`,
    features: [
      "Cal.com booking & EmailJS contact form",
      "Stripe payments via Make.com automation",
      "Bilingual English / Persian content",
    ],
    techs: ["JavaScript", "React", "Vite", "HTML", "CSS", "Stripe"],
  },
  {
    id: 2,
    url: "https://primenestpro.uk",
    img: "primeNestPro.webp",
    title: "Handyman Company Site",
    description: `A marketing and quote-request site for a London handyman company, with a custom admin panel and database backend.`,
    features: [
      "Supabase backend with custom admin panel",
      "Quote requests & EmailJS notifications",
      "Fully responsive, deployed on Netlify",
    ],
    techs: [
      "JavaScript",
      "React",
      "Vite",
      "HTML",
      "CSS",
      "Supabase",
      "EmailJS",
    ],
  },
  {
    id: 3,
    url: "https://www.dubai-restaurant.uk",
    img: "dubai-restaurant.webp",
    title: "Restaurant Ordering & Menu Site",
    description: `A marketing and menu site for Original Dubai Shawarma, with AI-generated food photography and a cleaned-up digital menu.`,
    features: [
      "Menu digitized from Loyverse POS export",
      "AI-generated food photography",
      "Deployed on Vercel with custom domain",
    ],
    techs: ["JavaScript", "HTML", "CSS", "EmailJS"],
  },
  {
    id: 4,
    url: "https://www.securitycaspianshield.com",
    img: "securityCaspian.webp",
    title: "Security Caspian Shield Website",
    description: `A responsive, multi-page website for Security Caspian Shield Ltd, showcasing security services with tailored quote enquiries and direct contact options.`,
    features: [
      "Dedicated pages for five security services",
      "Quote form with email and WhatsApp handoff",
      "Responsive layouts and animated page transitions",
      "Deployed on Vercel with a custom domain",
    ],
    techs: ["JavaScript", "HTML", "CSS", "Font Awesome"],
  },
];

const statNum = document.querySelector(".stat__num");

const projectsContainer = document.querySelector(".projects");

function renderProjects() {
  statNum.innerHTML = projects.length;
  projects.forEach((project) => {
    projectsContainer.insertAdjacentHTML(
      "beforeend",
      `
            <article class="project reveal from-left">
                <div class="project__top">
                  <div class="browser-bar">
                    <i></i><i></i><i></i>
                    <span class="browser-url">${project.url}</span>
                  </div>
                </div>
                <div class="project__visual">
                  <img src="./public/media/images/projects/${project.img}" />
                </div>
                <div class="project__body">
                  <span class="project__badge"
                    >Client project · Live<span class="dot"></span
                  ></span>
                  <h3>${project.title}</h3>
                  <p>
                    ${project.description}
                  </p>
                  <ul class="project__features"></ul>
                  <div class="tech"></div>
                  <div class="project__links">
                    <a href="${project.url}" target="_blank" rel="noopener">
                      Visit site
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  </div>
                </div>
            </article>
      `,
    );

    const currentArticle = projectsContainer.lastElementChild;

    revealObserver.observe(currentArticle);

    const featuresContainer =
      currentArticle.querySelector(".project__features");
    project.features.forEach((feature) => {
      featuresContainer.insertAdjacentHTML(
        "beforeend",
        `
          <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m5 12 5 5L20 7" />
              </svg>
              ${feature}
            </li>
        `,
      );
    });

    const techsContainer = currentArticle.querySelector(".tech");
    project.techs.forEach((tech) => {
      techsContainer.insertAdjacentHTML("beforeend", `<span>${tech}</span>`);
    });
  });
}

// ---------- Contact form (EmailJS) ----------
(function () {
  const EMAILJS_PUBLIC_KEY = "y-GUM83X5K7MbDnDA";
  const EMAILJS_SERVICE_ID = "service_ur47euf";
  const EMAILJS_TEMPLATE_ID = "template_lfpanuw";

  const form = document.getElementById("contactForm");
  if (!form) return;
  if (typeof emailjs === "undefined") {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById("formStatus").textContent =
        "The message service is unavailable. Please email malekifarzin36@gmail.com directly.";
    });
    return;
  }

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
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
        replyTo: form.user_email.value,
      })
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
