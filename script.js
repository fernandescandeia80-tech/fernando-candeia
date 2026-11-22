
/* ==========================================
   FERNANDO CANDEIA PORTFOLIO
   INTERACTIVE EXPERIENCE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // MOBILE MENU
  // ========================================

  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");

  function closeMenu() {
    if (!menuButton || !navigation) return;

    menuButton.classList.remove("active");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // ========================================
  // NAVBAR SCROLL
  // ========================================

  const header = document.getElementById("header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // ========================================
  // REVEAL ANIMATIONS
  // ========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // ========================================
  // ACTIVE NAVIGATION
  // ========================================

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navigation a[href^='#']");

  function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
  });

  updateActiveNavigation();

  // ========================================
  // AUTOMATIC YEAR
  // ========================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ========================================
  // PROFILE PARALLAX - DESKTOP
  // ========================================

  const profile = document.querySelector(".hero-profile");

  const desktopMotion = window.matchMedia(
    "(min-width: 761px) and (prefers-reduced-motion: no-preference)"
  );

  if (profile && desktopMotion.matches) {

    let moveX = 0;
    let moveY = 0;
    let currentX = 0;
    let currentY = 0;

    profile.addEventListener("mousemove", event => {

      const rect = profile.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      moveX = (x - 0.5) * 8;
      moveY = (y - 0.5) * 8;

    });

    profile.addEventListener("mouseleave", () => {
      moveX = 0;
      moveY = 0;
    });

    function smoothParallax() {

      currentX += (moveX - currentX) * 0.06;
      currentY += (moveY - currentY) * 0.06;

      profile.style.setProperty("--mouse-x", currentX + "px");
      profile.style.setProperty("--mouse-y", currentY + "px");

      requestAnimationFrame(smoothParallax);
    }

    smoothParallax();

  }

  // ========================================
  // PROJECT CARD GLOW
  // ========================================

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--pointer-x", x + "px");
      card.style.setProperty("--pointer-y", y + "px");

    });

  });

  // ========================================
  // IMAGE LOADING
  // ========================================

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });

    image.addEventListener("load", () => {
      image.classList.add("image-loaded");
    });

  });

  // ========================================
  // INITIALIZATION
  // ========================================

  document.body.classList.add("site-loaded");

  console.log("Fernando Candeia Portfolio initialized.");

});
