export function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (!backToTopBtn) return;

    const handleScroll = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        }
    };

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', handleScroll);

    handleScroll();
}