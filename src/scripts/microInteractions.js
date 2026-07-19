// --- PREMIUM MICRO-INTERACTIONS SCRIPT ---

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isFinePointer = () =>
    window.matchMedia('(pointer: fine)').matches;

// --- NAVBAR: BLUR/BACKGROUND ON SCROLL ---
export function initNavbarScrollState() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const update = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
}

// --- RIPPLE EFFECT FOR .btn-premium ---
export function initButtonRipple() {
    document.querySelectorAll('.btn-premium').forEach(btn => {
        if (btn.dataset.rippleBound) return;
        btn.dataset.rippleBound = 'true';

        btn.addEventListener('click', (e) => {
            if (prefersReducedMotion()) return;

            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.4;
            const ripple = document.createElement('span');
            const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
            const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;

            ripple.className = 'btn-ripple';
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

// --- MAGNETIC HOVER (buttons pulled gently toward the cursor) ---
export function initMagneticElements() {
    if (!isFinePointer() || prefersReducedMotion()) return;

    document.querySelectorAll('.magnetic').forEach(el => {
        if (el.dataset.magneticBound) return;
        el.dataset.magneticBound = 'true';

        const strength = parseFloat(el.dataset.magneticStrength || '0.25');

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// --- CARD 3D TILT ---
export function initCardTilt() {
    if (!isFinePointer() || prefersReducedMotion()) return;

    document.querySelectorAll('.card-tilt').forEach(card => {
        if (card.dataset.tiltBound) return;
        card.dataset.tiltBound = 'true';

        const maxTilt = parseFloat(card.dataset.tiltMax || '4');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const tiltX = (px - 0.5) * maxTilt * 2;
            const tiltY = (0.5 - py) * maxTilt * 2;
            card.style.setProperty('--tilt-x', `${tiltX}deg`);
            card.style.setProperty('--tilt-y', `${tiltY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        });
    });
}

// --- SPOTLIGHT CURSOR TRACKING ---
export function initSpotlight() {
    if (!isFinePointer() || prefersReducedMotion()) return;

    document.querySelectorAll('.spotlight').forEach(el => {
        if (el.dataset.spotlightBound) return;
        el.dataset.spotlightBound = 'true';

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
            el.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
        });
    });
}

// --- HERO MOUSE PARALLAX (glow blobs drift gently with the cursor) ---
export function initHeroParallax() {
    if (!isFinePointer() || prefersReducedMotion()) return;

    const hero = document.getElementById('home');
    if (!hero) return;

    const blobs = hero.querySelectorAll('[data-parallax-depth]');
    if (blobs.length === 0) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        blobs.forEach(blob => {
            const depth = parseFloat(blob.dataset.parallaxDepth || '20');
            blob.style.transform = `translate(${relX * depth}px, ${relY * depth}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        blobs.forEach(blob => { blob.style.transform = 'translate(0, 0)'; });
    });
}

// --- INIT EVERYTHING ---
export function initMicroInteractions() {
    initNavbarScrollState();
    initButtonRipple();
    initMagneticElements();
    initCardTilt();
    initSpotlight();
    initHeroParallax();
}