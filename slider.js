document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    // --- Drag con mouse ---
    slider.addEventListener("mousedown", e => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("mouseup", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // velocidad arrastre
      slider.scrollLeft = startScroll - walk;
    });

    // --- Drag con touch (móvil) ---
    slider.addEventListener("touchstart", e => {
      isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchend", () => {
      isDragging = false;
    });

    slider.addEventListener("touchmove", e => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = startScroll - walk;
    });

    // --- Flechas del teclado ---
    window.addEventListener("keydown", e => {
      if (document.activeElement !== slider && !slider.matches(":hover")) return;

      const step = slider.clientWidth * 0.2; // cuánto avanza por tecla

      if (e.key === "ArrowRight") {
        slider.scrollLeft += step;
      }

      if (e.key === "ArrowLeft") {
        slider.scrollLeft -= step;
      }
    });
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const slider = entry.target;
      slider.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-30px)" },
          { transform: "translateX(0)" }
        ],
        { duration: 1400, easing: "ease-out" }
      );
      observer.unobserve(slider);
    }
  });
});

document.querySelectorAll(".slider").forEach(slider => observer.observe(slider));
