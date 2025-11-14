// Importa tutte le icone
import JavaIcon from '../components/icons/JavaIcon.astro';
import CIcon from '../components/icons/CIcon.astro';
import CppIcon from '../components/icons/CppIcon.astro';
import CsharpIcon from '../components/icons/CsharpIcon.astro';
import PythonIcon from '../components/icons/PythonIcon.astro';
import PhpIcon from '../components/icons/PhpIcon.astro';
import JavascriptIcon from '../components/icons/JavascriptIcon.astro';
import TypescriptIcon from '../components/icons/TypescriptIcon.astro';
import SqlIcon from '../components/icons/SqlIcon.astro';

import Html5Icon from '../components/icons/Html5Icon.astro';
import Css3Icon from '../components/icons/Css3Icon.astro';
import AstroIcon from '../components/icons/AstroIcon.astro';
import TailwindCssIcon from '../components/icons/TailwindCssIcon.astro';

import MySqlIcon from '../components/icons/MySqlIcon.astro';
import SpringbootIcon from '../components/icons/SpringbootIcon.astro';

import GitIcon from '../components/icons/GitIcon.astro';
import GithubIcon from '../components/icons/GithubIcon.astro';
import GithubCopilotIcon from '../components/icons/GithubCopilotIcon.astro';
import EclipseIcon from '../components/icons/EclipseIcon.astro';
import VSCodeIcon from '../components/icons/VSCodeIcon.astro';
import VSIcon from '../components/icons/VSIcon.astro';
import W10Icon from '../components/icons/W10Icon.astro';
import W11Icon from '../components/icons/W11Icon.astro';
import LinuxIcon from '../components/icons/LinuxIcon.astro';
import MediawikiIcon from '../components/icons/MediawikiIcon.astro';

// Esporta gli array, usando una "i18nKey" per il nome
// (Presumo tu abbia una sezione 'skills' nel tuo file i18n)

export const languages = [
    { name: 'java', Icon: JavaIcon },
    { name: 'c', Icon: CIcon },
    { name: 'cpp', Icon: CppIcon },
    { name: 'csharp', Icon: CsharpIcon },
    { name: 'python', Icon: PythonIcon },
    { name: 'php', Icon: PhpIcon },
    { name: 'javascript', Icon: JavascriptIcon },
    { name: 'typescript', Icon: TypescriptIcon },
    { name: 'sql', Icon: SqlIcon },
];

export const frontend = [
    { name: 'html5', Icon: Html5Icon },
    { name: 'css3', Icon: Css3Icon },
    { name: 'astro', Icon: AstroIcon },
    { name: 'tailwind', Icon: TailwindCssIcon },
];

export const backend = [
    { name: 'springboot', Icon: SpringbootIcon },
    { name: 'mysql', Icon: MySqlIcon },
];

export const tools = [
    { name: 'git', Icon: GitIcon },
    { name: 'github', Icon: GithubIcon },
    { name: 'copilot', Icon: GithubCopilotIcon },
    { name: 'eclipse', Icon: EclipseIcon },
    { name: 'vscode', Icon: VSCodeIcon },
    { name: 'visualstudio', Icon: VSIcon },
    { name: 'windows10', Icon: W10Icon },
    { name: 'windows11', Icon: W11Icon },
    { name: 'linux', Icon: LinuxIcon },
    { name: 'mediawiki', Icon: MediawikiIcon },
];