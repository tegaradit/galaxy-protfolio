import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-900 to-red-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transform: `translate(${mousePosition.x * (i + 1) * 0.1}px, ${mousePosition.y * (i + 1) * 0.1}px)`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div
          className="transform transition-transform duration-300"
          style={{ transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-orbitron animate-fade-in-up">
            TEGAR 
          </h1>
          <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 font-exo animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            IT PEOPLE
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            Crafting digital experiences that transcend earthly boundaries.
            Welcome to my cosmic portfolio where code meets creativity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <button 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
              onClick={() => {
                document.getElementById('profession')?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🚀 Launch Portfolio
            </button>
            <button 
              className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-300 font-semibold hover:bg-purple-500/20 transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              📡 Contact Mission Control
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;