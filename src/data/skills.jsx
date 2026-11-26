import {
    SiJavascript, SiHtml5, SiCss3, SiMysql,
    SiReact, SiNodedotjs, SiExpress, SiTailwindcss, SiBootstrap,
    SiGit, SiMongodb, SiPostman, SiN8N, SiWordpress,
} from 'react-icons/si'

export const skillGroups = [
    { title: 'Languages', items: [
        { label: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
        { label: 'HTML5', icon: SiHtml5, color: '#e34f26' },
        { label: 'CSS3', icon: SiCss3, color: '#2d9bf0' },
        { label: 'SQL', icon: SiMysql, color: '#4aa3d6' },
    ] },
    { title: 'Frameworks', items: [
        { label: 'React', icon: SiReact, color: '#61dafb' },
        { label: 'Node.js', icon: SiNodedotjs, color: '#5fa04e' },
        { label: 'Express', icon: SiExpress, color: '#d9d9d4' },
        { label: 'Tailwind', icon: SiTailwindcss, color: '#38bdf8' },
        { label: 'Bootstrap', icon: SiBootstrap, color: '#a77bf3' },
    ] },
    { title: 'Tools', items: [
        { label: 'Git', icon: SiGit, color: '#f05032' },
        { label: 'MongoDB', icon: SiMongodb, color: '#47a248' },
        { label: 'Postman', icon: SiPostman, color: '#ff6c37' },
        { label: 'n8n', icon: SiN8N, color: '#ea4b71' },
        { label: 'WordPress', icon: SiWordpress, color: '#5b9dd9' },
    ] },
]
