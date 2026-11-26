import React from 'react'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { profile } from '../data/profile'


export default function Footer() {
    return (
        <footer className="bg-[var(--surface)] border-t border-gray-800 mt-12">
            <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
                <div className="text-sm text-gray-400">© {new Date().getFullYear()} Griffin Hongo. All rights reserved.</div>
                <div className="flex space-x-4 mt-3 md:mt-0">
                    <a href={profile.socials.github} className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"> <FaLinkedin size={24} /></a>
                    <a href={profile.socials.whatsapp} className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={24} /></a>

                </div>
            </div>
        </footer>
    )
}


