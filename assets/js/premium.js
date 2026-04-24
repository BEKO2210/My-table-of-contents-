/**
 * Premium Layer v2 — Obsidian × Violet
 * Läuft NACH main.js (defer-order). Nutzt Lenis, anime, Splitting
 * wenn verfügbar. Alle Features degradieren graceful auf no-op.
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    window.__premium = { reduceMotion, hasHover, ready: false };
    document.documentElement.classList.add('premium-ready');

    // FOUC-Safety: falls 'load' hängt
    setTimeout(() => document.body?.classList.add('loaded'), 2000);

    // =============================================================
    // LENIS SMOOTH-SCROLL
    // Awwwards-Staple. Minimaler Setup, integriert mit Anchor-Links.
    // =============================================================
    let lenis = null;
    function initLenis() {
        if (reduceMotion || typeof Lenis === 'undefined') return;
        lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // out-expo
            smoothWheel: true,
            smoothTouch: false, // Touch bleibt nativ – fühlt sich besser an
            wheelMultiplier: 1,
            touchMultiplier: 1.6
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);

        // Anchor-Integration: Lenis.scrollTo statt nativem smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                lenis.scrollTo(target, { offset: -80, duration: 1.2 });
            });
        });

        window.__premium.lenis = lenis;
    }

    // =============================================================
    // MAGNETIC CUSTOM CURSOR (Desktop only)
    // =============================================================
    function initCursor() {
        if (!hasHover || reduceMotion) return;

        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        const state = {
            mx: window.innerWidth / 2, my: window.innerHeight / 2,
            dx: window.innerWidth / 2, dy: window.innerHeight / 2,
            rx: window.innerWidth / 2, ry: window.innerHeight / 2
        };

        window.addEventListener('pointermove', (e) => {
            state.mx = e.clientX;
            state.my = e.clientY;
            if (!document.body.classList.contains('cursor-ready')) {
                document.body.classList.add('cursor-ready');
            }
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            document.body.classList.remove('cursor-ready');
        });

        window.addEventListener('pointerdown', () => document.body.classList.add('cursor-press'));
        window.addEventListener('pointerup',   () => document.body.classList.remove('cursor-press'));

        // Hover-Erkennung für interaktive Targets
        const interactiveSel = 'a, button, [role="button"], input, textarea, select, .project-card, .magnetic, .tag';
        document.addEventListener('pointerover', (e) => {
            if (e.target.closest(interactiveSel)) document.body.classList.add('cursor-hover');
        });
        document.addEventListener('pointerout', (e) => {
            if (e.target.closest(interactiveSel) && !e.relatedTarget?.closest(interactiveSel)) {
                document.body.classList.remove('cursor-hover');
            }
        });

        function tick() {
            // Dot folgt 1:1 (schnell), Ring lagt sanft hinterher
            state.dx += (state.mx - state.dx) * 0.55;
            state.dy += (state.my - state.dy) * 0.55;
            state.rx += (state.mx - state.rx) * 0.18;
            state.ry += (state.my - state.ry) * 0.18;
            dot.style.transform  = `translate3d(${state.dx}px, ${state.dy}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${state.rx}px, ${state.ry}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        }
        tick();
    }

    // =============================================================
    // MAGNETIC HOVER für .magnetic-Elemente
    // Zieht das Element leicht zum Mauszeiger – klassischer Award-FX.
    // =============================================================
    function initMagnetic() {
        if (!hasHover || reduceMotion) return;
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach(el => {
            const strength = parseFloat(el.dataset.magnetic || '0.35');
            const maxPull = parseFloat(el.dataset.magneticMax || '18');

            function move(e) {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                let dx = (e.clientX - cx) * strength;
                let dy = (e.clientY - cy) * strength;
                // Clamp
                dx = Math.max(-maxPull, Math.min(maxPull, dx));
                dy = Math.max(-maxPull, Math.min(maxPull, dy));
                el.style.setProperty('--mx', `${dx}px`);
                el.style.setProperty('--my', `${dy}px`);
            }
            function reset() {
                el.style.setProperty('--mx', `0px`);
                el.style.setProperty('--my', `0px`);
            }
            el.addEventListener('pointermove', move);
            el.addEventListener('pointerleave', reset);
        });
    }

    // =============================================================
    // SCROLL-TRIGGERED REVEAL (.reveal-stagger)
    // IntersectionObserver, stagger über --stagger-index
    // =============================================================
    function initRevealStagger() {
        if (reduceMotion || !('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal-stagger').forEach(el => el.classList.add('in-view'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in-view');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        // Grid-Kinder automatisch mit --stagger-index versehen
        document.querySelectorAll('.projects-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                if (child.classList.contains('reveal') || child.classList.contains('project-card')) {
                    child.classList.add('reveal-stagger');
                    child.style.setProperty('--stagger-index', i % 8);
                }
            });
        });
        document.querySelectorAll('.reveal-stagger').forEach(el => io.observe(el));
    }

    // =============================================================
    // VIEW TRANSITIONS API — Opt-in für Theme-Toggle (nativ, zero-cost)
    // =============================================================
    function wrapThemeToggleWithViewTransition() {
        if (!document.startViewTransition) return;
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', (e) => {
            if (toggle.__vtRunning) return;
            toggle.__vtRunning = true;
            // Hijackt Event — main.js's Listener wird NICHT aufgerufen
            e.stopImmediatePropagation();
            e.preventDefault();
            document.startViewTransition(() => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
                else document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', next);
                const icon = toggle.querySelector('.theme-toggle-icon');
                if (icon) {
                    icon.classList.toggle('fa-moon', next === 'light');
                    icon.classList.toggle('fa-sun', next === 'dark');
                }
            }).finished.finally(() => { toggle.__vtRunning = false; });
        }, true);
    }

    // =============================================================
    // SPLIT-TEXT (Splitting.js) für .split-line / .split-words
    // Fügt --char-index / --word-index pro Fragment hinzu.
    // Reveal wird per anime-Timeline (Hero) oder Observer getriggert.
    // =============================================================
    function initSplitting() {
        if (typeof Splitting === 'undefined') return;
        Splitting({ target: '[data-splitting]' });
    }

    // =============================================================
    // HERO-INTRO-TIMELINE (anime.js)
    // Premium, choreographierte Reveal-Sequenz
    // =============================================================
    function initHeroTimeline() {
        if (reduceMotion || typeof anime === 'undefined') {
            // Fallback: alle split-lines sofort sichtbar
            document.querySelectorAll('.split-line, .split-words').forEach(el => el.classList.add('revealed'));
            document.querySelectorAll('[data-hero-step]').forEach(el => {
                el.style.opacity = '';
                el.style.transform = '';
            });
            return;
        }

        const byStep = (n) => document.querySelector(`[data-hero-step="${n}"]`);
        // Initialstate: alles unsichtbar (via JS, kein CSS-Flash)
        document.querySelectorAll('[data-hero-step]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.willChange = 'opacity, transform';
        });

        const tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 720,
            autoplay: false
        });

        // Step 1: Badge
        tl.add({
            targets: byStep(1),
            opacity: [0, 1], translateY: [18, 0],
            duration: 620
        }, 80);

        // Step 2: Greeting (split chars stagger)
        const greeting = byStep(2);
        if (greeting) {
            greeting.classList.add('revealed');
            tl.add({
                targets: greeting,
                opacity: [0, 1], translateY: [0, 0], duration: 1
            }, 260);
        }

        // Step 3: Name (Gradient) – fade + subtle scale
        tl.add({
            targets: byStep(3),
            opacity: [0, 1], translateY: [32, 0], scale: [0.96, 1],
            duration: 880, easing: 'easeOutExpo'
        }, 480);

        // Step 4: Role Carousel
        tl.add({
            targets: byStep(4),
            opacity: [0, 1], translateY: [16, 0],
            duration: 620
        }, 900);

        // Step 5: Description (split words stagger)
        const desc = byStep(5);
        if (desc) {
            desc.classList.add('revealed');
            tl.add({
                targets: desc,
                opacity: [0, 1], translateY: [0, 0], duration: 1
            }, 1000);
        }

        // Step 6: CTAs
        tl.add({
            targets: byStep(6),
            opacity: [0, 1], translateY: [14, 0],
            duration: 560
        }, 1350);

        // Step 7: Social Links (stagger über Kinder)
        const social = byStep(7);
        if (social) {
            social.style.opacity = '1';
            social.style.transform = 'none';
            tl.add({
                targets: social.querySelectorAll('.social-link'),
                opacity: [0, 1], translateY: [12, 0],
                duration: 520,
                delay: anime.stagger(70)
            }, 1550);
        }

        // Cleanup after play (ent-mount will-change)
        tl.finished?.then(() => {
            document.querySelectorAll('[data-hero-step]').forEach(el => {
                el.style.willChange = '';
                el.style.transform = '';
            });
        });

        tl.play();
    }

    // =============================================================
    // BOOT
    // =============================================================
    function boot() {
        initLenis();
        initCursor();
        initMagnetic();
        initSplitting();
        initRevealStagger();
        initHeroTimeline();
        wrapThemeToggleWithViewTransition();
        window.__premium.ready = true;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
