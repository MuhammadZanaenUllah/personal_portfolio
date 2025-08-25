'use client';

import { useState } from 'react';
import { Award } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import type { Skill, Certification } from '@/lib/supabase';

interface SkillsClientProps {
  skills: Skill[];
  certifications: Certification[];
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesMastered: number;
    clientsSatisfied: number;
  };
}

export default function SkillsClient({ skills, certifications, stats }: SkillsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from skills
  const skillCategories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];

  // Filter skills based on selected category
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and certifications.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up animation-delay-200">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.yearsOfExperience}+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.projectsCompleted}+</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.technologiesMastered}+</div>
            <div className="text-gray-600 text-sm">Technologies</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.clientsSatisfied}+</div>
            <div className="text-gray-600 text-sm">Satisfied Clients</div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16 animate-fade-in-up animation-delay-400">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Technical Skills</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are the technologies and tools I work with regularly.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <Card key={skill.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {skill.category === 'Frontend' && '🎨'}
                        {skill.category === 'Backend' && '⚙️'}
                        {skill.category === 'Database' && '🗄️'}
                        {skill.category === 'DevOps' && '🚀'}
                        {skill.category === 'Mobile' && '📱'}
                        {skill.category === 'Design' && '✨'}
                        {skill.category === 'Other' && '🔧'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                        <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{skill.level}%</div>
                      <div className="text-xs text-gray-500">{skill.years_experience || 0}+ years</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Proficiency</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <ProgressBar 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                  
                  {skill.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{skill.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <div className="animate-fade-in-up animation-delay-600">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Certifications</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional certifications and achievements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{cert.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Issued: {new Date(cert.date).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          {cert.expiry_date && (
                            <span className="text-xs text-gray-500">
                              Expires: {new Date(cert.expiry_date).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                        {cert.credential_url && (
                          <a 
                            href={cert.credential_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Credential →
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}