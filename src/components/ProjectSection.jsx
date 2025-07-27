import React, { useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:3000/api/portfolio'; // Ganti sesuai backend kamu

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data);
                console.log(setProjects(data));
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProjects();
    }, []);

    return (
        <AnimatedSection className="min-h-screen flex items-center justify-center py-20">
            <div className="max-w-7xl mx-auto px-4">
                <AnimatedSection>
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
                        Mission Archives
                    </h2>
                </AnimatedSection>

                {error ? (
                    <p className="text-red-400 text-center">{error}</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <AnimatedSection
                                key={project.id || index}
                                delay={index * 150}
                                className="group bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20"
                            >
                                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={`http://localhost:3000${project.image}`} // Ganti dengan domain backend kamu
                                        alt={project.title}
                                        className="w-full h-48 object-cover rounded-t"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white font-orbitron">{project.title}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'Deployed' ? 'bg-green-500/20 text-green-400' :
                                            project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-400 mb-4">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(project.tech?.split(',') || []).map((tech, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                {tech}
                                            </span>
                                        ))}

                                    </div>

                                    <div className="flex space-x-3">
                                        {project.link_website && (
                                            <a
                                                href={"https://"+project.link_website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors text-center"
                                            >
                                                🚀 Launch
                                            </a>
                                        )}
                                        {project.link_github && (
                                            <a
                                                href={project.link_github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-colors text-center"
                                            >
                                                📋 Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                )}
            </div>
        </AnimatedSection>
    );
};

export default ProjectsSection;
