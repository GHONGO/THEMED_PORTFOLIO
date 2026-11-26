import { FaAws, FaShieldAlt, FaSyncAlt } from 'react-icons/fa'
import { SiGooglecloud, SiMeta, SiReact, SiMapbox } from 'react-icons/si'

// TODO: these 8 entries come from the GTA mockup. Replace with your real credentials.
//   earned  - year earned
//   expires - optional year; once passed, the status flips to "Expired" automatically
//   url     - link to the credential (Credly, Google Skills, etc.). Empty = button is shown disabled
//   color   - accent used for the badge glow
export const certifications = [
    { id: 'aws-dev', title: 'AWS Certified Developer - Associate', issuer: 'Amazon Web Services', earned: 2025, url: '', icon: FaAws, color: '#ff9900' },
    { id: 'gcp-engineer', title: 'Google Cloud Engineer', issuer: 'Google', earned: 2024, url: '', icon: SiGooglecloud, color: '#4f8df7' },
    { id: 'meta-frontend', title: 'Meta Frontend Developer', issuer: 'Meta', earned: 2025, url: '', icon: SiMeta, color: '#a78bfa' },
    { id: 'aws-practitioner', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', earned: 2024, url: '', icon: FaAws, color: '#ff9900' },
    { id: 'react-advanced', title: 'React Advanced', issuer: 'Meta', earned: 2025, url: '', icon: SiReact, color: '#61dafb' },
    { id: 'gis-dataviz', title: 'GIS & Data Visualization', issuer: 'Mapbox', earned: 2024, url: '', icon: SiMapbox, color: '#4f6bff' },
    { id: 'security-plus', title: 'Security+ Specialist', issuer: 'CompTIA', earned: 2023, url: '', icon: FaShieldAlt, color: '#c084fc' },
    { id: 'agile-leader', title: 'Agile Project Leader', issuer: 'Scrum Alliance', earned: 2024, url: '', icon: FaSyncAlt, color: '#6c8cff' },
]

export const isValid = (c) => !c.expires || c.expires >= new Date().getFullYear()

export const certStats = {
    total: certifications.length,
    validPct: Math.round((certifications.filter(isValid).length / certifications.length) * 100),
}
