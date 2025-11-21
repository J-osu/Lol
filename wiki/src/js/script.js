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
                
                function getItemsPerView() {
                    const width = container.offsetWidth;
                    if (width >= 1024) return 3;
                    if (width >= 640) return 2;
                    return 1;
                }


                function moveToSlide(index) {
                    const itemsPerView = getItemsPerView();
                    let maxIndex = items.length - itemsPerView;

                    if (index > maxIndex) {
                        index = maxIndex;
                    }
                    if (index < 0) {
                        index = 0;
                    }

                    currentIndex = index;

                    const itemWidth = container.offsetWidth / itemsPerView;
                    const offset = currentIndex * itemWidth * itemsPerView;
                    
                    track.style.transform = 'translateX(-' + offset + 'px)';
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex >= maxIndex;
                }

                nextButton.addEventListener('click', () => {
                    const itemsPerView = getItemsPerView();
                    moveToSlide(currentIndex + 1);
                });
                prevButton.addEventListener('click', () => {
                    moveToSlide(currentIndex - 1);
                });
                
                window.addEventListener('resize', () => moveToSlide(currentIndex));
                setTimeout(() => moveToSlide(0), 100);
            }
        });