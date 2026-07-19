// --- SERVICES QUIZ / CONFIGURATOR SCRIPT ---
export function initServicesQuiz() {
    const root = document.getElementById('services-quiz');
    if (!root || root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    const servicesData = JSON.parse(root.dataset.services || '[]');
    const questions = Array.from(root.querySelectorAll('.quiz-question'));
    const dots = Array.from(root.querySelectorAll('.quiz-dot'));
    const questionsContainer = document.getElementById('quiz-questions');
    const resultPanel = document.getElementById('quiz-result');
    const resultTitle = document.getElementById('quiz-result-title');
    const resultTagline = document.getElementById('quiz-result-tagline');
    const resultDescription = document.getElementById('quiz-result-description');
    const resultCta = document.getElementById('quiz-result-cta');
    const restartBtn = document.getElementById('quiz-restart');

    if (questions.length === 0 || !questionsContainer || !resultPanel) return;

    let currentIndex = 0;
    const scores = {};

    const showQuestion = (index) => {
        questions.forEach((q, i) => { q.hidden = i !== index; });
        dots.forEach((d, i) => {
            d.classList.toggle('bg-blue-500', i <= index);
            d.classList.toggle('bg-gray-600', i > index);
        });
    };

    const showResult = () => {
        let bestService = null;
        let bestScore = -1;
        Object.entries(scores).forEach(([service, score]) => {
            if (score > bestScore) {
                bestScore = score;
                bestService = service;
            }
        });

        const match = servicesData.find((s) => s.slug === bestService) || servicesData[0];
        if (!match) return;

        questionsContainer.hidden = true;
        resultPanel.hidden = false;
        resultTitle.textContent = match.title;
        resultTagline.textContent = match.tagline;
        resultDescription.textContent = match.description;
        resultCta.setAttribute('href', `#service-${match.slug}`);
        resultCta.dataset.targetSlug = match.slug;
    };

    const handleAnswer = (service) => {
        if (service) {
            scores[service] = (scores[service] || 0) + 1;
        }
        currentIndex += 1;
        if (currentIndex < questions.length) {
            showQuestion(currentIndex);
        } else {
            showResult();
        }
    };

    const reset = () => {
        currentIndex = 0;
        Object.keys(scores).forEach((key) => delete scores[key]);
        questionsContainer.hidden = false;
        resultPanel.hidden = true;
        showQuestion(0);
    };

    root.querySelectorAll('.quiz-answer').forEach((btn) => {
        btn.addEventListener('click', () => handleAnswer(btn.dataset.service));
    });

    resultCta?.addEventListener('click', () => {
        const targetCard = document.getElementById(`service-${resultCta.dataset.targetSlug}`);
        if (!targetCard) return;
        targetCard.classList.add('service-card-highlight');
        window.setTimeout(() => targetCard.classList.remove('service-card-highlight'), 3200);
        window.setTimeout(() => targetCard.click(), 500);
    });

    restartBtn?.addEventListener('click', reset);

    showQuestion(0);
}
