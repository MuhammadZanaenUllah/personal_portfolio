import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client is now handled server-side via API routes

// Database Types
export interface ContactForm {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  status?: 'unread' | 'read' | 'replied'
  created_at?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  published_at: string
  updated_at?: string
  category: string
  tags: string[]
  featured: boolean
  image: string
  read_time: number
  views: number
  likes: number
  slug: string
}

export interface Project {
  id: string
  title: string
  description: string
  long_description: string
  image: string
  technologies: string[]
  category: string
  github_url?: string
  live_url?: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  start_date: string
  end_date?: string
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string
  description?: string
  years_experience?: number
  created_at?: string
  updated_at?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
  start_date: string
  end_date?: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  technologies: string[]
  achievements: string[]
  created_at?: string
  updated_at?: string
}

export interface PersonalInfo {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  avatar: string
  resume_url?: string
  social_links: Record<string, string>
  working_hours: Record<string, string>
  languages: Array<{name: string, level: string}>
  interests: string[]
  created_at?: string
  updated_at?: string
}

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  avatar: string
  rating: number
  featured: boolean
  created_at?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: string
  icon?: string
  url?: string
  created_at?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiry_date?: string
  credential_id?: string
  credential_url?: string
  badge_url?: string
  created_at?: string
}

// Fallback data for when Supabase tables don't exist yet
const fallbackPersonalInfo: PersonalInfo = {
  id: '1',
  name: 'Alex Johnson',
  title: 'Full Stack Developer & UI/UX Designer',
  bio: 'Passionate developer with 5+ years of experience creating beautiful, functional web applications.',
  email: 'alex@example.com',
  phone: '+1 (234) 567-8900',
  location: 'San Francisco, CA',
  avatar: '/api/placeholder/150/150',
  resume_url: '/resume.pdf',
  social_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  working_hours: {
    timezone: 'PST',
    availability: '9 AM - 6 PM'
  },
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Conversational' }
  ],
  interests: ['Web Development', 'UI/UX Design', 'Open Source']
};

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with React and Node.js',
    long_description: 'A comprehensive e-commerce platform built with modern technologies.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web Application',
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    featured: true,
    status: 'completed',
    start_date: '2023-01-01',
    end_date: '2023-06-01'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    long_description: 'A real-time collaborative task management application.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Socket.io', 'MongoDB'],
    category: 'Web Application',
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    featured: true,
    status: 'completed',
    start_date: '2023-07-01',
    end_date: '2023-12-01'
  }
];

const fallbackSkills: Skill[] = [
  { id: '1', name: 'React', level: 90, category: 'Frontend', years_experience: 4 },
  { id: '2', name: 'Node.js', level: 85, category: 'Backend', years_experience: 3 },
  { id: '3', name: 'TypeScript', level: 88, category: 'Frontend', years_experience: 3 },
  { id: '4', name: 'PostgreSQL', level: 80, category: 'Database', years_experience: 2 }
];

const fallbackExperience: Experience[] = [
  {
    id: '1',
    company: 'Tech Corp',
    position: 'Senior Full Stack Developer',
    description: 'Led development of web applications using React and Node.js',
    start_date: '2022-01-01',
    end_date: undefined,
    location: 'San Francisco, CA',
    type: 'full-time',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    achievements: ['Improved app performance by 40%', 'Led team of 5 developers']
  }
];

const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React development',
    content: 'React is a powerful library for building user interfaces...',
    author: 'Alex Johnson',
    published_at: '2024-01-15',
    category: 'Tutorial',
    tags: ['React', 'JavaScript', 'Frontend'],
    featured: true,
    image: '/api/placeholder/600/400',
    read_time: 5,
    views: 1250,
    likes: 45,
    slug: 'getting-started-react'
  }
];

// API Functions
export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .single()
    
    if (error) {
      console.log('Using fallback personal info - database not set up yet')
      return fallbackPersonalInfo
    }
    return data
  } catch (error) {
    console.log('Using fallback personal info:', error)
    return fallbackPersonalInfo
  }
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log('Using fallback projects - database not set up yet')
      return fallbackProjects
    }
    return data || fallbackProjects
  } catch (error) {
    console.log('Using fallback projects:', error)
    return fallbackProjects
  }
}

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log('Using fallback featured projects - database not set up yet')
      return fallbackProjects.filter(p => p.featured)
    }
    return data || fallbackProjects.filter(p => p.featured)
  } catch (error) {
    console.log('Using fallback featured projects:', error)
    return fallbackProjects.filter(p => p.featured)
  }
}

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('level', { ascending: false })
    
    if (error) {
      console.log('Using fallback skills - database not set up yet')
      return fallbackSkills
    }
    return data || fallbackSkills
  } catch (error) {
    console.log('Using fallback skills:', error)
    return fallbackSkills
  }
}

export const getSkillsByCategory = async (category: string): Promise<Skill[]> => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category', category)
      .order('level', { ascending: false })
    
    if (error) {
      console.log('Using fallback skills by category - database not set up yet')
      return fallbackSkills.filter(s => s.category === category)
    }
    return data || fallbackSkills.filter(s => s.category === category)
  } catch (error) {
    console.log('Using fallback skills by category:', error)
    return fallbackSkills.filter(s => s.category === category)
  }
}

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false })
    
    if (error) {
      console.log('Using fallback experience - database not set up yet')
      return fallbackExperience
    }
    return data || fallbackExperience
  } catch (error) {
    console.log('Using fallback experience:', error)
    return fallbackExperience
  }
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
    
    if (error) {
      console.log('Using fallback blog posts - database not set up yet')
      return fallbackBlogPosts
    }
    return data || fallbackBlogPosts
  } catch (error) {
    console.log('Using fallback blog posts:', error)
    return fallbackBlogPosts
  }
}

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false })
    
    if (error) {
      console.log('Using fallback featured blog posts - database not set up yet')
      return fallbackBlogPosts.filter(p => p.featured)
    }
    return data || fallbackBlogPosts.filter(p => p.featured)
  } catch (error) {
    console.log('Using fallback featured blog posts:', error)
    return fallbackBlogPosts.filter(p => p.featured)
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.log('Using fallback blog post by slug - database not set up yet')
      return fallbackBlogPosts.find(p => p.slug === slug) || null
    }
    return data
  } catch (error) {
    console.log('Using fallback blog post by slug:', error)
    return fallbackBlogPosts.find(p => p.slug === slug) || null
  }
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log('Using fallback testimonials - database not set up yet')
      return []
    }
    
    return data || []
  } catch (error) {
    console.log('Using fallback testimonials:', error)
    return []
  }
}

export const getFeaturedTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log('Using fallback featured testimonials - database not set up yet')
      return []
    }
    
    return data || []
  } catch (error) {
    console.log('Using fallback featured testimonials:', error)
    return []
  }
}

export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) {
      console.log('Using fallback achievements - database not set up yet')
      return []
    }
    
    return data || []
  } catch (error) {
    console.log('Using fallback achievements:', error)
    return []
  }
}

export const getCertifications = async (): Promise<Certification[]> => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) {
      console.log('Using fallback certifications - database not set up yet')
      return []
    }
    
    return data || []
  } catch (error) {
    console.log('Using fallback certifications:', error)
    return []
  }
}

export const submitContactForm = async (formData: Omit<ContactForm, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData])
    
    if (error) {
      console.log('Contact form submission failed - database not set up yet:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.log('Contact form submission error:', error)
    return false
  }
}

export const incrementBlogPostViews = async (slug: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('increment_blog_views', { post_slug: slug })
    
    if (error) {
      console.log('Blog post views increment failed - database not set up yet:', error)
    }
  } catch (error) {
    console.log('Blog post views increment error:', error)
  }
}

export const incrementBlogPostLikes = async (slug: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('increment_blog_likes', { post_slug: slug })
    
    if (error) {
      console.log('Blog post likes increment failed - database not set up yet:', error)
    }
  } catch (error) {
    console.log('Blog post likes increment error:', error)
  }
}

// Image Upload Functions
export const uploadImage = async (file: File, bucket: string = 'images'): Promise<string | null> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', bucket)

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Upload failed')
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteImage = async (url: string, bucket: string = 'images'): Promise<boolean> => {
  try {
    const response = await fetch(`/api/delete-image?url=${encodeURIComponent(url)}&bucket=${bucket}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error deleting image:', errorData.error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}