// Personal details used across themes.
// Items marked TODO are placeholders taken from the GTA mockups - replace with your real info.

export const profile = {
    name: 'Griffin Hongo',
    role: 'Full-Stack Developer',
    summary:
        'Software engineer who treats code as a tool for solving real human problems. I build fast, intuitive products with React, Node.js and MongoDB, from backend APIs to polished, responsive interfaces.',

    cv: "/Griffin%20Hongo%27s%20RESUME.pdf",
    formEndpoint: 'https://formspree.io/f/mkowekga',
    calendly: 'https://calendly.com/williamghongo/schedule-meeting',

    email: 'williamghongo@gmail.com', // TODO: confirm this is the address you want published
    whatsapp: '+254 740 719 552',
    socials: {
        github: 'https://github.com/GHONGO',
        linkedin: 'https://www.linkedin.com/in/griffin-hongo',
        whatsapp: 'https://wa.me/+254740719552',
    },

    // TODO: placeholder employers from the mockup - replace with your real experience.
    experience: [
        { role: 'Web Administrator', company: 'Dr.Kennedy Hongo Foundation', period: '2024 - Present', summary: 'Headed web experiences, interactive maps, and client projects.' },
        { role: 'Full-Stack Engineer', company: 'Vinewood Labs', period: '2022 - 2024', summary: 'Built robust backend services and web-based applications.' },
    ],

    // TODO: self-rated skill levels (GTA About page stat bars).
    attributes: [
        { label: 'Frontend development', value: 90 },
        { label: 'Backend & cloud', value: 85 },
        { label: 'UI/UX design', value: 75 },
        { label: 'Database systems', value: 80 },
        { label: 'Coffee consumption', value: 100 },
    ],

    // Shown on the certifications page header.
    certLevel: 'Senior Dev', // TODO: edit to taste
}
