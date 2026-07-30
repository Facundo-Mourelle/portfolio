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
  const carousels = document.querySelectorAll('.strip-carousel');

  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicators = carousel.querySelector('.carousel-indicators');
    const dots = carousel.querySelectorAll('.dot');

    const totalSlides = slides.length;

    if (totalSlides <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (indicators) indicators.style.display = 'none';
      return;
    }

    let currentIndex = 0;

    function updateCarousel() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

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

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          currentIndex = (currentIndex + 1) % totalSlides;
        } else {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateCarousel();
      }
    }, { passive: true });

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

    updateCarousel();
  });
}

initCarousel();

function initCertCarousel() {
  const grid = document.querySelector('.certificates-grid');
  const prevBtn = document.getElementById('certPrev');
  const nextBtn = document.getElementById('certNext');
  const dotsContainer = document.getElementById('certDots');
  const boxes = document.querySelectorAll('.cert-box');
  if (!grid || !boxes.length) return;

  const dots = [];
  boxes.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      boxes[i].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function updateDots() {
    const scrollLeft = grid.scrollLeft;
    const boxWidth = boxes[0].offsetWidth + parseFloat(getComputedStyle(grid).gap) || 1;
    const idx = Math.round(scrollLeft / boxWidth);
    const clamped = Math.max(0, Math.min(idx, dots.length - 1));
    dots.forEach((d, i) => d.classList.toggle('active', i === clamped));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const boxWidth = boxes[0].offsetWidth + parseFloat(getComputedStyle(grid).gap) || 1;
      grid.scrollBy({ left: -boxWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const boxWidth = boxes[0].offsetWidth + parseFloat(getComputedStyle(grid).gap) || 1;
      grid.scrollBy({ left: boxWidth, behavior: 'smooth' });
    });
  }

  grid.addEventListener('scroll', updateDots);
}

initCertCarousel();

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

document.querySelectorAll(".project-strip").forEach(strip => {
  const link = strip.querySelector(".project-link");
  if (!link) return;
  strip.addEventListener("click", e => {
    if (e.target.closest(".carousel-control, .dot, .project-link")) return;
    window.location.href = link.href;
  });
});
