document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Video play function
        function playVideo() {
            alert('Aquí se reproduciría el video del producto. Puedes integrar YouTube, Vimeo o un reproductor personalizado.');
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
        });
        
        // Interactive diagram effect
        const measurementDiagram = document.querySelector('.measurement-diagram');
        let isMouseInside = false;
        
        measurementDiagram.addEventListener('mouseenter', function() {
            isMouseInside = true;
            this.innerHTML = '<i class="fas fa-search-plus" style="font-size: 4rem; color: #e74c3c;"></i>';
            this.style.background = '#f1f8ff';
            this.style.borderColor = '#e74c3c';
        });
        
        measurementDiagram.addEventListener('mouseleave', function() {
            isMouseInside = false;
            this.innerHTML = '<i class="fas fa-ruler" style="font-size: 4rem; color: #ccc;"></i>';
            this.style.background = '#f8f9fa';
            this.style.borderColor = '#e0e0e0';
        });
        
        // Product card interactions
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productName = this.querySelector('h3').textContent;
                alert(`Navegando a: ${productName}`);
                // Aquí puedes redirigir a otras páginas de productos
            });
        });