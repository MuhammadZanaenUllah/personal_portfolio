-- Fix permissions to allow updates to personal_info table
-- Run this in your Supabase SQL Editor

-- Grant UPDATE permissions to anonymous and authenticated users for personal_info table
GRANT UPDATE ON personal_info TO anon, authenticated;

-- Optional: Grant UPDATE permissions for other tables if you need to edit them later
-- GRANT UPDATE ON projects TO anon, authenticated;
-- GRANT UPDATE ON skills TO anon, authenticated;
-- GRANT UPDATE ON experience TO anon, authenticated;
-- GRANT UPDATE ON blog_posts TO anon, authenticated;

-- Verify the permissions were granted
SELECT 
    table_name,
    privilege_type,
    grantee
FROM information_schema.table_privileges 
WHERE table_name = 'personal_info' 
AND grantee IN ('anon', 'authenticated');