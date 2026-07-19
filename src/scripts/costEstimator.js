// --- INTERACTIVE PROJECT CONFIGURATOR / COST ESTIMATOR SCRIPT ---
const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateValue(el, from, to, duration = 450) {
    if (prefersReducedMotion() || from === to) {
        el.textContent = Math.round(to).toLocaleString('it-IT');
        return;
    }
    const start = performance.now();
    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(from + (to - from) * eased);
        el.textContent = value.toLocaleString('it-IT');
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function setAddonState(button, selected) {
    button.setAttribute('aria-pressed', String(selected));
    // Tailwind compiles .border-gray-700 after .border-blue-500, so the static
    // gray border class must be removed (not just out-cascaded) or it always wins.
    button.classList.toggle('border-blue-500', selected);
    button.classList.toggle('border-gray-700', !selected);
    button.classList.toggle('bg-blue-500/5', selected);

    const check = button.querySelector('.estimator-check');
    const checkIcon = button.querySelector('.estimator-check svg');
    if (check) {
        check.classList.toggle('border-blue-500', selected);
        check.classList.toggle('bg-blue-500', selected);
        check.classList.toggle('border-gray-600', !selected);
    }
    if (checkIcon) checkIcon.classList.toggle('opacity-0', !selected);
}

export function initCostEstimator() {
    const root = document.getElementById('estimator');
    if (!root || root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    const projectTypes = JSON.parse(root.dataset.projectTypes || '[]');
    const reactions = JSON.parse(root.dataset.reactions || '[]');
    const messageTemplate = root.dataset.messageTemplate || '';
    const noAddonsLabel = root.dataset.noAddonsLabel || '';

    const typeButtons = Array.from(root.querySelectorAll('.estimator-type'));
    const addonButtons = Array.from(root.querySelectorAll('.estimator-addon'));
    const quantityBox = document.getElementById('estimator-quantity');
    const qtyValueEl = document.getElementById('estimator-qty-value');
    const qtyLabelEl = document.getElementById('estimator-qty-label');
    const qtyMinusBtn = document.getElementById('estimator-qty-minus');
    const qtyPlusBtn = document.getElementById('estimator-qty-plus');
    const emptyEl = document.getElementById('estimator-empty');
    const totalEl = document.getElementById('estimator-total');
    const totalValueEl = document.getElementById('estimator-total-value');
    const reactionEl = document.getElementById('estimator-reaction');
    const resetBtn = document.getElementById('estimator-reset');
    const contactEl = document.getElementById('estimator-contact');

    if (typeButtons.length === 0 || !emptyEl || !totalEl || !totalValueEl) return;

    if (contactEl) {
        const isEnglish = document.documentElement.lang === 'en';
        contactEl.setAttribute('href', isEnglish ? '/en/#contact' : '/#contact');
    }

    let selectedType = null;
    let units = 0;
    let prevTotal = 0;

    const selectedAddons = () => addonButtons.filter((btn) => btn.getAttribute('aria-pressed') === 'true' && !btn.classList.contains('hidden'));

    const computeTotal = () => {
        if (!selectedType) return 0;
        const addonsTotal = selectedAddons().reduce((sum, btn) => sum + Number(btn.dataset.price || 0), 0);
        return selectedType.basePrice + units * selectedType.unitPrice + addonsTotal;
    };

    const updateReaction = (total) => {
        if (!reactionEl || reactions.length === 0) return;
        if (!selectedType) {
            reactionEl.textContent = '';
            return;
        }
        let tier = 0;
        if (total >= 5000) tier = 3;
        else if (total >= 3000) tier = 2;
        else if (total >= 1500) tier = 1;
        reactionEl.textContent = reactions[Math.min(tier, reactions.length - 1)];
    };

    const render = () => {
        const total = computeTotal();

        if (!selectedType) {
            emptyEl.classList.remove('hidden');
            totalEl.classList.add('hidden');
            contactEl?.classList.add('hidden');
            prevTotal = 0;
            updateReaction(0);
            return;
        }

        emptyEl.classList.add('hidden');
        totalEl.classList.remove('hidden');
        contactEl?.classList.remove('hidden');
        animateValue(totalValueEl, prevTotal, total);
        prevTotal = total;
        updateReaction(total);
    };

    const applyAddonAvailability = () => {
        const excluded = selectedType?.excludedAddons || [];
        addonButtons.forEach((btn) => {
            const isExcluded = excluded.includes(btn.dataset.key);
            btn.classList.toggle('hidden', isExcluded);
            if (isExcluded && btn.getAttribute('aria-pressed') === 'true') {
                setAddonState(btn, false);
            }
        });
    };

    const selectType = (key) => {
        selectedType = projectTypes.find((t) => t.key === key) || null;

        typeButtons.forEach((btn) => {
            const active = btn.dataset.key === key;
            btn.setAttribute('aria-pressed', String(active));
            // Same cascade-order fix as setAddonState: drop the static gray border when active.
            btn.classList.toggle('border-blue-500', active);
            btn.classList.toggle('border-gray-700', !active);
            btn.classList.toggle('bg-blue-500/5', active);
        });

        if (selectedType && quantityBox && qtyValueEl && qtyLabelEl) {
            units = selectedType.defaultUnits;
            qtyValueEl.textContent = String(units);
            qtyLabelEl.textContent = selectedType.unitLabel;
            quantityBox.classList.remove('hidden');
            quantityBox.classList.add('flex');
        }

        applyAddonAvailability();
        render();
    };

    const changeUnits = (delta) => {
        if (!selectedType || !qtyValueEl) return;
        units = Math.min(selectedType.maxUnits, Math.max(selectedType.minUnits, units + delta));
        qtyValueEl.textContent = String(units);
        render();
    };

    const resetAll = () => {
        selectedType = null;
        units = 0;
        prevTotal = 0;

        typeButtons.forEach((btn) => {
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.remove('border-blue-500', 'bg-blue-500/5');
            btn.classList.add('border-gray-700');
        });
        addonButtons.forEach((btn) => {
            setAddonState(btn, false);
            btn.classList.remove('hidden');
        });
        quantityBox?.classList.add('hidden');
        quantityBox?.classList.remove('flex');

        render();
    };

    const buildInquiryMessage = () => {
        if (!selectedType) return '';
        const addonLabels = selectedAddons().map((btn) => btn.dataset.label).join(', ') || noAddonsLabel;
        return messageTemplate
            .replace('{type}', selectedType.label)
            .replace('{units}', String(units))
            .replace('{unitLabel}', selectedType.unitLabel.toLowerCase())
            .replace('{addons}', addonLabels)
            .replace('{total}', String(computeTotal()).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    };

    typeButtons.forEach((btn) => {
        btn.addEventListener('click', () => selectType(btn.dataset.key));
    });

    qtyMinusBtn?.addEventListener('click', () => changeUnits(-1));
    qtyPlusBtn?.addEventListener('click', () => changeUnits(1));

    addonButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const nowSelected = btn.getAttribute('aria-pressed') !== 'true';
            setAddonState(btn, nowSelected);
            render();
        });
    });

    resetBtn?.addEventListener('click', resetAll);

    contactEl?.addEventListener('click', () => {
        const message = buildInquiryMessage();
        if (message) {
            sessionStorage.setItem('serviceInquiry', JSON.stringify({ message }));
        }
    });

    render();
}
