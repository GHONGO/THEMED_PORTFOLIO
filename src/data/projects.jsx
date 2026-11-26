import WasteMap from '../assets/Wastemap.png';
import NGO from '../assets/NGO.png';
import Chatapp from '../assets/Chatapp.png';
import Gymplanner from '../assets/Gymplanner.png';
import LIB from '../assets/LIB.png';

// category: 'web' | 'mobile' | 'ux' | 'client' | 'misc'  (GTA theme builds its filter chips from these)
// difficulty: 'Easy' | 'Medium' | 'Hard'
const projects = [
    {
        id: 1,
        title: 'Dr.Kennedy Hongo Foundation',
        summary: 'This is a non-profit organization aimed at Providing African Solutions to African Challenges (PASTAC), through Leadership, Education & Legislation. And Promoting STARNORMICS and the Making of STARNORMS and, the promotion of fairness and justice.',
        tech: ['Wordpress'],
        category: 'client', difficulty: 'Medium',
        link: 'https://drkennedyhongofoundation.org/',
        image: NGO  
    },           
     {
        id: 2,
        title: 'Laser Insurance Brokers',
        summary: 'Updated the Laser Insurance Brokers corporate website by integrating dedicated Marine Insurance and Engineering & Construction Insurance sections, improving product visibility, accessibility and the overall digital presence.',
        tech: ['WordPress'],
        category: 'client', difficulty: 'Medium',
        link: 'https://lib-insurance.co.ke/marine-insurance-solutions/',
        image: LIB
    },
    {
        id: 3,
        title: 'Waste Map',
        summary: 'WasteMap is a full-stack web application that empowers communities and municipalities to manage waste efficiently. Citizens can report waste issues with photos and GPS locations, while municipal authorities can assign cleanup teams, optimize routes, and monitor cleanup performance in real time.',
        tech: ['React', 'Express', 'MongoDB'],
        category: 'web', difficulty: 'Hard',
        link: 'https://wastemap.netlify.app/',
        image: WasteMap  
    },
    {
        id: 4,
        title: 'Chat App',
        summary: 'A fully featured real time chat application with bidirectional communication between clients with advanced chat features.',
        tech: ['React','Tailwind/CSS', 'Express', 'Socket.io','MongoDb'],
        category: 'web', difficulty: 'Hard',
        link: 'https://realtimesocketiochat.netlify.app/',
        image: Chatapp
    },
    {
        id: 5,
        title: 'GOLDEN FITNESS',
        soon: true,
        summary: 'A modern full-stack fitness platform built with the MERN stack. Designed to help users create personalized workout routines, plan budget-friendly diets, and interact within a growing fitness community.',
        tech: ['React', 'Tailwind/CSS', 'Express.js', 'MongoDb','Node.js', 'Socket.io'],
        category: 'web', difficulty: 'Hard',
        link: '#',
        image: Gymplanner
    }
]

export default projects
