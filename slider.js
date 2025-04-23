document.addEventListener('DOMContentLoaded', function() {
    // Selecciona TODOS los sliders en la página
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Cambia el cursor al estilo "agarrar"
        slider.style.cursor = 'grab';
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) ; // Ajusta la velocidad de arrastre
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Deshabilita el arrastre de imágenes para mejor experiencia
        const images = slider.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        });
    });
});
