'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import Card, { CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { type Project } from '@/lib/supabase'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }))
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="relative h-48 rounded-t-lg overflow-hidden">
            {project.image && !imageErrors[project.id] ? (
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={192}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => handleImageError(project.id)}
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center text-4xl opacity-50">
                {project.category === 'Full Stack' && '🚀'}
                {project.category === 'Frontend' && '🎨'}
                {project.category === 'Mobile' && '📱'}
                {project.category === 'Data Visualization' && '📊'}
              </div>
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
              <div className="flex gap-2">
                {project.github_url && (
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {project.live_url && (
                  <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies?.slice(0, 3).map((tech, index) => (
                <Badge key={index} variant="default" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies && project.technologies.length > 3 && (
                <Badge variant="default" className="text-xs">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}