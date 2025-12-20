export const SITE_DATA = {
  name: 'Leonardo Castignani',
  email: 'leo.castignani@gmail.com',
  jobTitle: 'Software Developer',
  siteUrl: 'https://www.leonardocastignani.it',
};

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/leonardo-castignani/',
  github: 'https://github.com/leonardocastignani',
  email: `mailto:${SITE_DATA.email}`,
};

const IS_MAINTENANCE_ACTIVE = true
export const MAINTENANCE_MODE = IS_MAINTENANCE_ACTIVE && import.meta.env.PROD;