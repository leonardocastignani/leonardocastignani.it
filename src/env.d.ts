/// <reference types="astro/client" />

// --- IMPORT META EXTENSION ---
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// --- GOOGLE TAG MANAGER / CONSENT MODE ---
interface Window {
  dataLayer: unknown[];
}