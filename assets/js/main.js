/**
 * Premium Portfolio - Advanced JavaScript
 * Hochwertige Animationen & Interaktionen
 */

(function() {
    'use strict';

    // =====================================
    // DARK/LIGHT MODE THEME TOGGLE
    // =====================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-toggle-icon');
    const html = document.documentElement;

    // Check for saved theme preference or default to system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            html.removeAttribute('data-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
        localStorage.setItem('theme', theme);
    }

    // Initialize theme on page load
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // =====================================
    // HAMBURGER MENU TOGGLE (mit Focus-Trap & A11y)
    // =====================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    let lastFocusedBeforeMenu = null;

    function focusableItems() {
        if (!navMenu) return [];
        return Array.from(navMenu.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.hasAttribute('hidden'));
    }

    function openMenu() {
        if (!navMenu) return;
        lastFocusedBeforeMenu = document.activeElement;
        menuToggle?.classList.add('active');
        menuToggle?.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('active');
        menuOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Erstes Link fokussieren
        const items = focusableItems();
        if (items.length) items[0].focus();
    }

    function closeMenu() {
        menuToggle?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
        navMenu?.classList.remove('active');
        menuOverlay?.classList.remove('active');
        document.body.style.overflow = '';
        // Fokus zurück auf den Toggle-Button
        if (lastFocusedBeforeMenu && document.contains(lastFocusedBeforeMenu)) {
            lastFocusedBeforeMenu.focus();
        } else {
            menuToggle?.focus();
        }
    }

    function toggleMenu() {
        const isOpen = navMenu?.classList.contains('active');
        if (isOpen) closeMenu(); else openMenu();
    }

    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        if (navMenu?.id) menuToggle.setAttribute('aria-controls', navMenu.id);
        menuToggle.addEventListener('click', toggleMenu);
    }

    menuOverlay?.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href')?.startsWith('#')) closeMenu();
        });
    });

    // ESC schließt, Tab hält den Fokus innerhalb des Menüs
    document.addEventListener('keydown', (e) => {
        if (!navMenu?.classList.contains('active')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeMenu();
            return;
        }
        if (e.key === 'Tab') {
            const items = focusableItems();
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;
            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // =====================================
    // SCROLL PROGRESS BAR + NAVBAR SCROLL
    // =====================================
    const scrollProgress = document.querySelector('.scroll-progress');
    const navbar = document.querySelector('.navbar');
    let scrollTicking = false;

    function onScroll() {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const y = window.scrollY;
        if (scrollProgress && docHeight > 0) {
            scrollProgress.style.width = ((y / docHeight) * 100) + '%';
        }
        if (navbar) {
            navbar.classList.toggle('scrolled', y > 100);
        }
        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(onScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    // Smooth-Scroll wird von premium.js (Lenis) übernommen, mit Fallback
    // auf CSS `scroll-behavior: smooth` wenn Lenis nicht verfügbar ist.

    // =====================================
    // INTERSECTION OBSERVER - REVEAL ANIMATIONS
    // =====================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // =====================================
    // PARTICLE SYSTEM
    // =====================================
    class ParticleSystem {
        constructor() {
            this.canvas = document.getElementById('particles-canvas');
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.particleCount = window.innerWidth < 768 ? 30 : 50;
            this.mouse = { x: null, y: null, radius: 150 };
            this.hasHover = window.matchMedia('(hover: hover)').matches;
            this.paused = false;
            this.rafId = null;

            this.init();
            this.animate();
            this.setupEventListeners();
        }

        init() {
            this.resize();
            this.createParticles();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push(new Particle(this.canvas));
            }
        }

        animate() {
            if (this.paused) return;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach(p => { p.update(this.mouse); p.draw(this.ctx); });
            this.drawConnections();
            this.rafId = requestAnimationFrame(() => this.animate());
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const opacity = 1 - (distance / 120);
                        this.ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.2})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }

        setupEventListeners() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });

            // Mouse-Interaktion nur auf Hover-fähigen Geräten (spart CPU auf Touch)
            if (this.hasHover) {
                window.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.x;
                    this.mouse.y = e.y;
                }, { passive: true });
                window.addEventListener('mouseout', () => {
                    this.mouse.x = null;
                    this.mouse.y = null;
                });
            }

            // Pausiert Animation bei inaktivem Tab
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.paused = true;
                    if (this.rafId) cancelAnimationFrame(this.rafId);
                } else if (this.paused) {
                    this.paused = false;
                    this.animate();
                }
            });
        }
    }

    // =====================================
    // PARTICLE CLASS
    // =====================================
    class Particle {
        constructor(canvas) {
            this.canvas = canvas;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        update(mouse) {
            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            } else {
                if (this.x !== this.baseX) {
                    const dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    const dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            // Drift movement
            this.baseX += this.speedX;
            this.baseY += this.speedY;

            // Wrap around screen
            if (this.baseX < 0) this.baseX = this.canvas.width;
            if (this.baseX > this.canvas.width) this.baseX = 0;
            if (this.baseY < 0) this.baseY = this.canvas.height;
            if (this.baseY > this.canvas.height) this.baseY = 0;
        }

        draw(ctx) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.4)'; // Signal Red
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Initialize Particle System
    new ParticleSystem();

    // =====================================
    // 3D CARD TILT EFFECT (Reduced)
    // =====================================
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 40;  // Reduziert von 15 auf 40
            const rotateY = (centerX - x) / 40;  // Reduziert von 15 auf 40

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;  // Reduziert von -15px auf -5px
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Stats-Counter läuft jetzt in premium.js (anime.js-basiert mit easing).
    // Fallback: wenn premium.js/anime nicht verfügbar, bleiben die Zahlen statisch.
    function hasAnimeCounter() {
        return typeof window.anime !== 'undefined';
    }
    if (!hasAnimeCounter()) {
        // Minimaler Fallback ohne easing
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                statsObserver.unobserve(entry.target);
                const el = entry.target.querySelector('.stat-number');
                if (!el) return;
                const raw = el.textContent.trim();
                const hasPercent = raw.includes('%');
                const target = parseInt(raw, 10);
                if (isNaN(target)) return;
                let current = 0;
                const step = Math.max(1, Math.floor(target / 60));
                el.textContent = hasPercent ? '0%' : '0';
                const t = setInterval(() => {
                    current = Math.min(target, current + step);
                    el.textContent = current + (hasPercent ? '%' : '');
                    if (current >= target) clearInterval(t);
                }, 30);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));
    }

    // =====================================
    // PARALLAX EFFECT FOR HERO
    // =====================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // =====================================
    // BUTTON RIPPLE EFFECT
    // =====================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // =====================================
    // LAZY LOADING ENHANCEMENT
    // =====================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 10);
            });
        });
    }

    // =====================================
    // KEYBOARD NAVIGATION
    // =====================================
    // ESC key handling is in the menu toggle section

    // =====================================
    // LOADING COMPLETE
    // =====================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

})();

// =====================================
// CSS ANIMATION FOR RIPPLE
// =====================================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
