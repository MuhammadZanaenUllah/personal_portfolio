-- Supabase Database Setup for Portfolio
-- Run these queries in your Supabase SQL Editor

-- Enable Row Level Security (RLS) for all tables
-- You can adjust these policies based on your security needs

-- 1. Personal Info Table
CREATE TABLE personal_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  avatar TEXT,
  resume_url TEXT,
  social_links JSONB DEFAULT '{}',
  working_hours JSONB DEFAULT '{}',
  languages JSONB DEFAULT '[]',
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image TEXT,
  technologies TEXT[] DEFAULT '{}',
  category TEXT,
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('completed', 'in-progress', 'planned')) DEFAULT 'completed',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Skills Table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  years_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Experience Table
CREATE TABLE experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  type TEXT CHECK (type IN ('full-time', 'part-time', 'contract', 'freelance')) DEFAULT 'full-time',
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Blog Posts Table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  image TEXT,
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  slug TEXT UNIQUE NOT NULL
);

-- 6. Contact Submissions Table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('unread', 'read', 'replied')) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Testimonials Table (Optional)
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Achievements Table (Optional)
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT,
  icon TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Certifications Table (Optional)
CREATE TABLE certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date DATE NOT NULL,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  badge_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed)
CREATE POLICY "Public read access" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read access" ON certifications FOR SELECT USING (true);

-- Allow public insert for contact submissions
CREATE POLICY "Public insert access" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Create functions for incrementing blog views and likes
CREATE OR REPLACE FUNCTION increment_blog_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts SET views = views + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_blog_likes(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts SET likes = likes + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data

-- Personal Info
INSERT INTO personal_info (name, title, bio, email, phone, location, avatar, resume_url, social_links, working_hours, languages, interests) VALUES (
  'Alex Johnson',
  'Full Stack Developer & UI/UX Designer',
  'Passionate developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern web technologies.',
  'alex@example.com',
  '+1 (234) 567-8900',
  'San Francisco, CA',
  '/api/placeholder/150/150',
  '/resume.pdf',
  '{"github": "https://github.com/alexjohnson", "linkedin": "https://linkedin.com/in/alexjohnson", "twitter": "https://twitter.com/alexjohnson"}',
  '{"timezone": "PST", "availability": "9 AM - 6 PM"}',
  '[{"name": "English", "level": "Native"}, {"name": "Spanish", "level": "Conversational"}]',
  '{"Web Development", "UI/UX Design", "Open Source", "Photography"}'
);

-- Projects
INSERT INTO projects (title, description, long_description, image, technologies, category, github_url, live_url, featured, status, start_date, end_date) VALUES
('E-Commerce Platform', 'Modern e-commerce solution with React and Node.js', 'A comprehensive e-commerce platform built with modern technologies including React, Node.js, PostgreSQL, and Stripe integration. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.', '/api/placeholder/600/400', '{"React", "Node.js", "PostgreSQL", "Stripe", "Express"}', 'Web Application', 'https://github.com/alexjohnson/ecommerce-platform', 'https://ecommerce-demo.example.com', true, 'completed', '2023-01-01', '2023-06-01'),
('Task Management App', 'Collaborative task management with real-time updates', 'A real-time collaborative task management application built with Next.js and Socket.io. Features include project boards, task assignments, real-time notifications, and team collaboration tools.', '/api/placeholder/600/400', '{"Next.js", "Socket.io", "MongoDB", "Tailwind CSS"}', 'Web Application', 'https://github.com/alexjohnson/task-manager', 'https://taskmanager-demo.example.com', true, 'completed', '2023-07-01', '2023-12-01'),
('Portfolio Website', 'Personal portfolio built with Next.js and Supabase', 'A modern, responsive portfolio website showcasing projects, skills, and blog posts. Built with Next.js, TypeScript, Tailwind CSS, and Supabase for data management.', '/api/placeholder/600/400', '{"Next.js", "TypeScript", "Supabase", "Tailwind CSS"}', 'Portfolio', 'https://github.com/alexjohnson/portfolio', 'https://alexjohnson.dev', true, 'completed', '2024-01-01', '2024-02-01');

-- Skills
INSERT INTO skills (name, level, category, years_experience, description) VALUES
('React', 90, 'Frontend', 4, 'Advanced React development with hooks, context, and modern patterns'),
('Node.js', 85, 'Backend', 3, 'Server-side JavaScript development with Express and various frameworks'),
('TypeScript', 88, 'Frontend', 3, 'Type-safe JavaScript development for large-scale applications'),
('PostgreSQL', 80, 'Database', 2, 'Relational database design and optimization'),
('Next.js', 92, 'Frontend', 3, 'Full-stack React framework for production applications'),
('Tailwind CSS', 85, 'Frontend', 2, 'Utility-first CSS framework for rapid UI development'),
('Python', 75, 'Backend', 2, 'Backend development and data analysis'),
('Docker', 70, 'DevOps', 1, 'Containerization and deployment'),
('AWS', 65, 'DevOps', 1, 'Cloud infrastructure and services'),
('Figma', 80, 'Design', 3, 'UI/UX design and prototyping');

-- Experience
INSERT INTO experience (company, position, description, start_date, end_date, location, type, technologies, achievements) VALUES
('Tech Corp', 'Senior Full Stack Developer', 'Led development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.', '2022-01-01', NULL, 'San Francisco, CA', 'full-time', '{"React", "Node.js", "PostgreSQL", "AWS"}', '{"Improved application performance by 40%", "Led team of 5 developers", "Implemented CI/CD pipeline"}'),
('StartupXYZ', 'Frontend Developer', 'Developed responsive web applications using React and modern JavaScript. Worked closely with designers to implement pixel-perfect UIs.', '2020-06-01', '2021-12-31', 'Remote', 'full-time', '{"React", "JavaScript", "CSS", "Webpack"}', '{"Reduced bundle size by 30%", "Implemented design system", "Mentored junior developers"}'),
('Freelance', 'Web Developer', 'Provided web development services to small businesses and startups. Built custom websites and web applications using various technologies.', '2019-01-01', '2020-05-31', 'Remote', 'freelance', '{"HTML", "CSS", "JavaScript", "WordPress", "PHP"}', '{"Delivered 15+ projects on time", "Maintained 98% client satisfaction rate", "Built long-term client relationships"}')
;

-- Blog Posts
INSERT INTO blog_posts (title, excerpt, content, author, published_at, category, tags, featured, image, read_time, views, likes, slug) VALUES
('Getting Started with React', 'Learn the basics of React development and build your first component', 'React is a powerful library for building user interfaces. In this comprehensive guide, we''ll explore the fundamentals of React development, including components, props, state, and hooks. Whether you''re new to React or looking to refresh your knowledge, this tutorial will provide you with a solid foundation to build upon.', 'Alex Johnson', '2024-01-15', 'Tutorial', '{"React", "JavaScript", "Frontend"}', true, '/api/placeholder/600/400', 8, 1250, 45, 'getting-started-react'),
('Mastering CSS Grid', 'A complete guide to CSS Grid layout system', 'CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. In this detailed guide, we''ll cover everything from basic grid concepts to advanced techniques for creating professional layouts.', 'Alex Johnson', '2024-01-10', 'Tutorial', '{"CSS", "Grid", "Layout"}', true, '/api/placeholder/600/400', 12, 890, 32, 'mastering-css-grid'),
('Node.js Performance Tips', 'Optimize your Node.js applications for better performance', 'Performance is crucial for any web application. Learn practical techniques to optimize your Node.js applications, including profiling, caching strategies, and database optimization.', 'Alex Johnson', '2024-01-05', 'Performance', '{"Node.js", "Performance", "Backend"}', false, '/api/placeholder/600/400', 10, 654, 28, 'nodejs-performance-tips');

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);

-- Grant necessary permissions (adjust based on your needs)
-- These are basic permissions for public access
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON contact_submissions TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_blog_views(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_blog_likes(TEXT) TO anon, authenticated;