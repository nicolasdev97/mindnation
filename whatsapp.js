/* <----------------------------------------------> Detects when an element enters the viewport to apply an animation <----------------------------------------------> */

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

document
  .querySelectorAll(".feature-card, .stat-card, .testimonial-card")
  .forEach((el) => {
    observer.observe(el);
  });

/* <----------------------------------------------> Page language <----------------------------------------------> */

// document.addEventListener("DOMContentLoaded", function () {
//   const select = document.querySelector(".language-btn-custom");
//   const selected = select.querySelector(".language-btn-selected");
//   const options = select.querySelector(".language-btn-options");
//   let currentLang = "es";

//   function switchLanguage(lang) {
//     currentLang = lang;

//     document.querySelectorAll("[data-en][data-es]").forEach((el) => {
//       el.innerHTML = el.getAttribute(`data-${lang}`);
//     });

//     document
//       .querySelectorAll("[data-en-aria-label][data-es-aria-label]")
//       .forEach((el) => {
//         el.setAttribute(
//           "aria-label",
//           el.getAttribute(`data-${lang}-aria-label`)
//         );
//       });

//     localStorage.setItem("preferredLanguage", lang);
//   }

//   selected.addEventListener("click", () => {
//     options.style.display = options.style.display === "flex" ? "none" : "flex";
//   });

//   options.querySelectorAll("li").forEach((option) => {
//     option.addEventListener("click", () => {
//       const lang = option.getAttribute("data-lang");

//       selected.querySelector("img").src = option.querySelector("img").src;
//       selected.querySelector("span").textContent = option.textContent.trim();

//       switchLanguage(lang);

//       options.style.display = "none";
//     });
//   });

//   document.addEventListener("click", (e) => {
//     if (!select.contains(e.target)) {
//       options.style.display = "none";
//     }
//   });

//   const savedLang = localStorage.getItem("preferredLanguage") || "es";
//   const defaultOption = options.querySelector(`[data-lang="${savedLang}"]`);

//   if (defaultOption) {
//     selected.querySelector("img").src = defaultOption.querySelector("img").src;
//     selected.querySelector("span").textContent =
//       defaultOption.textContent.trim();

//     switchLanguage(savedLang);
//   }
// });

/* <----------------------------------------------> Open or close the mobile menu by clicking the menu button <----------------------------------------------> */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-right-buttons");
let isMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  navLinks.classList.toggle("active");
  mobileMenuBtn.setAttribute("aria-expanded", isMenuOpen);
});

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

/* <----------------------------------------------> Displays a floating button to return to the top of the page <----------------------------------------------> */

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.innerHTML =
  '<i class="fas fa-arrow-up"></i><span class="back-to-top-tooltip" data-en="Back to top" data-es="Volver arriba">Back to top</span>';
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

/* <----------------------------------------------> Displays a floating button that sends a message <----------------------------------------------> */

const whatsAppMessage = document.createElement("button");
whatsAppMessage.className = "whatsapp-message";
whatsAppMessage.innerHTML =
  '<i class="fa-brands fa-whatsapp"></i><span class="whatsapp-tooltip" data-en="Chat with us on WhatsApp" data-es="Chatea con nosotros por WhatsApp">Chat with us on WhatsApp</span>';
document.body.appendChild(whatsAppMessage);

whatsAppMessage.addEventListener("click", () => {
  const phone = "573246139623";
  const message =
    "Hello Mindnation! I am interested in learning more about your services.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

/* <----------------------------------------------> Slider controller <----------------------------------------------> */

const sliderTrack = document.querySelector(".showcase-slider-track");
const slides = document.querySelectorAll(".showcase-slider-slide");
const dots = document.querySelectorAll(".showcase-slider-dot");
const prevBtn = document.querySelector(".showcase-slider-prev");
const nextBtn = document.querySelector(".showcase-slider-next");
let currentSlide = 0;
let slideInterval;

function updateSlider() {
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

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

updateSlider();
startInterval();

const sliderContainer = document.querySelector(".showcase-slider");
sliderContainer.addEventListener("mouseenter", () =>
  clearInterval(slideInterval)
);
sliderContainer.addEventListener("mouseleave", startInterval);

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

/* <----------------------------------------------> FAQ Functionality <----------------------------------------------> */

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });
});

/* <----------------------------------------------> FAQ Functionality <----------------------------------------------> */

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    answer.style.maxHeight = "0px";
    answer.style.opacity = "0";

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherItem.classList.remove("active");
          otherAnswer.style.maxHeight = "0px";
          otherAnswer.style.opacity = "0";
        }
      });
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
      }

      question.setAttribute("aria-expanded", !isActive);
    });
  });
});

/* <----------------------------------------------> FAQ Functionality <----------------------------------------------> */

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    answer.style.maxHeight = "0px";
    answer.style.opacity = "0";

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherItem.classList.remove("active");
          otherAnswer.style.maxHeight = "0px";
          otherAnswer.style.opacity = "0";
        }
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
      }

      question.setAttribute("aria-expanded", !isActive);
    });

    question.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
});
