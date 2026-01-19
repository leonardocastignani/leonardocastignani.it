// --- GLOBAL SITE DATA ---
export const SITE_DATA = {
  name: 'Leonardo Castignani',
  email: 'info@leonardocastignani.it',
  jobTitle: 'Software Developer',
  siteUrl: 'https://www.leonardocastignani.it',
};

// --- SOCIAL MEDIA LINKS ---
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/leonardo-castignani/',
  github: 'https://github.com/leonardocastignani',
  instagram: 'https://www.instagram.com/leonardocastignani.it/',
  facebook: 'https://www.facebook.com/profile.php?id=61585957205087',
  email: `mailto:${SITE_DATA.email}`,
};

// --- MAINTENANCE MODE CONFIGURATION ---
const IS_MAINTENANCE_ACTIVE = false
export const MAINTENANCE_MODE = IS_MAINTENANCE_ACTIVE && import.meta.env.PROD;