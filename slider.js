/*document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  // --- Función para animar scroll suavemente ---
  function animateScroll(slider, start, end, duration = 300) {
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      slider.scrollLeft = start + (end - start) * progress;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  sliders.forEach(slider => {
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    // --- Mouse ---
    slider.addEventListener("mousedown", e => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("mouseup", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });Ç

    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = startScroll - walk;
    });

    // --- Touch (móvil) ---
    slider.addEventListener("touchstart", e => {
      isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
    }, { passive: true });

    slider.addEventListener("touchend", () => {
      isDragging = false;
    });

    slider.addEventListener("touchmove", e => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = startScroll - walk;
    }, { passive: true });

    // --- Mini nudge solo cuando entra en pantalla ---
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const firstImg = slider.querySelector("img");
          if (firstImg && firstImg.complete) {
            // si ya cargó la imagen
            const start = slider.scrollLeft;
            const end = start + 80;
            animateScroll(slider, start, end, 600);
            setTimeout(() => {
              animateScroll(slider, slider.scrollLeft, start, 600);
            }, 900);
          } else if (firstImg) {
            // si la imagen aún no cargó, espera
            firstImg.addEventListener("load", () => {
              const start = slider.scrollLeft;
              const end = start + 80;
              animateScroll(slider, start, end, 600);
              setTimeout(() => {
                animateScroll(slider, slider.scrollLeft, start, 600);
              }, 900);
            });
          }

          observer.unobserve(slider); // solo lo hacemos una vez
        }
      });
    }, { threshold: 0.5 }); // 50% del slider visible

    observer.observe(slider);
  });
});*/
