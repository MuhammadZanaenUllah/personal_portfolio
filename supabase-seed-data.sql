-- Additional Sample Data for Portfolio
-- Run this after the main setup if you want more sample content

-- More Projects
INSERT INTO projects (title, description, long_description, image, technologies, category, github_url, live_url, featured, status, start_date, end_date) VALUES
('Weather Dashboard', 'Real-time weather application with location-based forecasts', 'A comprehensive weather dashboard that provides real-time weather data, 7-day forecasts, and interactive maps. Built with React and integrated with multiple weather APIs for accurate data.', '/api/placeholder/600/400', '{"React", "JavaScript", "Weather API", "Chart.js"}', 'Web Application', 'https://github.com/alexjohnson/weather-dashboard', 'https://weather-demo.example.com', false, 'completed', '2023-03-01', '2023-04-15'),
('Chat Application', 'Real-time messaging app with Socket.io', 'A modern chat application featuring real-time messaging, file sharing, emoji support, and group chats. Built with React and Socket.io for seamless real-time communication.', '/api/placeholder/600/400', '{"React", "Socket.io", "Node.js", "MongoDB"}', 'Web Application', 'https://github.com/alexjohnson/chat-app', 'https://chat-demo.example.com', false, 'completed', '2023-05-01', '2023-06-30'),
('Expense Tracker', 'Personal finance management application', 'A comprehensive expense tracking application with budget management, category-based spending analysis, and financial goal tracking. Features data visualization and export capabilities.', '/api/placeholder/600/400', '{"Next.js", "TypeScript", "Prisma", "Chart.js"}', 'Web Application', 'https://github.com/alexjohnson/expense-tracker', 'https://expenses-demo.example.com', false, 'in-progress', '2024-02-01', NULL);

-- More Skills
INSERT INTO skills (name, level, category, years_experience, description) VALUES
('Vue.js', 75, 'Frontend', 2, 'Progressive JavaScript framework for building user interfaces'),
('Express.js', 82, 'Backend', 3, 'Fast, unopinionated web framework for Node.js'),
('MongoDB', 78, 'Database', 2, 'NoSQL document database for modern applications'),
('Redis', 70, 'Database', 1, 'In-memory data structure store for caching'),
('GraphQL', 72, 'Backend', 1, 'Query language and runtime for APIs'),
('Jest', 80, 'Testing', 2, 'JavaScript testing framework'),
('Cypress', 75, 'Testing', 1, 'End-to-end testing framework'),
('Sass/SCSS', 85, 'Frontend', 3, 'CSS preprocessor for enhanced styling'),
('Webpack', 70, 'Tools', 2, 'Module bundler for JavaScript applications'),
('Git', 90, 'Tools', 4, 'Version control system for tracking changes');

-- More Blog Posts
INSERT INTO blog_posts (title, excerpt, content, author, published_at, category, tags, featured, image, read_time, views, likes, slug) VALUES
('Building Scalable React Applications', 'Best practices for structuring large React applications', 'As React applications grow in size and complexity, maintaining a clean and scalable architecture becomes crucial. This guide covers advanced patterns, state management strategies, and architectural decisions that will help you build maintainable React applications at scale.', 'Zanaen Ullah', '2024-01-20', 'Architecture', '{"React", "Architecture", "Best Practices"}', true, '/api/placeholder/600/400', 15, 2100, 78, 'building-scalable-react-applications'),
('Docker for Web Developers', 'Getting started with containerization', 'Docker has revolutionized how we develop and deploy applications. Learn the fundamentals of containerization, how to create Docker images, and best practices for using Docker in web development workflows.', 'Zanaen Ullah', '2024-01-12', 'DevOps', '{"Docker", "DevOps", "Containerization"}', false, '/api/placeholder/600/400', 12, 1456, 52, 'docker-for-web-developers'),
('TypeScript Advanced Types', 'Mastering TypeScript''s type system', 'Dive deep into TypeScript''s advanced type features including generics, conditional types, mapped types, and utility types. Learn how to leverage these powerful features to write more robust and maintainable code.', 'Zanaen Ullah', '2024-01-08', 'Programming', '{"TypeScript", "Types", "Advanced"}', false, '/api/placeholder/600/400', 18, 987, 41, 'typescript-advanced-types'),
('Web Performance Optimization', 'Techniques to make your websites faster', 'Website performance directly impacts user experience and SEO rankings. Explore practical techniques for optimizing web performance including code splitting, lazy loading, image optimization, and caching strategies.', 'Zanaen Ullah', '2024-01-03', 'Performance', '{"Performance", "Optimization", "Web Development"}', false, '/api/placeholder/600/400', 14, 1234, 67, 'web-performance-optimization');

-- Sample Testimonials
INSERT INTO testimonials (name, position, company, content, avatar, rating, featured) VALUES
('Sarah Chen', 'Product Manager', 'TechStart Inc', 'Alex delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise helped us launch on time and exceed our performance goals.', '/api/placeholder/100/100', 5, true),
('Michael Rodriguez', 'CTO', 'InnovateLab', 'Working with Alex was a pleasure. He brought creative solutions to complex problems and maintained excellent communication throughout the project.', '/api/placeholder/100/100', 5, true),
('Emily Watson', 'Design Lead', 'CreativeStudio', 'Alex''s ability to translate designs into pixel-perfect, responsive interfaces is outstanding. He truly understands both the technical and design aspects of web development.', '/api/placeholder/100/100', 5, false),
('David Kim', 'Startup Founder', 'NextGen Solutions', 'Alex helped us build our MVP from scratch. His full-stack expertise and mentorship were invaluable for our team. Highly recommended!', '/api/placeholder/100/100', 5, false);

-- Sample Achievements
INSERT INTO achievements (title, description, date, category, icon, url) VALUES
('AWS Certified Developer', 'Achieved AWS Certified Developer - Associate certification', '2023-08-15', 'Certification', '🏆', 'https://aws.amazon.com/certification/'),
('Open Source Contributor', 'Contributed to 10+ open source projects with 500+ GitHub stars', '2023-06-01', 'Open Source', '⭐', 'https://github.com/alexjohnson'),
('Tech Conference Speaker', 'Spoke at ReactConf 2023 about modern React patterns', '2023-10-20', 'Speaking', '🎤', 'https://reactconf.com'),
('Hackathon Winner', 'First place at TechCrunch Disrupt Hackathon 2023', '2023-09-15', 'Competition', '🥇', 'https://techcrunch.com/events/');

-- Sample Certifications
INSERT INTO certifications (name, issuer, date, expiry_date, credential_id, credential_url) VALUES
('AWS Certified Developer - Associate', 'Amazon Web Services', '2023-08-15', '2026-08-15', 'AWS-CDA-12345', 'https://aws.amazon.com/verification'),
('Google Cloud Professional Developer', 'Google Cloud', '2023-05-20', '2025-05-20', 'GCP-PD-67890', 'https://cloud.google.com/certification'),
('MongoDB Certified Developer', 'MongoDB Inc.', '2023-03-10', '2025-03-10', 'MDB-DEV-54321', 'https://university.mongodb.com/certification'),
('React Developer Certification', 'Meta', '2022-11-30', '2024-11-30', 'META-REACT-98765', 'https://developers.facebook.com/certification');

-- Update some existing records with more realistic data
UPDATE blog_posts SET 
  views = views + FLOOR(RANDOM() * 1000),
  likes = likes + FLOOR(RANDOM() * 50)
WHERE id IN (SELECT id FROM blog_posts LIMIT 3);

-- Add some variety to project statuses
UPDATE projects SET status = 'in-progress' WHERE title = 'Expense Tracker';
UPDATE projects SET end_date = NULL WHERE status = 'in-progress';

-- Add more realistic social links
UPDATE personal_info SET social_links = '{
  "github": "https://github.com/alexjohnson",
  "linkedin": "https://linkedin.com/in/alexjohnson",
  "twitter": "https://twitter.com/alexjohnson",
  "instagram": "https://instagram.com/alexjohnson",
  "dribbble": "https://dribbble.com/alexjohnson",
  "behance": "https://behance.net/alexjohnson"
}' WHERE name = 'Zanaen Ullah';

-- Add more interests
UPDATE personal_info SET interests = '{
  "Web Development",
  "UI/UX Design", 
  "Open Source",
  "Photography",
  "Machine Learning",
  "Blockchain",
  "Mobile Development",
  "Cloud Computing"
}' WHERE name = 'Zanaen Ullah';