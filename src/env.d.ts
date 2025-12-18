/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_FORMSPREE_ENDPOINT: string;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'cookieconsent';
declare var cookieconsent: any;
declare var grecaptcha: any;