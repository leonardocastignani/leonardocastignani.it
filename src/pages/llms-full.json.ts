// IMPORTS
import { getCollection } from 'astro:content';
import { SITE_DATA, SOCIAL_LINKS, PERSON_KNOWS_ABOUT } from '../consts';

// EXPORTS
export const prerender = true;

// --- REAL, VERIFIABLE AUTHORITY FACTS ---
const AUTHORITY = {
    activeSince: 2021,
    education: [
        {
            degree: "Bachelor's Degree in Computer Science (L-31)",
            institution: 'Università degli Studi di Camerino',
            url: 'https://www.unicam.it/',
            period: '2023–present',
        },
        {
            degree: 'Diploma di Perito Informatico (IT Technical High School Diploma)',
            institution: 'IIS "E. Mattei", Recanati',
            url: 'https://www.ismatteirecanati.edu.it/',
            period: '2018–2023',
            grade: '94/100',
        },
    ],
    certifications: [
        { title: 'Patentino della Robotica (Industrial Robotics Certificate)', issuer: 'COMAU', year: 2022 },
        { title: 'ICDL Full Standard', issuer: 'AICA', year: 2021 },
    ],
};

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
            knowsAbout: PERSON_KNOWS_ABOUT,
            activeSince: AUTHORITY.activeSince,
            education: AUTHORITY.education,
            certifications: AUTHORITY.certifications,
            publishedArticles: itPosts.length + enPosts.length,
            contact: SOCIAL_LINKS,
        },
        knowledgeBase: [
            ...itPosts.map((post) => toKnowledgeEntry(post, 'it')),
            ...enPosts.map((post) => toKnowledgeEntry(post, 'en')),
        ],
        generatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(geoData, null, 2), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}