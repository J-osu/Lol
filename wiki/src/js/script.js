// Inicializar iconos de Lucide (para los iconos de Dark Mode, Hamburguesa, Social Media, etc.)
        lucide.createIcons();

        // 1. Lógica del Menú de Navegación Responsive (Hamburguesa)
        const menuButton = document.getElementById('menu-button');
        const navList = document.getElementById('nav-list');
        const rootHtml = document.documentElement; // Para Dark Mode

        menuButton.addEventListener('click', () => {
            navList.classList.toggle('nav-menu__list--open');
            const icon = menuButton.querySelector('i');
            if (navList.classList.contains('nav-menu__list--open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // Recargar iconos después del cambio
        });
        
        // 2. Lógica del Botón Dark/Light Mode
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        // Función para aplicar o quitar la clase light-mode
        function toggleDarkMode(isLight) {
            if (isLight) {
                rootHtml.classList.add('light-mode');
                darkModeToggle.querySelector('i').setAttribute('data-lucide', 'moon');
            } else {
                rootHtml.classList.remove('light-mode');
                darkModeToggle.querySelector('i').setAttribute('data-lucide', 'sun-moon');
            }
            // Actualizar iconos
            lucide.createIcons();
            // Guardar preferencia en localStorage (simulado)
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        }

        // Cargar preferencia al inicio
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            toggleDarkMode(true);
        } else {
            toggleDarkMode(false); // Dark Mode por defecto
        }

        // Listener para el botón
        darkModeToggle.addEventListener('click', () => {
            const isLight = rootHtml.classList.contains('light-mode');
            toggleDarkMode(!isLight);
        });


        // 3. Lógica del Botón "Ir Arriba"
        const goUpButton = document.getElementById('go-up-button');

        window.addEventListener('scroll', () => {
            // Muestra el botón si el scroll es mayor a 500px
            if (window.scrollY > 500) {
                goUpButton.classList.add('go-up-button--visible');
            } else {
                goUpButton.classList.remove('go-up-button--visible');
            }
        });

        goUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // 4. Lógica del Carrusel de Imágenes
        let currentIndex = 0;
        const track = document.getElementById('carousel-track');
        const slides = Array.from(track.children);
        
        function getSlideCount() {
            // Define cuántos slides mostrar por vista basado en los media queries CSS
            if (window.innerWidth >= 1024) return 3; // Desktop
            if (window.innerWidth >= 640) return 2; // Tablet
            return 1; // Mobile
        }

        function updateCarousel() {
            const slideWidth = slides[0].offsetWidth; // Ancho de un solo slide
            const visibleSlides = getSlideCount();
            
            // Si el índice actual más el número de slides visibles excede el total,
            // reiniciamos el índice para no mostrar espacio en blanco.
            if (currentIndex > slides.length - visibleSlides) {
                currentIndex = 0;
            }
            if (currentIndex < 0) {
                 currentIndex = slides.length - visibleSlides;
            }

            const transformValue = -currentIndex * slideWidth;
            track.style.transform = `translateX(${transformValue}px)`;
        }

        function moveCarousel(direction) {
            const visibleSlides = getSlideCount();
            currentIndex += direction;
            
            // Loop Infinito (Simple)
            if (currentIndex > slides.length - visibleSlides) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = slides.length - visibleSlides;
            }

            updateCarousel();
        }

        // Inicializar y actualizar en resize
        window.addEventListener('resize', () => {
             // Forzamos la actualización del índice para evitar saltos al cambiar de breakpoint
             currentIndex = 0; 
             updateCarousel();
        });

        window.onload = updateCarousel; // Inicializar al cargar la página