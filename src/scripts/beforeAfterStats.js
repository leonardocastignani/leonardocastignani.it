// --- BEFORE / AFTER ANIMATED STATS SCRIPT ---
const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el, from, to, decimals, duration = 1400) {
    const start = performance.now();
    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = from + (to - from) * eased;
        el.textContent = value.toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = to.toFixed(decimals);
    };
    requestAnimationFrame(step);
}

export function initBeforeAfterStats() {
    const counters = Array.from(document.querySelectorAll('.stat-counter'));
    if (counters.length === 0) return;

    counters.forEach((counter) => {
        if (counter.dataset.played === 'true') return;

        const before = parseFloat(counter.dataset.before || '0');
        const after = parseFloat(counter.dataset.after || '0');
        const decimals = parseInt(counter.dataset.decimals || '0', 10);
        const numberEl = counter.querySelector('.stat-number');
        if (!numberEl) return;

        if (prefersReducedMotion()) {
            numberEl.textContent = after.toFixed(decimals);
            counter.dataset.played = 'true';
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && counter.dataset.played !== 'true') {
                    counter.dataset.played = 'true';
                    animateCount(numberEl, before, after, decimals);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(counter);
    });
}
