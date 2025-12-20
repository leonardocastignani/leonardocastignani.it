/// <reference types="astro/client" />

// --- IMPORT META EXTENSION ---
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// --- EXTERNAL LIBRARY DECLARATIONS ---
declare module 'cookieconsent';
declare var cookieconsent: any;