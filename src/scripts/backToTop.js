export function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (!backToTopBtn) return;

    const handleScroll = () => {
        if (document.body.classList.contains('overflow-hidden')) {
            return;
        }
        if (window.scrollY > window.innerHeight * 0.8) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    };

    // Rimuovi listener precedenti se esistono (utile per SPA navigation)
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clona e sostituisci per pulire event listener precedenti sul click
    const newBtn = backToTopBtn.cloneNode(true);
    backToTopBtn.parentNode.replaceChild(newBtn, backToTopBtn);

    newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}