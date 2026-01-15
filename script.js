// SKP GDC Website Scripts

document.addEventListener('DOMContentLoaded', function () {

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(() => preloader.classList.add('hidden'), 1000);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Active nav highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*="' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*="' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);

    // Back to top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    // Counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function animateCounters() {
        if (counted) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        if (heroStats.getBoundingClientRect().top < window.innerHeight) {
            counted = true;
            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                };
                update();
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });

    // Image slider
    const sliderWrapper = document.getElementById('sliderWrapper');
    const slides = document.querySelectorAll('.slide');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let slideInterval;
    const totalSlides = slides.length;

    function goToSlide(index) {
        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }
    function startAutoSlide() { slideInterval = setInterval(nextSlide, 4000); }
    function stopAutoSlide() { clearInterval(slideInterval); }

    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    if (slides.length > 0) {
        goToSlide(0);
        startAutoSlide();
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Scroll reveal
    const revealElements = document.querySelectorAll('.section-header, .quick-link-card, .course-card, .dept-category, .infra-card, .accred-card, .support-card, .gallery-item, .news-card, .vm-card');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function revealOnScroll() {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !subject || !message) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    function showNotification(msg, type) {
        const div = document.createElement('div');
        div.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> <span>${msg}</span>`;
        Object.assign(div.style, {
            position: 'fixed', top: '100px', right: '30px',
            padding: '20px 30px', background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white', borderRadius: '12px', display: 'flex',
            alignItems: 'center', gap: '12px', fontSize: '15px',
            fontWeight: '500', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '9999', transform: 'translateX(120%)', transition: 'transform 0.4s ease'
        });
        document.body.appendChild(div);
        setTimeout(() => div.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            div.style.transform = 'translateX(120%)';
            setTimeout(() => div.remove(), 400);
        }, 4000);
    }

    // Particles
    const particles = document.getElementById('particles');
    if (particles) {
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 5 + 2;
            Object.assign(p.style, {
                position: 'absolute',
                width: size + 'px', height: size + 'px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `floatParticle ${Math.random() * 20 + 10}s linear infinite`,
                animationDelay: Math.random() * 5 + 's'
            });
            particles.appendChild(p);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0); opacity: 0.3; }
                50% { transform: translate(-10px, -50px); opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }

    // Mobile dropdown
    document.querySelectorAll('.nav-item.dropdown').forEach(item => {
        item.querySelector('.nav-link').addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                item.classList.toggle('show');
            }
        });
    });

});
