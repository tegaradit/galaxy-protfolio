import React from 'react';
import AnimatedSection from './AnimatedSection';

const SkillsSection = () => {
  const skills = [
    { name: 'React', level: 95, icon: '⚛️', color: 'from-blue-400 to-cyan-400' },
    { name: 'JavaScript', level: 90, icon: '🟨', color: 'from-yellow-400 to-orange-400' },
    { name: 'Three.js', level: 85, icon: '🎮', color: 'from-green-400 to-emerald-400' },
    { name: 'Node.js', level: 88, icon: '🟢', color: 'from-green-500 to-lime-400' },
    { name: 'Python', level: 82, icon: '🐍', color: 'from-blue-500 to-green-500' },
    { name: 'UI/UX', level: 87, icon: '🎨', color: 'from-purple-400 to-pink-400' }
  ];

  return (
    <AnimatedSection className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
            Cosmic Arsenal
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <AnimatedSection
              key={skill.name}
              delay={index * 100}
              className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:scale-105 transform transition-all duration-300 hover:border-purple-400/60"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-xl font-semibold text-white font-orbitron">{skill.name}</h3>
                </div>
                <span className="text-purple-400 font-bold">{skill.level}%</span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out skill-bar`}
                  style={{ 
                    '--skill-width': `${skill.level}%`,
                    animationDelay: `${index * 100 + 200}ms`
                  }}
                ></div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;