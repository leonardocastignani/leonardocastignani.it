import it from '../i18n/it.json';
import en from '../i18n/en.json';

const LANGUAGES = {
  it,
  en,
};

function getLangFromUrl(url: URL | undefined): 'it' | 'en' {
  if (!url || !url.pathname) {
    return 'it';
  }

  if (url.pathname.startsWith('/en')) {
    return 'en';
  }

  return 'it';
}

export const getI18N = ({ astroUrl }: { astroUrl: URL | undefined }) => {
  const lang = getLangFromUrl(astroUrl);
  if (lang in LANGUAGES) {
    return LANGUAGES[lang as keyof typeof LANGUAGES];
  }
  return LANGUAGES.it;
};