-- Admin RLS Policies for Supabase
-- Run this in your Supabase SQL Editor to allow authenticated users to modify data

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Admin full access" ON personal_info;
DROP POLICY IF EXISTS "Admin full access" ON projects;
DROP POLICY IF EXISTS "Admin full access" ON skills;
DROP POLICY IF EXISTS "Admin full access" ON experience;
DROP POLICY IF EXISTS "Admin full access" ON blog_posts;
DROP POLICY IF EXISTS "Admin full access" ON contact_submissions;
DROP POLICY IF EXISTS "Admin full access" ON testimonials;
DROP POLICY IF EXISTS "Admin full access" ON achievements;
DROP POLICY IF EXISTS "Admin full access" ON certifications;

-- Create policies for authenticated users (admin access)
-- Personal Info
CREATE POLICY "Admin full access" ON personal_info
  FOR ALL USING (auth.role() = 'authenticated');

-- Projects
CREATE POLICY "Admin full access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "Admin full access" ON skills
  FOR ALL USING (auth.role() = 'authenticated');

-- Experience
CREATE POLICY "Admin full access" ON experience
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog Posts
CREATE POLICY "Admin full access" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact Submissions
CREATE POLICY "Admin full access" ON contact_submissions
  FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials
CREATE POLICY "Admin full access" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- Achievements
CREATE POLICY "Admin full access" ON achievements
  FOR ALL USING (auth.role() = 'authenticated');

-- Certifications
CREATE POLICY "Admin full access" ON certifications
  FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions to authenticated users
GRANT INSERT, UPDATE, DELETE ON personal_info TO authenticated;
GRANT INSERT, UPDATE, DELETE ON projects TO authenticated;
GRANT INSERT, UPDATE, DELETE ON skills TO authenticated;
GRANT INSERT, UPDATE, DELETE ON experience TO authenticated;
GRANT INSERT, UPDATE, DELETE ON blog_posts TO authenticated;
GRANT INSERT, UPDATE, DELETE ON contact_submissions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON testimonials TO authenticated;
GRANT INSERT, UPDATE, DELETE ON achievements TO authenticated;
GRANT INSERT, UPDATE, DELETE ON certifications TO authenticated;

-- Verify policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN (
    'personal_info', 'projects', 'skills', 'experience', 
    'blog_posts', 'contact_submissions', 'testimonials', 
    'achievements', 'certifications'
)
ORDER BY tablename, policyname;

-- Verify permissions were granted
SELECT 
    table_name,
    privilege_type,
    grantee
FROM information_schema.table_privileges 
WHERE table_name IN (
    'personal_info', 'projects', 'skills', 'experience', 
    'blog_posts', 'contact_submissions', 'testimonials', 
    'achievements', 'certifications'
)
AND grantee = 'authenticated'
ORDER BY table_name, privilege_type;