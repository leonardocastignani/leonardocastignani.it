#!/usr/bin/env node
/**
 * Invia tutte le URL della sitemap al protocollo IndexNow.
 *
 * IndexNow (https://www.indexnow.org/) è supportato da Microsoft Bing,
 * Yandex, Seznam.cz e Naver: una singola submission viene propagata a
 * tutti i motori partecipanti. Google NON aderisce a IndexNow: per Google
 * si usa lo script gsc-resubmit-sitemap.mjs (Search Console API).
 *
 * Richiede:
 *  - env INDEXNOW_KEY: la chiave il cui file <key>.txt è pubblicato in /public
 *  - env SITE_URL: es. https://www.leonardocastignani.it (senza slash finale)
 */

const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '');
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!SITE_URL) {
  console.error('Errore: variabile SITE_URL mancante.');
  process.exit(1);
}
if (!INDEXNOW_KEY) {
  console.error('Errore: secret INDEXNOW_KEY mancante.');
  process.exit(1);
}

const host = new URL(SITE_URL).host;
const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

/** Scarica un testo via HTTP(S), lancia un errore se la risposta non è 2xx. */
async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'leonardocastignani-seo-bot/1.0' } });
  if (!res.ok) {
    throw new Error(`GET ${url} -> HTTP ${res.status}`);
  }
  return res.text();
}

/** Estrae tutti i valori <loc>...</loc> da un documento XML (sitemap o sitemap index). */
function extractLocs(xml) {
  const matches = xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g);
  return Array.from(matches, (m) => m[1].trim());
}

/** Astro @astrojs/sitemap genera un sitemap-index.xml che punta a uno o più sitemap-N.xml. */
async function collectAllUrls() {
  const indexXml = await fetchText(`${SITE_URL}/sitemap-index.xml`);
  const childSitemaps = extractLocs(indexXml);

  if (childSitemaps.length === 0) {
    throw new Error('Nessun sitemap figlio trovato in sitemap-index.xml: controlla la build.');
  }

  const urlSets = await Promise.all(
    childSitemaps.map(async (sitemapUrl) => extractLocs(await fetchText(sitemapUrl)))
  );

  return Array.from(new Set(urlSets.flat()));
}

/** IndexNow accetta fino a 10.000 URL per richiesta: qui non serve, ma restiamo prudenti. */
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
  return chunks;
}

async function submitBatch(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList,
    }),
  });

  // IndexNow risponde 200 o 202 in caso di successo.
  if (res.status !== 200 && res.status !== 202) {
    const body = await res.text().catch(() => '');
    throw new Error(`IndexNow HTTP ${res.status}: ${body}`);
  }
  return res.status;
}

async function main() {
  console.log(`Recupero le URL dalla sitemap di ${SITE_URL}...`);
  const urls = await collectAllUrls();
  console.log(`Trovate ${urls.length} URL.`);

  const batches = chunk(urls, 10000);
  for (const [i, batch] of batches.entries()) {
    const status = await submitBatch(batch);
    console.log(`Batch ${i + 1}/${batches.length} (${batch.length} URL) inviato a IndexNow -> HTTP ${status}`);
  }

  console.log('Fatto. Bing, Yandex, Seznam e Naver sono stati notificati.');
}

main().catch((err) => {
  console.error('Invio IndexNow fallito:', err.message);
  process.exit(1);
});
