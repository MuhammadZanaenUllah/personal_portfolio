'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { getProjects } from '@/lib/supabase';
import type { Project } from '@/lib/supabase';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Extract unique categories from projects
  const uniqueCategories = Array.from(new Set(projects.map(project => project.category)));
  const categories = [
    { key: 'all', label: 'All Projects', icon: '🚀' },
    ...uniqueCategories.map(cat => ({
      key: cat,
      label: cat,
      icon: cat === 'Full Stack' ? '💻' : cat === 'Frontend' ? '🎨' : cat === 'Backend' ? '⚙️' : cat === 'Mobile' ? '📱' : cat === 'Data Visualization' ? '📊' : cat === 'AI/ML' ? '🤖' : '🔧'
    }))
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, featuring full-stack applications, frontend interfaces, and backend services.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20 animate-fade-in-up animation-delay-200">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project) => (
              <div key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-xl card-hover group">
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🚀</div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{project.status}</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" 
                         className="px-6 py-3 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105">
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" 
                         className="px-6 py-3 border-2 border-black text-black rounded-full font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:scale-105">
                        View Code
                      </a>
                    )}
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="px-6 py-3 bg-blue-50 text-blue-700 rounded-full font-semibold transition-all duration-300 hover:bg-blue-100 hover:scale-105"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeFilter === category.key
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:scale-105'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up animation-delay-600">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group">
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-4xl opacity-50">💻</div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{project.status}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" 
                       className="flex-1 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold text-center transition-all duration-300 hover:bg-gray-800">
                      Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" 
                       className="flex-1 px-4 py-2 border border-black text-black rounded-full text-sm font-semibold text-center transition-all duration-300 hover:bg-black hover:text-white">
                      Code
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-blue-100"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up animation-delay-800">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Interested in Working Together?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and create amazing digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-xl">
              Start a Project
            </a>
            <a href="/about" className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl">
              Learn More About Me
            </a>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-8xl opacity-50">🚀</div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Project</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                {selectedProject.live_url && (
                  <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer" 
                     className="px-8 py-4 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800">
                    View Live Demo
                  </a>
                )}
                {selectedProject.github_url && (
                  <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" 
                     className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold transition-all duration-300 hover:bg-black hover:text-white">
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}