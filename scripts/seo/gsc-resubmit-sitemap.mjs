#!/usr/bin/env node
/**
 * Chiede a Google di ri-scansionare la sitemap tramite la Search Console API
 * (metodo ufficiale "sitemaps.submit"). Google NON supporta IndexNow, e il
 * vecchio endpoint di ping (google.com/ping?sitemap=...) è stato dismesso
 * da Google nel giugno 2023: questa è l'unica via "supportata" rimasta per
 * sollecitare una nuova scansione della sitemap senza passare dalla UI.
 *
 * Nota: questo NON garantisce l'indicizzazione immediata delle singole
 * pagine (per quello esisterebbe la Indexing API di Google, ma è
 * ufficialmente riservata a pagine JobPosting/BroadcastEvent: usarla per
 * contenuti generici viola i Termini di Servizio di Google e può portare
 * a limitazioni sull'account). Risottomettere la sitemap è invece
 * un'operazione pienamente supportata e sicura da automatizzare.
 *
 * Richiede:
 *  - env GSC_SERVICE_ACCOUNT_JSON: contenuto JSON del service account
 *    Google Cloud (con accesso alla proprietà Search Console)
 *  - env GSC_PROPERTY: identificativo esatto della proprietà in Search
 *    Console, es. "sc-domain:leonardocastignani.it" per una proprietà di
 *    dominio, oppure "https://www.leonardocastignani.it/" per una
 *    proprietà a prefisso URL
 *  - env SITE_URL: es. https://www.leonardocastignani.it
 */

import crypto from 'node:crypto';

const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '');
const GSC_PROPERTY = process.env.GSC_PROPERTY;
const SERVICE_ACCOUNT_RAW = process.env.GSC_SERVICE_ACCOUNT_JSON;

if (!SITE_URL) {
  console.error('Errore: variabile SITE_URL mancante.');
  process.exit(1);
}
if (!GSC_PROPERTY) {
  console.error('Errore: secret GSC_PROPERTY mancante (es. "sc-domain:leonardocastignani.it").');
  process.exit(1);
}
if (!SERVICE_ACCOUNT_RAW) {
  console.error('Errore: secret GSC_SERVICE_ACCOUNT_JSON mancante.');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(SERVICE_ACCOUNT_RAW);
} catch {
  console.error('Errore: GSC_SERVICE_ACCOUNT_JSON non è un JSON valido.');
  process.exit(1);
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** Costruisce e firma un JWT RS256 per il flusso "Service Account JWT Bearer" di Google. */
function buildSignedJWT(account) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const nowSec = Math.floor(Date.now() / 1000);
  const claims = {
    iss: account.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    iat: nowSec,
    exp: nowSec + 3600,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto.sign('RSA-SHA256', Buffer.from(unsigned), account.private_key);
  const signatureB64url = signature.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return `${unsigned}.${signatureB64url}`;
}

async function getAccessToken(account) {
  const assertion = buildSignedJWT(account);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Scambio token OAuth fallito: HTTP ${res.status} ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function submitSitemap(accessToken) {
  const sitemapUrl = `${SITE_URL}/sitemap-index.xml`;
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    GSC_PROPERTY
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200 && res.status !== 204) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `Submit sitemap fallito: HTTP ${res.status} ${body}\n` +
        `Verifica che GSC_PROPERTY corrisponda esattamente alla proprietà in Search Console ` +
        `e che l'email del service account sia stata aggiunta come utente della proprietà.`
    );
  }
}

async function main() {
  console.log(`Richiedo a Google di ri-scansionare ${SITE_URL}/sitemap-index.xml (proprietà: ${GSC_PROPERTY})...`);
  const accessToken = await getAccessToken(serviceAccount);
  await submitSitemap(accessToken);
  console.log('Fatto. Google Search Console ha ricevuto la richiesta di ri-scansione della sitemap.');
}

main().catch((err) => {
  console.error('Risottomissione sitemap a Google fallita:', err.message);
  process.exit(1);
});
