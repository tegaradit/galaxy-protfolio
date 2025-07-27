import { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import React from '../assets/react.svg';
import Foto2 from '../assets/tegar2.JPG';
import Foto3 from '../assets/tegar3.JPG';
import Foto4 from '../assets/tegar4.JPG';

const ProfessionSection = () => {
  const [currentProfession, setCurrentProfession] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const professions = [
    { 
      text: "WEB DEVELOPER", 
      color: "from-blue-400 to-cyan-400",
      bgGlow: "shadow-blue-500/20",
      techStack: [
        { name: "React", icon: "⚛️", color: "#61DAFB", bg: "bg-blue-500/20" },
        { name: "Express", icon: "🚀", color: "#000000", bg: "bg-gray-500/20" },
        { name: "Node.js", icon: "🟢", color: "#339933", bg: "bg-green-500/20" },
        { name: "MySQL", icon: "🐬", color: "#4479A1", bg: "bg-blue-600/20" }
      ]
    },
    { 
      text: "CYBERSECURITY ENTHUSIAST", 
      color: "from-red-400 to-orange-400",
      bgGlow: "shadow-red-500/20",
      techStack: [
        { name: "Kali Linux", icon: "🐉", color: "#367588", bg: "bg-teal-500/20" },
        { name: "Metasploit", icon: "🛡️", color: "#2596CD", bg: "bg-blue-500/20" },
        { name: "Wireshark", icon: "🦈", color: "#1679A7", bg: "bg-blue-600/20" },
        { name: "Burp Suite", icon: "🔍", color: "#FF6633", bg: "bg-orange-500/20" }
      ]
    },
    { 
      text: "AI ENTHUSIAST", 
      color: "from-purple-400 to-pink-400",
      bgGlow: "shadow-purple-500/20",
      techStack: [
        { name: "Python", icon: "🐍", color: "#3776AB", bg: "bg-blue-500/20" },
        { name: "TensorFlow", icon: "🧠", color: "#FF6F00", bg: "bg-orange-500/20" },
        { name: "PyTorch", icon: "🔥", color: "#EE4C2C", bg: "bg-red-500/20" },
        { name: "OpenAI", icon: "🤖", color: "#10A37F", bg: "bg-green-500/20" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out animation
      setIsTransitioning(true);
      setIsTyping(false);
      
      // Wait for fade out to complete, then change profession
      setTimeout(() => {
        setCurrentProfession((prev) => (prev + 1) % professions.length);
      }, 600);
      
      // Start fade in animation
      setTimeout(() => {
        setIsTransitioning(false);
        setIsTyping(true);
      }, 800);
    }, 5000); // Increased interval for smoother experience

    return () => clearInterval(interval);
  }, [professions.length]);

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
    <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Modern Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              transform: `translate(${mousePosition.x * (i + 1) * 0.02}px, ${mousePosition.y * (i + 1) * 0.02}px) rotate(${i * 45}deg)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className={`w-12 h-12 ${i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'} ${i % 3 === 0 ? 'rounded-full' : 'rounded-lg'} animate-pulse`}
                 style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }} />
          </div>
        ))}
        
        {/* Tech-themed particles */}
        {['{ }', '</>', '< />', 'AI', 'DB', 'API'].map((symbol, i) => (
          <div
            key={symbol}
            className="absolute text-purple-500/20 font-mono text-2xl font-bold animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '4s',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text and Tech Stack */}
          <AnimatedSection className="space-y-10">
            {/* Main Text with smooth transitions */}
            <div className="space-y-6 min-h-[200px] flex flex-col justify-center">
              <AnimatedSection>
                <div className="relative">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-orbitron tracking-wider leading-tight">
                    I'M,
                  </h1>
                  <div className="mt-2 relative min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-center">
                    <span 
                      className={`text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${professions[currentProfession].color} bg-clip-text text-transparent font-orbitron tracking-wider leading-tight transition-all duration-1000 ease-out ${
                        isTyping && !isTransitioning 
                          ? 'opacity-100 scale-100 translate-y-0 blur-0' 
                          : 'opacity-0 scale-95 translate-y-8 blur-sm'
                      }`}
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      {professions[currentProfession].text}
                    </span>
                    
                    {/* Enhanced typing cursor */}
                    <div 
                      className={`ml-2 w-2 bg-gradient-to-b ${professions[currentProfession].color} transition-all duration-500 ease-out ${
                        isTyping && !isTransitioning 
                          ? 'h-16 md:h-20 lg:h-24 opacity-100 animate-pulse' 
                          : 'h-0 opacity-0'
                      }`}
                      style={{ 
                        animationDuration: '1.2s',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Enhanced status indicator */}
              <div className={`flex items-center space-x-3 transition-all duration-700 ease-out ${
                isTyping && !isTransitioning ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-4'
              }`}>
                <div 
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${professions[currentProfession].color} transition-all duration-500`}
                  style={{
                    animation: isTyping && !isTransitioning ? 'pulse 2s ease-in-out infinite' : 'none'
                  }}
                />
                <span className="text-gray-300 text-lg font-medium">
                  {isTransitioning ? 'Switching expertise...' : 'Currently specializing in...'}
                </span>
              </div>
            </div>

            {/* Tech Stack with Enhanced Animations */}
            <AnimatedSection delay={300}>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <h3 className="text-2xl text-white font-bold font-orbitron">Tech Arsenal</h3>
                  <div 
                    className={`h-1 flex-1 bg-gradient-to-r ${professions[currentProfession].color} rounded-full transition-all duration-1000 ease-out ${
                      isTyping && !isTransitioning ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-60'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {professions[currentProfession].techStack.map((tech, index) => (
                    <div
                      key={`${currentProfession}-${tech.name}`}
                      className={`group relative ${tech.bg} backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-700 hover:scale-105 hover:${professions[currentProfession].bgGlow} cursor-pointer overflow-hidden`}
                      style={{
                        opacity: isTyping && !isTransitioning ? 1 : 0.3,
                        transform: isTyping && !isTransitioning ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: `${index * 100 + (isTransitioning ? 0 : 400)}ms`
                      }}
                    >
                      {/* Enhanced hover glow effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-2xl blur-sm"
                        style={{
                          background: `radial-gradient(circle at center, ${tech.color}60, transparent 70%)`
                        }}
                      />
                      
                      <div className="relative text-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-all duration-500 filter group-hover:drop-shadow-lg group-hover:brightness-110">
                          {tech.icon}
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-all duration-300">
                          {tech.name}
                        </div>
                      </div>
                      
                      {/* Enhanced corner accent */}
                      <div 
                        className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${tech.color}, transparent)`,
                          clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Enhanced Navigation Dots */}
            <AnimatedSection delay={600}>
              <div className="flex items-center justify-center space-x-4 mt-8">
                {professions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index !== currentProfession) {
                        setIsTransitioning(true);
                        setIsTyping(false);
                        setTimeout(() => {
                          setCurrentProfession(index);
                          setIsTransitioning(false);
                          setIsTyping(true);
                        }, 400);
                      }
                    }}
                    className={`relative transition-all duration-500 ease-out ${
                      currentProfession === index
                        ? 'w-8 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full scale-110'
                        : 'w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-500 hover:scale-125'
                    }`}
                  >
                    {currentProfession === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-75" />
                    )}
                  </button>
                ))}
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Right Side - Enhanced Profile Section */}
          <AnimatedSection delay={400} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Profile Container with responsive sizing */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Enhanced rotating rings */}
                <div className="absolute inset-0">
                  {[0, 1, 2].map((ring) => (
                    <div
                      key={ring}
                      className={`absolute rounded-full border-2 transition-all duration-1000 ease-out ${
                        isTyping && !isTransitioning ? 'opacity-30 animate-spin-slow' : 'opacity-10'
                      }`}
                      style={{
                        inset: `${ring * 8}px`, // Reduced ring spacing for mobile
                        borderColor: professions[currentProfession].color.includes('blue') ? '#3B82F6' :
                                   professions[currentProfession].color.includes('red') ? '#EF4444' :
                                   professions[currentProfession].color.includes('purple') ? '#8B5CF6' :
                                   professions[currentProfession].color.includes('green') ? '#10B981' :
                                   '#F59E0B',
                        animationDuration: `${15 + ring * 5}s`,
                        animationDirection: ring % 2 === 0 ? 'normal' : 'reverse'
                      }}
                    />
                  ))}
                </div>
                
                {/* Enhanced Profile Image Container */}
                <div className={`absolute inset-4 sm:inset-5 md:inset-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
                  professions[currentProfession].bgGlow
                } ${isTyping && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
                    {/* Enhanced background pattern */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${
                      isTyping && !isTransitioning ? 'opacity-10' : 'opacity-5'
                    }`}>
                      <div className={`w-full h-full bg-gradient-to-br ${professions[currentProfession].color}`} />
                    </div>
                    
                    {/* Dynamic Profile Photo based on profession */}
                    <div className={`relative w-full h-full transition-all duration-1000 ease-out ${
                      isTyping && !isTransitioning ? 'scale-100 opacity-100 blur-0' : 'scale-90 opacity-70 blur-sm'
                    }`}>
                      {/* Web Developer Photo */}
                      {currentProfession === 0 && (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQjgyRjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
                          <div className="text-6xl sm:text-7xl md:text-8xl z-10 filter drop-shadow-lg"><img src={Foto2}  className='aspect-square object-cover w-64 h-64 rounded-full border-4 border-white shadow-lg' alt="" /></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                            <span className="text-lg">⚛️</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Cybersecurity Photo */}
                      {currentProfession === 1 && (
                        <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRUY0NDQ0IiBmaWxsLW9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTIwIDIwLjVWMThIOHYtMmgxMnYtMi41TDggMTZsMTItMi41VjExSDhWOWgxMlY2LjVMOCA5bDEyLTIuNVY0SDhWMmgxMnYyLjVsMTIgMi41VjRIMjB2MmgxMnYySDB2Mi41bDEyLTIuNVY5SDIwdjJoMTJ2MkgyMHYyLjVsMTItMi41VjE2SDIweiIvPjwvZz48L3N2Zz4=')] opacity-20" />
                          <div className="text-6xl sm:text-7xl md:text-8xl z-10 filter drop-shadow-lg"><img src={Foto3}  className=' aspect-square object-cover w-64 h-64 rounded-full border-4 border-white shadow-lg' alt="" /></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center">
                            <span className="text-lg">🛡️</span>
                          </div>
                        </div>
                      )}
                      
                      {/* AI Enthusiast Photo */}
                      {currentProfession === 2 && (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOEI1Q0Y2IiBmaWxsLW9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTAgMGg4MHY4MEgwVjB6bTIwIDIwdjQwaDQwVjIwSDIwem0yMCAzNWExNSAxNSAwIDEgMSAwLTMwIDE1IDE1IDAgMCAxIDAgMzB6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+')] opacity-20" />
                          <div className="text-6xl sm:text-7xl md:text-8xl z-10 filter drop-shadow-lg"><img src={Foto4} alt="" className='aspect-square object-cover w-64 h-64 rounded-full border-4 border-white shadow-lg' /></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center">
                            <span className="text-lg">🧠</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Tech Icons */}
                {professions[currentProfession].techStack.map((tech, i) => (
                  <div
                    key={`${currentProfession}-${tech.name}-icon`}
                    className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-black/60 backdrop-blur-sm border border-purple-400/50 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-1000 ease-out hover:scale-110"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-${window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : window.innerWidth < 1024 ? 180 : 200}px) rotate(-${i * 90}deg)`,
                      opacity: isTyping && !isTransitioning ? 1 : 0.3,
                      transitionDelay: `${i * 150}ms`
                    }}
                  >
                    {tech.icon}
                  </div>
                ))}
              </div>

              {/* Enhanced Status Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2">
                <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-2 sm:space-x-3 shadow-lg shadow-green-500/25 backdrop-blur-sm border border-green-400/30 transition-all duration-700 ${
                  isTyping && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
                }`}>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="whitespace-nowrap">Available for projects</span>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Enhanced Call to Action */}
        <AnimatedSection delay={800} className="text-center mt-16 sm:mt-20">
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center transition-all duration-700 px-4 ${
            isTyping && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-4'
          }`}>
            <button 
              className="group px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/25 relative overflow-hidden text-sm sm:text-base"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>Explore My Universe</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              className="group px-6 sm:px-10 py-3 sm:py-4 border-2 border-purple-500 rounded-full text-purple-300 font-bold hover:bg-purple-500/20 hover:border-purple-400 transform hover:scale-105 transition-all duration-300 relative overflow-hidden text-sm sm:text-base"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>📡</span>
                <span>Let's Connect</span>
              </span>
            </button>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
    );
};

export default ProfessionSection;