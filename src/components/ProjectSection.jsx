import React from 'react';
import AnimatedSection from './AnimatedSection';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Stellar Dashboard",
      description: "A cosmic analytics platform with real-time data visualization",
      tech: ["React", "D3.js", "Node.js"],
      image: "🌌",
      status: "Deployed"
    },
    {
      title: "Quantum Portfolio",
      description: "Interactive 3D portfolio showcasing multidimensional creativity",
      tech: ["Three.js", "React", "GSAP"],
      image: "🚀",
      status: "In Development"
    },
    {
      title: "Nebula CMS",
      description: "Content management system for intergalactic businesses",
      tech: ["Vue.js", "Express", "MongoDB"],
      image: "🌠",
      status: "Beta"
    }
  ];

  return (
    <AnimatedSection className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
            Mission Archives
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              delay={index * 150}
              className="group bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white font-orbitron">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Deployed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors">
                    🚀 Launch
                  </button>
                  <button className="px-4 py-2 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-colors">
                    📋 Code
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;