// --- GLOBAL SITE DATA ---
export const SITE_DATA = {
  name: 'Leonardo Castignani',
  email: 'info@leonardocastignani.it',
  jobTitle: 'Software & Web Developer',
  siteUrl: 'https://www.leonardocastignani.it',
  whatsappNumber: '393337020242',
};

// --- SOCIAL MEDIA LINKS ---
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/leonardo-castignani/',
  github: 'https://github.com/leonardocastignani',
  instagram: 'https://www.instagram.com/leonardocastignani.it/',
  facebook: 'https://www.facebook.com/leonardocastignani.it/',
  email: `mailto:${SITE_DATA.email}`,
};

// --- STRUCTURED DATA (JSON-LD) STABLE @id ANCHORS ---
export const SCHEMA_IDS = {
  person: `${SITE_DATA.siteUrl}/#person`,
  organization: `${SITE_DATA.siteUrl}/#organization`,
  website: `${SITE_DATA.siteUrl}/#website`,
};

// --- SHARED PERSON ENTITY DATA (single source of truth for JSON-LD) ---
export const PERSON_KNOWS_ABOUT = ['Java', 'JavaScript', 'TypeScript', 'Astro', 'Tailwind CSS', 'SQL', 'Web Development', 'Software Development'];
export const PERSON_SAME_AS = [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook];

// --- MAINTENANCE MODE CONFIGURATION ---
const IS_MAINTENANCE_ACTIVE = false;
export const MAINTENANCE_MODE = IS_MAINTENANCE_ACTIVE && import.meta.env.PROD;