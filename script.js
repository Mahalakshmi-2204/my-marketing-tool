/* =====================================================
   GROWTHKIT
   Main JavaScript
===================================================== */

/* =====================================================
   COMMON HEADER & FOOTER
===================================================== */

async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

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

  if (!themeToggle || !themeIcon) return;

  const savedTheme = localStorage.getItem("growthkit-theme");
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("growthkit-theme", theme);

    themeIcon.src =
      theme === "dark" ? "/element/dark-mode.svg" : "/element/light-mode.svg";

    themeIcon.alt = theme === "dark" ? "Dark mode" : "Light mode";

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function initializeMobileMenu() {
  const menuButton = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  if (!menuButton || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }

  function openMenu() {
    navLinks.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu with the Escape key.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close the menu when returning to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMenu();
    }
  });
}

/* =====================================================
   LOAD EVERYTHING
===================================================== */

initializeHeader();
initializeFooter();
