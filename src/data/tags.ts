// --- CANONICAL BLOG TAG REGISTRY ---
export const TAG_REGISTRY = {
    'seo-tecnica': { it: 'SEO Tecnica', en: 'Technical SEO' },
    'seo-locale': { it: 'SEO Locale', en: 'Local SEO' },
    'sviluppo-astro-performance': { it: 'Sviluppo Astro & Performance', en: 'Astro Development & Performance' },
    'sviluppo-software-qualita': { it: 'Sviluppo Software & Qualità', en: 'Software Development & Quality' },
    'business-strategia': { it: 'Business & Strategia', en: 'Business & Strategy' },
    'marketing-conversione': { it: 'Marketing & Conversione', en: 'Marketing & Conversion' },
    'privacy-sicurezza': { it: 'Privacy & Sicurezza', en: 'Privacy & Security' },
    'accessibilita': { it: 'Accessibilità', en: 'Accessibility' },
    'ai-innovazione': { it: 'AI & Innovazione', en: 'AI & Innovation' },
    'case-study': { it: 'Case Study', en: 'Case Study' },
    'aggiornamenti': { it: 'Aggiornamenti', en: 'Updates' },
} as const;

export type TagKey = keyof typeof TAG_REGISTRY;

export const NOINDEX_TAGS: TagKey[] = ['aggiornamenti'];

export function getTagLabel(key: string, lang: 'it' | 'en'): string {
    return (TAG_REGISTRY as Record<string, { it: string; en: string }>)[key]?.[lang] ?? key;
}

export function isNoindexTag(key: string): boolean {
    return (NOINDEX_TAGS as string[]).includes(key);
}