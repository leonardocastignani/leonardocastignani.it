// --- IMPORTS ---
import it from '../i18n/it.json';
import en from '../i18n/en.json';

// --- INITIAL CONFIGURATION ---
const LANGUAGES = {
  it,
  en,
};

// --- FUNCTIONS ---
export function getLangFromUrl(url: URL | undefined): 'it' | 'en' {
  if (!url || !url.pathname) { return 'it'; }

  if (url.pathname.startsWith('/en')) { return 'en'; }

  return 'it';
}

export const getI18N = ({ astroUrl }: { astroUrl: URL | undefined }) => {
  const lang = getLangFromUrl(astroUrl);
  if (lang in LANGUAGES) {
    return LANGUAGES[lang as keyof typeof LANGUAGES];
  }
  return LANGUAGES.it;
};

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}