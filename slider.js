document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

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
    });

    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // velocidad drag desktop
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
      const walk = (x - startX) * 1.2; // velocidad drag móvil
      slider.scrollLeft = startScroll - walk;
    }, { passive: true });
  });
});
