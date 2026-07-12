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
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/blog/${post.slug.replace(/^it\//, '')}/`,
        })),
        customData: '<language>it-IT</language>',
    });
}