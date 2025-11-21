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

            // --- Funcionalidad de Modo Oscuro/Claro (Añadido) ---
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.querySelector('body');

            if (themeToggle && body) {
                
                function updateTheme(isLightMode) {
                    const icon = themeToggle.querySelector('.b-theme-toggle__icon');
                    if (isLightMode) {
                        body.classList.add('modo-claro');
                        icon.textContent = '🌙'; // Luna para cambiar a oscuro
                        themeToggle.setAttribute('aria-label', 'Cambiar a Modo Oscuro');
                    } else {
                        body.classList.remove('modo-claro');
                        icon.textContent = '☀️'; // Sol para cambiar a claro
                        themeToggle.setAttribute('aria-label', 'Cambiar a Modo Claro');
                    }
                    // Guardar la preferencia
                    localStorage.setItem('theme', isLightMode ? 'claro' : 'oscuro');
                }

                // 1. Cargar la preferencia al inicio
                const savedTheme = localStorage.getItem('theme');
                const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

                // Si no hay preferencia guardada, usar la preferencia del sistema
                if (savedTheme === 'claro' || (!savedTheme && prefersLight)) {
                    updateTheme(true);
                } else {
                    updateTheme(false);
                }

                // 2. Manejar el click del botón
                themeToggle.addEventListener('click', () => {
                    const isLightMode = body.classList.contains('modo-claro');
                    updateTheme(!isLightMode);
                });
            }
        });

        