import React from 'react';
import Github from '../assets/github1.svg';
import Instagram from '../assets/ig.svg';
import Linkedin from '../assets/linkedin.svg';


const Footer = () => {
    return (
        <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-500/30 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">🌌</div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">
                        Thanks for Visiting My Portfolio
                    </h3>

                    <div className="flex justify-center space-x-6 mb-8">
                        <a
                            href="https://github.com/tegaradit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:border-purple-400/60 transition-all duration-300 hover:scale-110"
                        >
                            <img src={Github} alt="GitHub" className="w-6 h-6" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/tegar-adityansyah-kurniawan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:border-purple-400/60 transition-all duration-300 hover:scale-110"
                        >
                            <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
                        </a>

                        <a
                            href="https://www.instagram.com/_tegarr29/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center hover:border-purple-400/60 transition-all duration-300 hover:scale-110"
                        >
                            <img src={Instagram} alt="Instagram" className="w-6 h-6" />
                        </a>
                    </div>


                    <div className="border-t border-purple-500/30 pt-6">
                        <p className="text-gray-500 text-sm">
                            © 2025 Tegar Adityansyah Kurniawan
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;