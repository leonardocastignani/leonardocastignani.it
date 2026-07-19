// --- SCROLL REVEAL ANIMATIONS SCRIPT ---
// Supports two systems:
//  - legacy `.fade-in-section` (kept for backwards compatibility)
//  - `[data-animate]` elements with variants (fade-up | fade | slide-left | slide-right | scale)
//    and optional stagger via `data-stagger-children` on a parent container.
export function initFadeInAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const reveal = (el) => {
        el.classList.add('is-visible');
    };

    if (prefersReducedMotion) {
        document.querySelectorAll('.fade-in-section, [data-animate]').forEach(reveal);
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reveal(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

    // Apply incremental transition-delay for stagger containers, then observe children.
    document.querySelectorAll('[data-stagger-children]').forEach(container => {
        const step = parseInt(container.dataset.staggerChildren, 10) || 80;
        const children = Array.from(container.children).filter(child => child.hasAttribute('data-animate'));
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * step}ms`;
        });
    });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}
