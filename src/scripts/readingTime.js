// --- READING TIME CALCULATOR ---
const WORDS_PER_MINUTE = 200;

export function getReadingTime(markdownBody, wordsPerMinute = WORDS_PER_MINUTE) {
    if (!markdownBody) return 1;

    const plainText = markdownBody
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<\/?[^>]+>/g, ' ')
        .replace(/[#>*_~`|-]/g, ' ');

    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}