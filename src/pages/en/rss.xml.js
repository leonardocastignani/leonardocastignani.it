// --- IMPORTS ---
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DATA } from '../../consts';

// --- EXPORTS ---
export const prerender = true;

export async function GET(context) {
    const posts = (await getCollection('blog', ({ data }) => data.lang === 'en')).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    return rss({
        title: `${SITE_DATA.name} | Blog`,
        description: 'Practical guides on SEO, web performance, and software development for SMEs and professionals in the Marche region.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/en/blog/${post.slug.replace(/^en\//, '')}/`,
        })),
        customData: '<language>en-US</language>',
    });
}