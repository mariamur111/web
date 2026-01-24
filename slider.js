document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    let scrollLeft = 0;
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    // --- Scroll con rueda ---
    window.addEventListener("wheel", e => {
      if (!isDragging) { // solo si no estás arrastrando
        scrollLeft += e.deltaY * 0.5; // velocidad
        slider.scrollLeft = scrollLeft;

        // loop infinito opcional
        if (scrollLeft >= slider.scrollWidth - slider.clientWidth) scrollLeft = 0;
        if (scrollLeft < 0) scrollLeft = slider.scrollWidth - slider.clientWidth;
      }
    });

    // --- Drag con mouse ---
    slider.addEventListener("mousedown", e => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("mouseup", () => {
      isDragging = false;
      scrollLeft = slider.scrollLeft; // actualiza scrollLeft
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", e => {
      if (!isDragging) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // velocidad arrastre
      slider.scrollLeft = startScroll - walk;
      scrollLeft = slider.scrollLeft; // sincroniza con scrollLeft
    });

    // --- Drag con touch (móvil) ---
    slider.addEventListener("touchstart", e => {
      isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchend", () => {
      isDragging = false;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", e => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = startScroll - walk;
      scrollLeft = slider.scrollLeft;
    });
  });
});

