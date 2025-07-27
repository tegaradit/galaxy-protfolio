import React from 'react';
import tegar from '../assets/tegar.jpg';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => {
    return (
        <AnimatedSection className="min-h-screen flex items-center justify-center py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <AnimatedSection delay={200}>
                        <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
                            About Me?
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                I'm a web developer born under the warm sun of Kebumen, Central Java — a humble corner of Indonesia with dreams that reach the stars.
                            </p>
                            <p>
                                Fueled by curiosity and caffeine, I specialize in crafting digital systems that don't just function — they resonate. From building real-time applications to architecting backend systems that power massive platforms, my mission is clear: to turn complex ideas into intuitive, powerful experiences.
                            </p>
                            <p>
                                In my journey through the code cosmos, I’ve explored various technologies like JavaScript, PHP, Node.js, and Laravel. I thrive on solving real-world problems — whether it's managing large-scale futsal tournaments, designing face recognition systems, or building AI tools for cybersecurity.
                            </p>
                            <p>When I'm not on the keyboard piloting the next app, you’ll find me contributing to open-source missions, experimenting with drones and IoT, or gazing into the digital nebula dreaming up my next innovation.
                                Let’s build something extraordinary — together.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-300">
                                <div className="text-3xl font-bold text-purple-400 font-orbitron">20+</div>
                                <div className="text-gray-400">Projects Launched</div>
                            </div>
                            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-300">
                                <div className="text-3xl font-bold text-blue-400 font-orbitron">3+</div>
                                <div className="text-gray-400">Years in Orbit</div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={400} className="relative">
                        <div className="relative w-80 h-80 mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30 animate-spin-slow"></div>
                            <div className="absolute inset-8 bg-black/40 backdrop-blur-sm border-2 border-purple-400/50 rounded-full flex items-center justify-center">
                                <div className="text-6xl"><img
                                    src={tegar}
                                    className="rounded-full w-64 h-64 object-cover border-4 border-purple-400 shadow-lg"
                                    alt="Tegar"
                                />
                                </div>
                            </div>

                            {/* Orbiting icons */}
                            {['⚛️', '🎯', '🚀', '💻'].map((icon, i) => (
                                <div
                                    key={i}
                                    className="absolute w-12 h-12 bg-black/60 backdrop-blur-sm border border-purple-400/50 rounded-full flex items-center justify-center text-xl"
                                    style={{
                                        top: 0,
                                        left: '100%',
                                        transform: `rotate(${i * 90}deg) translateX(120px) rotate(-${i * 90}deg)`,
                                        transformOrigin: 'top left',
                                        animation: 'spin 10s linear infinite',
                                        animationDelay: `${i * 0.5}s`
                                    }}
                                >
                                    {icon}
                                </div>
                            ))}

                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default AboutSection;