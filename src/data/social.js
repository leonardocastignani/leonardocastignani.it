import EmailIcon from '../components/icons/EmailIcon.astro';
import GithubIcon from '../components/icons/GithubIcon.astro';
import LinkedinIcon from '../components/icons/LinkedinIcon.astro';
import FacebookIcon from '../components/icons/FacebookIcon.astro';
import InstagramIcon from '../components/icons/InstagramIcon.astro';

export const social = [
    { 
        name: 'LinkedIn', 
        Icon: LinkedinIcon,
        id: 'linkedin'
    },
    { 
        name: 'GitHub', 
        Icon: GithubIcon, 
        id: 'github'
    },
    { 
        name: 'Instagram', 
        Icon: InstagramIcon, 
        id: 'instagram'
    },
    { 
        name: 'Facebook', 
        Icon: FacebookIcon, 
        id: 'facebook'
    },
    { 
        name: 'Email', 
        Icon: EmailIcon, 
        id: 'email'
    },
];