import { loadTranslations, translateDOM, getCurrentLang } from "./i18n.js";
import './style.css';

loadTranslations(getCurrentLang());
translateDOM();

const langBtn = document.getElementById("lang-toggle");

if (langBtn) {
  langBtn.addEventListener("click", () => {
    const newLang = getCurrentLang() === "en" ? "es" : "en";
    loadTranslations(newLang);
    translateDOM();
  });
}

function initCarousel() {
  const carousels = document.querySelectorAll(".strip-carousel");
  carousels.forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prev = carousel.querySelector(".carousel-control.prev");
    const next = carousel.querySelector(".carousel-control.next");
    const dots = carousel.querySelectorAll(".dot");
    let currentIndex = 0;
    const total = slides.length;

    if (total <= 1) {
      if (prev) prev.style.display = "none";
      if (next) next.style.display = "none";
      dots.forEach((d) => (d.style.display = "none"));
      return;
    }

    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }

    if (prev) {
      prev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + total) % total;
        updateCarousel();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % total;
        updateCarousel();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
    });

    let startX = 0;
    carousel.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].screenX;
    });
    carousel.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          currentIndex = (currentIndex + 1) % total;
        } else {
          currentIndex = (currentIndex - 1 + total) % total;
        }
        updateCarousel();
      }
    });

    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + total) % total;
        updateCarousel();
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % total;
        updateCarousel();
      }
    });
    carousel.setAttribute("tabindex", "0");
  });
}

initCarousel();

function revealOnScroll() {
  const strips = document.querySelectorAll(".project-strip");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  strips.forEach((strip) => {
    strip.style.opacity = "0";
    strip.style.transform = "translateY(30px)";
    strip.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(strip);
  });
}

revealOnScroll();

// 3. Inicializar carruseles
function initCarousel() {
  const carousels = document.querySelectorAll('.strip-carousel');

  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicators = carousel.querySelector('.carousel-indicators');
    const dots = carousel.querySelectorAll('.dot');

    const totalSlides = slides.length;

    // Si solo hay 1 slide, ocultar controles e indicadores
    if (totalSlides <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (indicators) indicators.style.display = 'none';
      return;
    }

    let currentIndex = 0;

    // Actualizar carrusel: transform + dots active
    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // Navegación prev
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }

    // Navegación next
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      });
    }

    // Click en dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchStartY = 0;

    inner.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    inner.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Detectar swipe horizontal (> 50px) e ignorar vertical
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          // Swipe left -> next
          currentIndex = (currentIndex + 1) % totalSlides;
        } else {
          // Swipe right -> prev
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateCarousel();
      }
    }, { passive: true });

    // Keyboard navigation: hacer el carrusel focusable y escuchar keydown en él
    carousel.setAttribute('tabindex', '0');

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        } else {
          currentIndex = (currentIndex + 1) % totalSlides;
        }
        updateCarousel();
      }
    });

    // Inicializar
    updateCarousel();
  });
}

// Inicializar carruseles al cargar
initCarousel();