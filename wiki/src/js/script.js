 document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');

            if (menuToggle && mobileMenu) {
                menuToggle.addEventListener('click', function() {
                    mobileMenu.classList.toggle('is-hidden');
                });
            }

            // --- Funcionalidad del Carrusel ---
            const track = document.getElementById('carousel-track');
            const prevButton = document.getElementById('prev-button');
            const nextButton = document.getElementById('next-button');
            const items = Array.from(track.children);
            const container = track.parentElement;
            let currentIndex = 0;

            if (track && prevButton && nextButton && items.length > 0) {
                
                // Función para obtener cuántos ítems son visibles a la vez
                function getItemsPerView() {
                    const width = container.offsetWidth;
                    if (width >= 1024) return 3;
                    if (width >= 640) return 2;
                    return 1;
                }

                // Función para mover el carrusel
                function moveToSlide(index) {
                    const itemsPerView = getItemsPerView();
                    let maxIndex = items.length - itemsPerView;

                    // Ajustar el índice para no mostrar espacio vacío al final
                    if (index > maxIndex) {
                        index = maxIndex;
                    }
                    if (index < 0) {
                        index = 0;
                    }

                    currentIndex = index;

                    // Calculamos el desplazamiento porcentual
                    // Cada item ocupa (100 / itemsPerView)% del ancho total del track
                    // El desplazamiento es (currentIndex) * (100 / itemsPerView)
                    
                    // Mejor método: usar el ancho del contenedor ya que el CSS maneja el ancho del item
                    const itemWidth = container.offsetWidth / itemsPerView;
                    const offset = currentIndex * itemWidth * itemsPerView;
                    
                    track.style.transform = 'translateX(-' + offset + 'px)';
                    
                    // Actualizar estado de los botones (opcional, pero buena práctica)
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex >= maxIndex;
                }

                // Mover al siguiente elemento
                nextButton.addEventListener('click', () => {
                    const itemsPerView = getItemsPerView();
                    moveToSlide(currentIndex + 1);
                });

                // Mover al elemento anterior
                prevButton.addEventListener('click', () => {
                    moveToSlide(currentIndex - 1);
                });
                
                // Inicializar en la primera posición y manejar redimensionamiento
                window.addEventListener('resize', () => moveToSlide(currentIndex));
                
                // Forzar el redibujo y la inicialización al cargar
                setTimeout(() => moveToSlide(0), 100);
            }
        });