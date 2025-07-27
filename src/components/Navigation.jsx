import React, { useState } from 'react';

const Navigation = ({ activeSection, setActiveSection, isVisible }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍🚀' },
    { id: 'profession', label: 'Profession', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '📡' }
  ];

  const handleNavClick = (itemId) => {
    setActiveSection(itemId);
    setIsMobileMenuOpen(false); // Close mobile menu after click
    document.getElementById(itemId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav 
        className={`hidden lg:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-full px-6 py-3">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-purple-600/50 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/30'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-orbitron text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Horizontal scroll for tablets */}
      <nav 
        className={`hidden md:block lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out max-w-[90vw] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-2">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeSection === item.id
                    ? 'bg-purple-600/50 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/30'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-orbitron text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Icon only for phones */}
      <nav 
        className={`md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-full px-3 py-2">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-purple-600/50 text-white scale-110'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/30 hover:scale-105'
                }`}
                title={item.label} // Tooltip for accessibility
              >
                <span className="text-sm">{item.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Alternative: Bottom Navigation for Mobile */}
      {/* Uncomment this section if you prefer bottom navigation
      <nav 
        className={`md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-16'
        }`}
      >
        <div className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-3">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-purple-600/50 text-white scale-110'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/30'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-orbitron mt-1 hidden">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      */}

      {/* Hamburger Menu Alternative - More space efficient */}
      {/* 
      <div className={`md:hidden fixed top-4 right-4 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-full flex items-center justify-center text-white hover:bg-purple-500/30 transition-all duration-300"
        >
          <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-0 bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 min-w-[180px]">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-purple-600/50 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-purple-500/30'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-orbitron text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      */}

      <style jsx>{`
        /* Hide scrollbar for horizontal scroll */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Safari and Chrome */
        }
        
        /* Smooth scrolling for horizontal nav */
        .scrollbar-hide {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default Navigation;