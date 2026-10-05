// --- IMPORTS ---
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DATA } from '../consts';

// --- EXPORTS ---
export const prerender = true;

export async function GET(context) {
    const posts = (await getCollection('blog', ({ data }) => data.lang === 'it')).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    return rss({
        title: `${SITE_DATA.name} | Blog`,
        description: 'Guide pratiche su SEO, performance web e sviluppo software per PMI e professionisti delle Marche.',
        site: context.site,
        xmlns: { atom: 'http://www.w3.org/2005/Atom' },
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/blog/${post.slug.replace(/^it\//, '')}/`,
        })),
        // RSS 2.0 ammette un solo <link> di canale (la home); la sezione blog va in Atom
        customData: `<language>it-IT</language>
<atom:link href="${new URL('/blog/', context.site).href}" rel="alternate" type="text/html" />
<atom:link href="${new URL('/rss.xml', context.site).href}" rel="self" type="application/rss+xml" />`,
    });
}