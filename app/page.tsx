"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Palette, Server, Smartphone, Github, Linkedin, Mail, ExternalLink, Star, Users, Coffee, Award } from 'lucide-react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { 
  getPersonalInfo, 
  getFeaturedProjects, 
  getFeaturedBlogPosts, 
  getSkills,
  type PersonalInfo,
  type Project,
  type BlogPost,
  type Skill
} from '@/lib/supabase'
import { stats } from '@/data/skills' // Keep stats for now until we migrate them

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalData, projectsData, blogData] = await Promise.all([
          getPersonalInfo(),
          getFeaturedProjects(),
          getFeaturedBlogPosts()
        ])
        
        setPersonalInfo(personalData)
        setFeaturedProjects(projectsData)
        setFeaturedBlogPosts(blogData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unable to load data</h1>
          <p className="text-gray-600">Please check your Supabase configuration.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{personalInfo.name}</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 text-gray-700 animate-fade-in-up animation-delay-200">
              {personalInfo.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              {personalInfo.bio}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
            <a href="/projects" className="group relative px-8 py-4 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="/contact" className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl">
              Get In Touch
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up animation-delay-800">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.projectsCompleted}+</div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.yearsOfExperience}+</div>
              <div className="text-sm text-gray-600">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.clientsSatisfied}+</div>
              <div className="text-sm text-gray-600">Clients</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">
                    {project.category === 'Full Stack' && '🚀'}
                    {project.category === 'Frontend' && '🎨'}
                    {project.category === 'Mobile' && '📱'}
                    {project.category === 'Data Visualization' && '📊'}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{project.category}</Badge>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                     {project.technologies.slice(0, 3).map((tech) => (
                       <Badge key={tech} variant="default" className="text-xs">{tech}</Badge>
                     ))}
                     {project.technologies.length > 3 && (
                       <Badge variant="default" className="text-xs">+{project.technologies.length - 3}</Badge>
                     )}
                  </div>
                  <div className="flex gap-2">
                    {project.live_url && (
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </Button>
                    )}
                    {project.github_url && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button size="lg" className="group">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Recent Blog Posts Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Latest Blog Posts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development and technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">
                    📝
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                     {post.tags.slice(0, 2).map((tag) => (
                       <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                     ))}
                     {post.tags.length > 2 && (
                       <Badge variant="default" className="text-xs">+{post.tags.length - 2}</Badge>
                     )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                       <span>{post.read_time} min read</span>
                     </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="group">
                View All Posts
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Preview Section */}
      <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Skills & Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Skills will be loaded from database - placeholder for now */}
            {[
              { name: 'React', category: 'Frontend', level: 'Expert' },
              { name: 'Node.js', category: 'Backend', level: 'Advanced' },
              { name: 'TypeScript', category: 'Frontend', level: 'Expert' },
              { name: 'PostgreSQL', category: 'Database', level: 'Advanced' },
              { name: 'Next.js', category: 'Frontend', level: 'Expert' },
              { name: 'Docker', category: 'DevOps', level: 'Intermediate' },
              { name: 'React Native', category: 'Mobile', level: 'Advanced' },
              { name: 'Figma', category: 'Design', level: 'Intermediate' }
            ].map((skill) => (
              <div key={skill.name} className="group text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {skill.category === 'Frontend' && '🎨'}
                  {skill.category === 'Backend' && '⚙️'}
                  {skill.category === 'Database' && '🗄️'}
                  {skill.category === 'DevOps' && '🚀'}
                  {skill.category === 'Mobile' && '📱'}
                  {skill.category === 'Design' && '✨'}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{skill.name}</h3>
                <p className="text-xs text-gray-500">{skill.level}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/skills">
              <Button size="lg" variant="outline" className="group">
                View All Skills
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
