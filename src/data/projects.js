import budgetImage from '../assets/projects/BudgetManagement.png';
import portfolioImage from '../assets/projects/Portfolio.png';

const staticProjects = [
    {
        id: 0,
        image: budgetImage,
        tags: ['Java', 'JavaFX', 'H2 Database', 'Gradle'],
        github: 'https://github.com/leonardocastignani/FamilyBudgetManagement.git',
        live: null
    },
    {
        id: 1,
        image: null,
        tags: ['Java', 'Spring Boot', 'Design Patterns'],
        github: 'https://github.com/leonardocastignani/HackHub.git',
        live: null
    },
    {
        id: 2,
        image: portfolioImage,
        tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/leonardocastignani/leonardocastignani.it.git',
        live: 'https://www.leonardocastignani.it'
    }
];

export function getProjects(i18n) {
    const projectDetails = i18n.projects.projectDetails;

    return staticProjects.map(project => {
        const details = projectDetails[project.id];
        return {
            ...project,
            ...details
        };
    });
}