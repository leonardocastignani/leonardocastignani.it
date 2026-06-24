// --- IMPORTS ---
import { defineCollection, z } from 'astro:content';

// --- BLOG COLLECTION DEFINITION ---
export interface FAQItem {
    question: string;
    answer: string;
}

const blog = defineCollection({
    type: 'content',
    // --- SCHEMA DEFINITION WITH ZOD ---
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        imageAlt: z.string().optional(),
        imageTitle: z.string().optional(),
        imageCaption: z.string().optional(),
        tags: z.array(z.string()).optional(),
        lang: z.enum(['it', 'en']).default('it'),
        alternateSlug: z.string().optional(),
        faqs: z.array(
            z.object({
                question: z.string(),
                answer: z.string(),
            })
        ).optional(),
    }),
});

// --- EXPORT COLLECTIONS ---
export const collections = { blog };