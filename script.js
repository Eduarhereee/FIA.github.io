document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMACIONES FADE-IN Y SLIDE-UP ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));

    // --- HEADER TRANSPARENTE ON SCROLL ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // --- HERO SLIDER AUTOMÁTICO ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    const slideInterval = 3000;

    function nextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        let sliderTimer = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(sliderTimer);
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                sliderTimer = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // --- MENÚ LATERAL ---
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    if (openSidebarBtn && sidebar && closeSidebarBtn) {
        openSidebarBtn.addEventListener('click', () => { sidebar.classList.add('active'); });
        closeSidebarBtn.addEventListener('click', () => { sidebar.classList.remove('active'); });
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', () => { sidebar.classList.remove('active'); });
        });
    }

    // --- EMAILJS - ENVÍO DE FORMULARIO ---
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('success-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-orange-full');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;

            const parms = {
                name:    document.getElementById('name').value,
                email:   document.getElementById('email').value,
                tel:     document.getElementById('tel').value,
                message: document.getElementById('message').value,
            };

            emailjs.send('service_iuk6bs6', 'template_dxj04qv', parms)
                .then(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    if (successAlert) successAlert.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => { if (successAlert) successAlert.style.display = 'none'; }, 6000);
                })
                .catch((error) => {
                    console.error('Error de EmailJS:', error);
                    alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
