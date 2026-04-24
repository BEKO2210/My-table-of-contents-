/**
 * Premium Layer v2 — Obsidian × Violet
 * Läuft NACH main.js (defer-order). Nutzt Lenis, anime, Splitting
 * wenn verfügbar. Alle Features degradieren graceful auf no-op.
 *
 * Features (werden in Commit B/C/D aktiviert):
 *   - Lenis Smooth-Scroll (+ Anchor-Integration)
 *   - Magnetic Custom Cursor (Desktop only)
 *   - Magnetic Hover auf .magnetic-Elementen
 *   - WebGL Shader-Gradient Hero-BG
 *   - Split-Text Reveal (Hero + Section-Überschriften)
 *   - Scroll-Choreografie (.reveal-stagger via IntersectionObserver)
 *   - Counter mit Easing
 *   - View-Transitions API Opt-In
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Bridge-Objekt für spätere Commits
    window.__premium = { reduceMotion, hasHover, ready: false };

    // Commit A: Setup + FOUC-Safety. Features folgen in Commit B/C/D.
    document.documentElement.classList.add('premium-ready');

    // Sicherheitsnetz: falls 'load' hängt, sichere Anzeige nach 2 s
    setTimeout(() => document.body?.classList.add('loaded'), 2000);
})();
