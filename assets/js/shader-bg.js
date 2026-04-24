/**
 * Shader-BG: animiertes Fragment-Shader-Gradient als Hero-Background.
 * Ersetzt den CPU-heavy Particle-Canvas durch einen GPU-Pixel-Shader.
 *
 * Design: zwei sanft rotierende radial-gradients (Rot + Ember-Orange)
 * gemischt mit FBM-Noise für organische Bewegung. Tempo bewusst
 * langsam (8-12 s Zyklus) – subtile Atmosphäre, keine Ablenkung.
 *
 * Footprint: ~3 KB, 1 WebGL-Context, 60fps, pausiert auf hidden tab
 * und bei prefers-reduced-motion.
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    function createShaderBG(container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false });
        if (!gl) {
            console.warn('[shader-bg] WebGL nicht verfügbar – Fallback: Particle-Canvas bleibt aktiv.');
            container.remove();
            return null;
        }

        // ---------- Shader ----------
        const vs = `
            attribute vec2 position;
            void main() { gl_Position = vec4(position, 0.0, 1.0); }
        `;
        const fs = `
            precision highp float;
            uniform vec2  uRes;
            uniform float uTime;
            uniform vec3  uColA;
            uniform vec3  uColB;
            uniform vec3  uColBg;
            uniform float uIntensity;

            // 2D hash → noise → fbm (iq-style)
            float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            float noise(vec2 p) {
                vec2 i = floor(p); vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
                           mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
            }
            float fbm(vec2 p) {
                float v = 0.0, a = 0.5;
                for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
                return v;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / uRes.xy;
                // Aspect-korrigiertes Coord-System für runde Orbs
                vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);

                float t = uTime * 0.06;

                // Zwei sanft rotierende „Orbs"
                vec2 o1 = vec2(cos(t * 0.8) * 0.35, sin(t * 1.1) * 0.28);
                vec2 o2 = vec2(cos(t * 1.3 + 2.1) * 0.42, sin(t * 0.9 + 1.3) * 0.35);

                float d1 = length(p - o1);
                float d2 = length(p - o2);

                // Radial-Falloff (smoothstep for soft-edge)
                float g1 = smoothstep(0.9, 0.0, d1);
                float g2 = smoothstep(0.75, 0.0, d2);

                // Noise-Distortion auf den Gradients für organischen Look
                float n = fbm(p * 2.2 + t * 0.5);
                g1 *= mix(0.7, 1.0, n);
                g2 *= mix(0.6, 1.0, fbm(p * 3.0 - t * 0.3));

                // Farben komponieren
                vec3 col = uColBg;
                col = mix(col, uColA, g1 * uIntensity);
                col = mix(col, uColB, g2 * uIntensity * 0.75);

                // Alpha: nur bei Gradient-Hotspots sichtbar, sonst transparent
                float alpha = clamp(g1 * 0.85 + g2 * 0.6, 0.0, 1.0) * uIntensity;

                gl_FragColor = vec4(col, alpha);
            }
        `;

        function compile(type, src) {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.warn('[shader-bg]', gl.getShaderInfoLog(s));
                gl.deleteShader(s);
                return null;
            }
            return s;
        }
        const vsh = compile(gl.VERTEX_SHADER, vs);
        const fsh = compile(gl.FRAGMENT_SHADER, fs);
        if (!vsh || !fsh) { container.remove(); return null; }

        const program = gl.createProgram();
        gl.attachShader(program, vsh);
        gl.attachShader(program, fsh);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('[shader-bg] Link-Error', gl.getProgramInfoLog(program));
            container.remove();
            return null;
        }
        gl.useProgram(program);

        // ---------- Fullscreen-Quad ----------
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1,-1,  1,-1, -1, 1,  -1, 1,  1,-1,  1, 1,
        ]), gl.STATIC_DRAW);
        const locPos = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(locPos);
        gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

        const uRes       = gl.getUniformLocation(program, 'uRes');
        const uTime      = gl.getUniformLocation(program, 'uTime');
        const uColA      = gl.getUniformLocation(program, 'uColA');
        const uColB      = gl.getUniformLocation(program, 'uColB');
        const uColBg     = gl.getUniformLocation(program, 'uColBg');
        const uIntensity = gl.getUniformLocation(program, 'uIntensity');

        // ---------- Farben aus CSS-Vars ziehen (Theme-aware) ----------
        function hexToRgb(h) {
            h = h.trim();
            // accept #rgb, #rrggbb, rgb(r,g,b)
            if (h.startsWith('rgb')) {
                const m = h.match(/[\d.]+/g);
                return m ? [parseInt(m[0]) / 255, parseInt(m[1]) / 255, parseInt(m[2]) / 255] : [0, 0, 0];
            }
            h = h.replace('#', '');
            if (h.length === 3) h = h.split('').map(c => c + c).join('');
            return [parseInt(h.slice(0, 2), 16) / 255,
                    parseInt(h.slice(2, 4), 16) / 255,
                    parseInt(h.slice(4, 6), 16) / 255];
        }
        function pullTheme() {
            const s = getComputedStyle(document.documentElement);
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            return {
                colA: hexToRgb(isDark ? '#ef4444' : '#dc2626'),   // Signal Red
                colB: hexToRgb(isDark ? '#f97316' : '#ea580c'),   // Ember Orange
                colBg: hexToRgb(s.getPropertyValue('--color-bg') || '#05050a'),
                intensity: isDark ? 0.72 : 0.38
            };
        }
        let theme = pullTheme();

        // ---------- Resize (DPR-capped auf 1.5) ----------
        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const w = container.clientWidth  * dpr;
            const h = container.clientHeight * dpr;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w; canvas.height = h;
                gl.viewport(0, 0, w, h);
            }
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        // ---------- Render Loop (pausiert auf hidden) ----------
        let paused = false;
        document.addEventListener('visibilitychange', () => {
            paused = document.hidden;
            if (!paused) tick(performance.now());
        });

        // Theme-change-Listener (MutationObserver)
        new MutationObserver(() => { theme = pullTheme(); })
            .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        let t0 = performance.now();
        function tick(now) {
            if (paused) return;
            const t = (now - t0) / 1000;
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, t);
            gl.uniform3fv(uColA, theme.colA);
            gl.uniform3fv(uColB, theme.colB);
            gl.uniform3fv(uColBg, theme.colBg);
            gl.uniform1f(uIntensity, theme.intensity);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        document.body.classList.add('shader-ready');
        return { canvas, gl };
    }

    // ---------- Boot ----------
    function init() {
        const host = document.createElement('div');
        host.className = 'shader-bg';
        document.body.insertBefore(host, document.body.firstChild);
        createShaderBG(host);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
