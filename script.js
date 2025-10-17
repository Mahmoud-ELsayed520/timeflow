// ========== PAGE LOADER ==========
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 600); // half a second fade-out
  }
});

// ========== DARK/LIGHT THEME TOGGLE ==========
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");

// Check saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

// Update button text/icon based on current mode
function updateThemeButton() {
  if (!themeToggle) return;
  const isDark = body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDark
    ? `<span class="icon">🌙</span> Dark`
    : `<span class="icon">☀️</span> Light`;
}

// Initial update
updateThemeButton();

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    updateThemeButton();
  });
}

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll(".reveal, .section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show", "visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

// ========== STICKY NAVBAR SHADOW ON SCROLL ==========
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// ========== ACTIVE LINK HIGHLIGHT ==========
const navLinks = document.querySelectorAll(".navbar a");

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
setActiveLink();

// ========== SMOOTH SCROLL (optional for internal links) ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      window.scrollTo({
        top: targetEl.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// ========== CONTACT FORM (basic client-side validation example) ==========
const contactForm = document.querySelector(".contact-page form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const inputs = contactForm.querySelectorAll("input, textarea");
    let valid = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        valid = false;
      } else {
        input.style.borderColor = "#2563eb";
      }
    });

    if (!valid) {
      e.preventDefault();
      alert("Please fill out all fields before submitting.");
    }
  });
}
