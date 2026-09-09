/* =====================================================
   GROWTHKIT
   Main JavaScript
===================================================== */

/* =====================================================
   COMMON HEADER & FOOTER
===================================================== */

async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Could not load ${file}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

/* =====================================================
   INITIALIZE HEADER
===================================================== */

async function initializeHeader() {
  await loadComponent("header", "/components/header.html");

  initializeThemeToggle();
  initializeMobileMenu();
}

/* =====================================================
   INITIALIZE FOOTER
===================================================== */

async function initializeFooter() {
  await loadComponent("footer", "/components/footer.html");
}

/* =====================================================
   THEME TOGGLE
===================================================== */

function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");

  const themeIcon = document.getElementById("theme-icon");

  if (!themeToggle || !themeIcon) {
    return;
  }

  const savedTheme = localStorage.getItem("growthkit-theme");

  /* Load saved theme */

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");

    themeIcon.src = "/element/dark-mode.svg";

    themeIcon.alt = "Dark mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");

    themeIcon.src = "/element/light-mode.svg";

    themeIcon.alt = "Light mode";
  }

  /* Toggle theme */

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");

      localStorage.setItem("growthkit-theme", "light");

      themeIcon.src = "/element/light-mode.svg";

      themeIcon.alt = "Light mode";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");

      localStorage.setItem("growthkit-theme", "dark");

      themeIcon.src = "/element/dark-mode.svg";

      themeIcon.alt = "Dark mode";
    }
  });
}

/* =====================================================
   MOBILE MENU
===================================================== */

function initializeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");

  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenu || !navLinks) {
    return;
  }

  /* Open / close menu */

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* Close menu after clicking a link */

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

/* =====================================================
   LOAD EVERYTHING
===================================================== */

initializeHeader();
initializeFooter();
