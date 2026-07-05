// IMPORTS
import { getCollection } from 'astro:content';
import { SITE_DATA, SOCIAL_LINKS } from '../consts';

// EXPORTS
export const prerender = true;

// GET FUNCTION
export async function GET() {
    const itPosts = await getCollection('blog', ({ data }) => data.lang === 'it');
    const enPosts = await getCollection('blog', ({ data }) => data.lang === 'en');

    const toKnowledgeEntry = (post: (typeof itPosts)[number], lang: 'it' | 'en') => ({
        title: post.data.title,
        description: post.data.description,
        url: `${SITE_DATA.siteUrl}${lang === 'en' ? '/en' : ''}/blog/${post.slug.replace(/^(it|en)\//, '')}/`,
        language: lang,
        tags: post.data.tags ?? [],
        publicationDate: post.data.pubDate.toISOString(),
        updatedDate: post.data.updatedDate ? post.data.updatedDate.toISOString() : undefined,
        faqs: post.data.faqs ?? [],
    });

    const geoData = {
        entityContext: {
            name: SITE_DATA.name,
            jobTitle: SITE_DATA.jobTitle,
            url: SITE_DATA.siteUrl,
            email: SITE_DATA.email,
            location: 'Civitanova Marche, Marche, Italy',
            coreServices: [
                'Sviluppo Astro',
                'Web Performance',
                'Core Web Vitals',
                'SEO Tecnica',
                'SEO Locale',
                'GEO / AI Search Optimization',
            ],
            knowsAbout: ['Java', 'JavaScript', 'TypeScript', 'Astro', 'Tailwind CSS', 'SQL', 'Web Development'],
            contact: SOCIAL_LINKS,
        },
        knowledgeBase: [
            ...itPosts.map((post) => toKnowledgeEntry(post, 'it')),
            ...enPosts.map((post) => toKnowledgeEntry(post, 'en')),
        ],
    };

    return new Response(JSON.stringify(geoData, null, 2), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
