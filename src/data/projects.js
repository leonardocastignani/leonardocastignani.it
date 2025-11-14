import budgetImage from '../assets/projects/BudgetManagement.png';
import portfolioImage from '../assets/projects/Portfolio.png';

// Lista dei dati statici (tutto tranne i testi)
const staticProjects = [
    {
        id: 0, // Corrisponde all'indice [0] di i18n
        image: budgetImage,
        tags: ['Java', 'JavaFX', 'H2 Database', 'Gradle'],
        github: 'https://github.com/leonardocastignani/FamilyBudgetManagement.git',
        live: null
    },
    {
        id: 1, // Corrisponde all'indice [1] di i18n
        image: null,
        tags: ['Java', 'Spring Boot', 'Design Patterns'],
        github: 'https://github.com/leonardocastignani/HackHub.git',
        live: null
    },
    {
        id: 2, // Corrisponde all'indice [2] di i18n
        image: portfolioImage,
        tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/leonardocastignani/leonardocastignani.it.git',
        live: 'https://www.leonardocastignani.it'
    }
];

// Funzione che "unisce" i dati statici con quelli tradotti
export function getProjects(i18n) {
    const projectDetails = i18n.projects.projectDetails;

    return staticProjects.map(project => {
        const details = projectDetails[project.id];
        return {
            ...project, // Include image, tags, github, live
            ...details  // Include title, description, detailedDescription
        };
    });
}