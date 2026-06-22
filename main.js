/**
 * Portfolio — Main JavaScript
 * Handles navbar behavior, active link highlighting, and form interactions.
 */

(function () {
  "use strict";

  const navbar = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll("#navbarNav .nav-link");
  const sections = document.querySelectorAll("section[id]");
  const contactForm = document.getElementById("contactForm");
  const navbarCollapse = document.getElementById("navbarNav");

  /**
   * Update active state on navbar links based on scroll position.
   */
  function setActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  /**
   * Close mobile navbar after clicking a nav link.
   */
  function closeMobileNav() {
    if (navbarCollapse.classList.contains("show")) {
      const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
      if (collapseInstance) {
        collapseInstance.hide();
      }
    }
  }

  /**
   * Handle contact form submission (placeholder until PHP backend is added).
   */
  function handleFormSubmit(event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      return;
    }

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    console.log("Form submitted (ready for PHP processing):", data);

    alert("Thank you for your message! This form is ready to connect to a PHP handler.");

    contactForm.reset();
    contactForm.classList.remove("was-validated");
  }

  /**
   * Animate progress bars when the skills section enters the viewport.
   */
  function animateProgressBars() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const bars = skillsSection.querySelectorAll(".progress-bar");
            bars.forEach(function (bar) {
              const width = bar.style.width;
              bar.style.width = "0";
              requestAnimationFrame(function () {
                bar.style.width = width;
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(skillsSection);
  }

  /* Event Listeners */

  window.addEventListener("scroll", setActiveNavLink);
  window.addEventListener("load", setActiveNavLink);

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  animateProgressBars();
})();
