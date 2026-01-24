document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    let scrollLeft = 0;
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;
    slider.isDragging = false; // para touch scroll

    // --- Scroll con rueda (desktop) ---
    window.addEventListener("wheel", e => {
      if (!slider.isDragging) { 
        scrollLeft += e.deltaY * 0.4; // velocidad
        slider.scrollLeft = scrollLeft;

        // loop infinito opcional
        if (scrollLeft >= slider.scrollWidth - slider.clientWidth) scrollLeft = 0;
        if (scrollLeft < 0) scrollLeft = slider.scrollWidth - slider.clientWidth;
      }
    });

    // --- Drag con mouse ---
    slider.addEventListener("mousedown", e => {
      isDragging = true;
      slider.isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("mouseup", () => {
      isDragging = false;
      slider.isDragging = false;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", e => {
      if (!isDragging) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = startScroll - walk;
      scrollLeft = slider.scrollLeft;
    });

    // --- Drag con touch (móvil) ---
    slider.addEventListener("touchstart", e => {
      isDragging = true;
      slider.isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      startScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchend", () => {
      isDragging = false;
      slider.isDragging = false;
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

  // --- Scroll-driven móvil (swipe vertical) ---
  let lastTouchY = 0;

  window.addEventListener("touchstart", e => {
    lastTouchY = e.touches[0].pageY;
  });

  window.addEventListener("touchmove", e => {
    const deltaY = e.touches[0].pageY - lastTouchY;
    lastTouchY = e.touches[0].pageY;

    sliders.forEach(slider => {
      if (!slider.isDragging) {
        slider.scrollLeft += deltaY * 0.4; // ajusta velocidad
        // loop infinito
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) slider.scrollLeft = 0;
        if (slider.scrollLeft < 0) slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
      }
    });
  });
});