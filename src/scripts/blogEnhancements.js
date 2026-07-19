// --- BLOG ARTICLE ENHANCEMENTS SCRIPT ---

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- READING PROGRESS BAR ---
export function initReadingProgress() {
    const article = document.querySelector('article');
    if (!article) return;

    let bar = document.getElementById('reading-progress-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'reading-progress-bar';
        document.body.appendChild(bar);
    }

    const update = () => {
        const rect = article.getBoundingClientRect();
        const articleHeight = article.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(articleHeight, 1));
        const progress = articleHeight > 0 ? (scrolled / articleHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
}

// --- PARAGRAPH / CONTENT REVEAL (prose children) ---
export function initProseReveal() {
    const prose = document.querySelector('.prose');
    if (!prose) return;

    prose.classList.add('prose-reveal');
    const children = Array.from(prose.children);

    if (prefersReducedMotion()) {
        children.forEach(child => child.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    children.forEach((child, index) => {
        child.style.transitionDelay = `${Math.min(index, 6) * 40}ms`;
        observer.observe(child);
    });
}

// --- LIGHTBOX FOR CONTENT IMAGES ---
export function initLightbox() {
    const prose = document.querySelector('.prose');
    if (!prose) return;

    let overlay = document.getElementById('image-lightbox');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'image-lightbox';
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = '<img alt="" />';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => overlay.classList.remove('is-open'));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') overlay.classList.remove('is-open');
        });
    }

    const overlayImg = overlay.querySelector('img');

    prose.querySelectorAll('img').forEach(img => {
        if (img.dataset.lightboxBound) return;
        img.dataset.lightboxBound = 'true';

        img.addEventListener('click', () => {
            overlayImg.src = img.currentSrc || img.src;
            overlayImg.alt = img.alt || '';
            overlay.classList.add('is-open');
        });
    });
}

export function initBlogEnhancements() {
    initReadingProgress();
    initProseReveal();
    initLightbox();
}