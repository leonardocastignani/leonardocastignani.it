// --- ANIMATED TERMINAL DEMO SCRIPT ---
const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLines(el, lines) {
    let lineIndex = 0;
    let charIndex = 0;
    el.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    cursor.textContent = '▍';
    el.appendChild(cursor);

    const typeNextChar = () => {
        if (lineIndex >= lines.length) {
            return;
        }

        const currentLine = lines[lineIndex];

        if (charIndex <= currentLine.length) {
            const typedSoFar = lines.slice(0, lineIndex).join('\n') + (lineIndex > 0 ? '\n' : '') + currentLine.slice(0, charIndex);
            el.textContent = typedSoFar;
            el.appendChild(cursor);
            charIndex += 1;
            window.setTimeout(typeNextChar, 18 + Math.random() * 22);
        } else {
            lineIndex += 1;
            charIndex = 0;
            window.setTimeout(typeNextChar, 220);
        }
    };

    typeNextChar();
}

export function initTerminalDemo() {
    const el = document.getElementById('terminal-output');
    if (!el || el.dataset.played === 'true') return;

    const lines = JSON.parse(el.dataset.lines || '[]');
    if (lines.length === 0) return;

    if (prefersReducedMotion()) {
        el.textContent = lines.join('\n');
        el.dataset.played = 'true';
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && el.dataset.played !== 'true') {
                el.dataset.played = 'true';
                typeLines(el, lines);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(el);
}
