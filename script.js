//Cambia el idioma de la página
document.addEventListener("DOMContentLoaded", function () {
  //Selecciona el contenedor principal del selector de idioma
  const select = document.querySelector(".language-btn-custom");
  //Selecciona el botón que muestra el idioma actualmente seleccionado
  const selected = select.querySelector(".language-btn-selected");
  //Selecciona el contenedor con las opciones de idioma
  const options = select.querySelector(".language-btn-options");
  //Idioma actual por defecto (español)
  let currentLang = "es";

  //Función para cambiar el idioma de los elementos en la página
  function switchLanguage(lang) {
    currentLang = lang;

    //Cambia el contenido de los elementos con atributos data-en, data-es, data-fr
    document.querySelectorAll("[data-en][data-es][data-fr]").forEach((el) => {
      el.innerHTML = el.getAttribute(`data-${lang}`);
    });

    //Cambia las etiquetas ARIA de accesibilidad si están definidas
    document
      .querySelectorAll(
        "[data-en-aria-label][data-es-aria-label][data-fr-aria-label]"
      )
      .forEach((el) => {
        el.setAttribute(
          "aria-label",
          el.getAttribute(`data-${lang}-aria-label`)
        );
      });

    //Guarda el idioma preferido en localStorage
    localStorage.setItem("preferredLanguage", lang);
  }

  //Alterna la visibilidad del menú de opciones al hacer clic en el botón principal
  selected.addEventListener("click", () => {
    options.style.display = options.style.display === "flex" ? "none" : "flex";
  });

  //Agrega eventos a cada opción de idioma
  options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.getAttribute("data-lang");

      //Cambia el ícono y el nombre del idioma mostrado en el botón principal
      selected.querySelector("img").src = option.querySelector("img").src;
      selected.querySelector("span").textContent = option.textContent.trim();

      //Cambia el idioma del sitio
      switchLanguage(lang);

      //Oculta el menú de opciones
      options.style.display = "none";
    });
  });

  //Cierra el menú si se hace clic fuera del selector
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      options.style.display = "none";
    }
  });

  //Carga el idioma previamente guardado (si existe)
  const savedLang = localStorage.getItem("preferredLanguage") || "es";
  const defaultOption = options.querySelector(`[data-lang="${savedLang}"]`);

  if (defaultOption) {
    //Cambia el ícono y texto del botón al idioma guardado
    selected.querySelector("img").src = defaultOption.querySelector("img").src;
    selected.querySelector("span").textContent =
      defaultOption.textContent.trim();

    //Aplica el idioma guardado a la página
    switchLanguage(savedLang);
  }
});

//Funcionalidad del FAQ (abrir y cerrar preguntas)
document.addEventListener("DOMContentLoaded", function () {
  //Selecciona todos los elementos con la clase "faq-item"
  const faqItems = document.querySelectorAll(".faq-item");

  //Recorre cada elemento FAQ
  faqItems.forEach((item) => {
    //Selecciona la pregunta dentro del FAQ item actual
    const question = item.querySelector(".faq-question");

    //Añade un evento de clic a la pregunta
    question.addEventListener("click", () => {
      //Cierra todos los demás items (quita la clase "active")
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      //Alterna (abre o cierra) el item actual agregando o quitando la clase "active"
      item.classList.toggle("active");
    });
  });
});

//Funcionalidad del FAQ (mostrar y ocultar respuestas)
document.addEventListener("DOMContentLoaded", function () {
  //Selecciona todos los elementos con clase "faq-item"
  const faqItems = document.querySelectorAll(".faq-item");

  //Recorre cada FAQ item
  faqItems.forEach((item) => {
    //Selecciona la pregunta y la respuesta dentro del item actual
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    //Estado inicial: respuesta oculta (altura 0 y opacidad 0)
    answer.style.maxHeight = "0px";
    answer.style.opacity = "0";

    //Añade evento de clic a la pregunta
    question.addEventListener("click", function () {
      //Comprueba si el item actual está activo (abierto)
      const isActive = item.classList.contains("active");

      //Cierra todos los otros items (quita clase active y oculta respuesta)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherItem.classList.remove("active");
          otherAnswer.style.maxHeight = "0px";
          otherAnswer.style.opacity = "0";
        }
      });
      //Alterna la visibilidad del item actual
      if (!isActive) {
        //Si no estaba activo, se abre (se añade clase active y se muestra respuesta)
        item.classList.add("active");
        //Altura automática según contenido
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
      } else {
        //Si estaba activo, se cierra (quita clase active y oculta respuesta)
        item.classList.remove("active");
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
      }

      //Actualiza atributo ARIA para accesibilidad (indica si está expandido o no)
      question.setAttribute("aria-expanded", !isActive);
    });
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    // Scroll Down
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // Scroll Up
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".feature-card, .stat-card, .testimonial-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-right-buttons");
let isMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  navLinks.classList.toggle("active");
  mobileMenuBtn.setAttribute("aria-expanded", isMenuOpen);
});

// Smooth Scroll with Mobile Menu
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      if (isMenuOpen) {
        isMenuOpen = false;
        navLinks.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", false);
      }
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Scroll Progress Indicator
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Back to Top Button
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Showcase Slider
const sliderTrack = document.querySelector(".showcase-slider-track");
const slides = document.querySelectorAll(".showcase-slider-slide");
const dots = document.querySelectorAll(".showcase-slider-dot");
const prevBtn = document.querySelector(".showcase-slider-prev");
const nextBtn = document.querySelector(".showcase-slider-next");
let currentSlide = 0;
let slideInterval;

function updateSlider() {
  // Update active states
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
      slide.style.transform = "translateX(0)";
    } else {
      slide.classList.remove("active");
      slide.style.transform = `translateX(${
        index < currentSlide ? "-100%" : "100%"
      })`;
    }
  });

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

// Event Listeners
prevBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
    resetInterval();
  });
});

// Auto-play functionality
function startInterval() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Initialize slider
updateSlider();
startInterval();

// Pause on hover
const sliderContainer = document.querySelector(".showcase-slider");
sliderContainer.addEventListener("mouseenter", () =>
  clearInterval(slideInterval)
);
sliderContainer.addEventListener("mouseleave", startInterval);

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    resetInterval();
  }
}

// FAQ Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize FAQ items
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // Set initial state
    answer.style.maxHeight = "0px";
    answer.style.opacity = "0";

    // Add click event
    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherItem.classList.remove("active");
          otherAnswer.style.maxHeight = "0px";
          otherAnswer.style.opacity = "0";
        }
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
      }

      // Update ARIA
      question.setAttribute("aria-expanded", !isActive);
    });

    // Add keyboard support
    question.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
});

// Fade-in on scroll for sections
const fadeInSections = document.querySelectorAll(".fade-in-section");
const fadeInObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

fadeInSections.forEach((section) => {
  fadeInObserver.observe(section);
});
