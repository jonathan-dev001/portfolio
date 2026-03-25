(function () {
  const themeBtn = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const themeIconM = document.querySelector(".theme-icon-m");
  window.applyTheme = function (mode) {
    const isLight = mode === "light";
    document.documentElement.classList.toggle("light", isLight);
    const icon = isLight ? "☀️" : "🌙";
    if (themeIcon) themeIcon.textContent = icon;
    if (themeIconM) themeIconM.textContent = icon;
    if (themeBtn)
      themeBtn.setAttribute(
        "aria-label",
        isLight ? "Passer en thème sombre" : "Passer en thème clair",
      );
    localStorage.setItem("theme", mode);
  };
  const saved = localStorage.getItem("theme");
  if (saved) {
    window.applyTheme(saved);
  } else {
    window.applyTheme(
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark",
    );
  }

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        window.applyTheme(e.matches ? "light" : "dark");
      }
    });
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      window.applyTheme(
        document.documentElement.classList.contains("light") ? "dark" : "light",
      );
    });
  }
})();

// ---- 02. SÉCURITÉ : reconstruction email + form action ----
(function () {
  const u = ["jonathan", "herve0502"].join("");
  const d = ["gmail", ".com"].join("");
  const em = u + "@" + d;
  const el = document.getElementById("emlLink");
  const tx = document.getElementById("emlTxt");
  if (el && tx) {
    tx.textContent = em;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mailto:" + em;
    });
  }
  const ef = document.getElementById("emlFooter");
  if (ef) {
    ef.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mailto:" + em;
    });
  }
})();

// ---- 03. NAV ----
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  mobileMenu.setAttribute("aria-hidden", !open);

  menuToggle.classList.toggle("is-open", open);
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
    mobileMenu.setAttribute("aria-hidden", true);
    menuToggle.classList.remove("is-open");
  }
});

mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", false);
    menuToggle.classList.remove("is-open");
  });
});

const themeToggleMobile = document.getElementById("themeToggleMobile");
if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("light")
      ? "dark"
      : "light";
    applyTheme(next);
  });
}

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
  window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
}
const links = document.querySelectorAll(
  ".nl a[data-s], .mobile-menu a[data-s]",
);
const ids = [
  "accueil",
  "a-propos",
  "services",
  "projets",
  "skills",
  "processus",
  "contact",
];
links.forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    smoothTo(a.getAttribute("href").replace("#", ""));
  }),
);
document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  smoothTo("accueil");
});

function majNav() {
  nav.classList.toggle("compact", window.scrollY > 30);
  let current = "accueil";
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.38)
      current = id;
  });
  links.forEach((a) => a.classList.toggle("on", a.dataset.s === current));
}
window.addEventListener("scroll", majNav, { passive: true });
majNav();

let lang = "fr";
const titles = {
  fr: "Jonathan Hervé — Développeur Full-Stack à Montréal",
  en: "Jonathan Hervé — Full-Stack Developer in Montreal",
};
document.querySelectorAll(".lb").forEach((btn) => {
  btn.addEventListener("click", () => {
    lang = btn.dataset.l;
    document.documentElement.lang = lang;
    document.title = titles[lang];
    document
      .querySelectorAll(".lb")
      .forEach((b) => b.classList.toggle("on", b === btn));
    document.querySelectorAll("[data-fr]").forEach((el) => {
      const value = el.dataset[lang];
      if (!value) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else if (value.includes("<")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });
  });
});

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add("visible"), delay);
      fadeObserver.unobserve(el);
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".fade-up").forEach((el, i) => {
  el.dataset.delay = (i % 3) * 120;
  fadeObserver.observe(el);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const strong = entry.target.querySelector("strong[data-count]");
      if (!strong || strong.dataset.counted) return;
      strong.dataset.counted = "1";
      const target = parseInt(strong.dataset.count);
      const suffix = strong.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        strong.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".card.fact")
  .forEach((el) => countObserver.observe(el));

const stackObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector(".fill");
      if (fill)
        fill.style.width = parseFloat(entry.target.dataset.w) * 100 + "%";
      stackObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".stack-card")
  .forEach((el) => stackObserver.observe(el));

(function () {
  const steps = [
    { val: "À discuter", tagFr: "Pas encore défini", tagEn: "Not defined yet" },
    { val: "1 200 $", tagFr: "Site vitrine", tagEn: "Showcase site" },
    {
      val: "2 000 $",
      tagFr: "Site vitrine avancé",
      tagEn: "Advanced showcase",
    },
    { val: "3 500 $", tagFr: "Application web", tagEn: "Web application" },
    { val: "6 000 $", tagFr: "Projet complexe", tagEn: "Complex project" },
    { val: "Sur devis", tagFr: "Sur devis", tagEn: "On quote" },
  ];
  const slider = document.getElementById("budgetSlider");
  const valEl = document.getElementById("budgetVal");
  const tagEl = document.getElementById("budgetTag");
  const hiddenEl = document.getElementById("budgetHidden");

  function updateBudget() {
    const idx = parseInt(slider.value);
    const s = steps[idx];
    const isEn = document.documentElement.lang === "en";
    valEl.textContent = s.val;
    tagEl.textContent = isEn ? s.tagEn : s.tagFr;
    hiddenEl.value = s.val;

    const pct = (idx / (steps.length - 1)) * 100;
    slider.style.setProperty("--pct", pct + "%");
  }

  slider.addEventListener("input", updateBudget);
  updateBudget();

  document.querySelectorAll(".lb").forEach((btn) => {
    btn.addEventListener("click", () => setTimeout(updateBudget, 10));
  });
})();

// ---- 08. FORMULAIRE — validation client + envoi FormSubmit ----
(function () {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const btn = form ? form.querySelector(".cfbtn") : null;
  const defaultBtnText = btn ? btn.textContent : "Envoyer le message →";

  form
    .querySelectorAll(".cf-input, .cf-select, .cf-textarea")
    .forEach((inp) => {
      inp.addEventListener("blur", () => validate(inp));
      inp.addEventListener("input", () => {
        if (inp.closest(".cf-group").classList.contains("has-error"))
          validate(inp);
      });
    });

  function validate(inp) {
    const grp = inp.closest(".cf-group");
    if (!grp) return true;
    let ok = true;
    if (inp.hasAttribute("required") && !inp.value.trim()) ok = false;
    if (
      inp.type === "email" &&
      inp.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)
    )
      ok = false;
    if (
      inp.tagName === "TEXTAREA" &&
      inp.hasAttribute("minlength") &&
      inp.value.trim().length < parseInt(inp.getAttribute("minlength"))
    )
      ok = false;
    grp.classList.toggle("has-error", !ok);
    return ok;
  }

  let lastSubmit = 0;
  form.addEventListener("submit", function (e) {
    const now = Date.now();
    if (now - lastSubmit < 8000) {
      e.preventDefault();
      if (btn) {
        const remaining = Math.ceil((8000 - (now - lastSubmit)) / 1000);
        const isEn = document.documentElement.lang === "en";
        btn.textContent = isEn
          ? `Please wait ${remaining}s…`
          : `Patientez ${remaining}s…`;

        setTimeout(
          () => {
            btn.textContent = defaultBtnText;
          },
          8000 - (now - lastSubmit),
        );
      }
      return;
    }

    let allOk = true;
    form
      .querySelectorAll(".cf-input, .cf-select, .cf-textarea")
      .forEach((inp) => {
        if (!validate(inp)) allOk = false;
      });

    if (!allOk) {
      e.preventDefault();
      form.querySelectorAll(".cf-group.has-error").forEach((g) => {
        g.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-6px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 320, easing: "ease-in-out" },
        );
      });
      return;
    }

    lastSubmit = now;
    if (btn) {
      btn.disabled = true;
      btn.textContent =
        document.documentElement.lang === "en"
          ? "Sending..."
          : "Envoi en cours…";
    }
  });

  if (
    window.location.search.includes("success") ||
    document.referrer.includes("formsubmit.co")
  ) {
    if (success) success.classList.add("show");

    form.reset();

    form.querySelectorAll(".cf-group").forEach((g) => {
      g.classList.remove("has-error");
    });

    if (btn) {
      btn.disabled = false;
      btn.textContent = defaultBtnText;
    }

    const slider = document.getElementById("budgetSlider");
    const budgetVal = document.getElementById("budgetVal");
    const budgetTag = document.getElementById("budgetTag");
    const budgetHidden = document.getElementById("budgetHidden");

    if (slider && budgetVal && budgetTag && budgetHidden) {
      slider.value = 0;
      budgetVal.textContent = "À discuter";
      budgetTag.textContent =
        document.documentElement.lang === "en"
          ? "Not defined yet"
          : "Pas encore défini";
      budgetHidden.value = "À discuter";
      slider.style.setProperty("--pct", "0%");
    }

    if (window.history.replaceState) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + "#contact",
      );
    }
  }
})();
