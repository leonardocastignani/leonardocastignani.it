import it from '../i18n/it.json' /*with { type: 'json' }*/;
import en from '../i18n/en.json' /*with { type: 'json' }*/;

const LANGUAGES = {
  it,
  en,
};

/*
export const getI18N = ({ currentLocale = 'it' }: { currentLocale: string | undefined }) => {
  if (currentLocale in LANGUAGES) {
    return LANGUAGES[currentLocale as keyof typeof LANGUAGES];
  }
  return LANGUAGES.it;
};
*/

// Funzione helper per capire la lingua dal percorso
function getLangFromUrl(url: URL | undefined): 'it' | 'en' {
  // Se l'URL non è definito (es. 404), ritorna 'it'
  if (!url || !url.pathname) {
    return 'it';
  }

  // Se il percorso inizia con /en, è inglese.
  // Questo copre /en, /en/ e /en/privacy-policy
  if (url.pathname.startsWith('/en')) {
    return 'en';
  }
  
  // In tutti gli altri casi, è italiano (la lingua di default)
  return 'it';
}

// Modifichiamo getI18N per accettare un URL potenzialmente undefined
export const getI18N = ({ astroUrl }: { astroUrl: URL | undefined }) => {
  const lang = getLangFromUrl(astroUrl);
  if (lang in LANGUAGES) {
    return LANGUAGES[lang as keyof typeof LANGUAGES];
  }
  return LANGUAGES.it;
};