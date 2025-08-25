'use client';
import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { getSkills, getCertifications } from '@/lib/supabase';
import type { Skill, Certification } from '@/lib/supabase';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories from skills
  const skillCategories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];

  // Mock stats for now (can be moved to Supabase later)
  const stats = {
    yearsOfExperience: 5,
    projectsCompleted: 50,
    technologiesMastered: 25,
    clientsSatisfied: 20
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [skillsData, certificationsData] = await Promise.all([
          getSkills(),
          getCertifications()
        ]);
        
        setSkills(skillsData);
        setCertifications(certificationsData);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
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
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and technologies I work with.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-200">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mb-20 animate-fade-in-up animation-delay-400">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              {selectedCategory === 'All' ? 'All Skills' : `${selectedCategory} Skills`}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skills.filter(skill => selectedCategory === 'All' || skill.category === selectedCategory).map((skill, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 card-hover group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {skill.level}%
                    </Badge>
                  </div>
                  <ProgressBar 
                    value={skill.level} 
                    className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2"
                  />
                  <p className="text-sm text-gray-600">{skill.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">{skill.years_experience} years experience</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-20 animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">{new Date(cert.date).getFullYear()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center animate-fade-in-up animation-delay-800">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            With expertise across the full stack and a passion for creating exceptional user experiences, 
            I&apos;m ready to tackle your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/projects" className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-xl">
              View My Projects
            </a>
            <a href="/contact" className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-blue-600 hover:scale-105 hover:shadow-xl">
              Let&apos;s Collaborate
            </a>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animation-delay-1000">
          {[
            { label: 'Years Experience', value: `${stats.yearsOfExperience}+`, icon: '📅' },
            { label: 'Projects Completed', value: `${stats.projectsCompleted}+`, icon: '🚀' },
            { label: 'Technologies', value: `${stats.technologiesMastered}+`, icon: '⚡' },
            { label: 'Clients Satisfied', value: `${stats.clientsSatisfied}+`, icon: '🏆' }
          ].map((stat, index) => {
            const colors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600'];
            return (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold ${colors[index % colors.length]} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}