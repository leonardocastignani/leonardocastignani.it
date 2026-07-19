// --- PROCESS STEPS SCROLL-ACTIVATION SCRIPT ---
export function initProcessSteps() {
    const icons = Array.from(document.querySelectorAll('.process-icon'));
    if (icons.length === 0) return;

    const alreadyBound = icons.every((icon) => icon.dataset.bound === 'true');
    if (alreadyBound) return;
    icons.forEach((icon) => { icon.dataset.bound = 'true'; });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('process-step-active', entry.isIntersecting);
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -10% 0px' });

    icons.forEach((icon) => observer.observe(icon));
}
