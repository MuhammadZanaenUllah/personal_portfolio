#!/usr/bin/env node

/**
 * Database Seeding Script
 * This script populates the Supabase database with data from static files
 * Run with: node scripts/seed-database.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Import static data
const personalData = require('../data/personal.ts');
const projectsData = require('../data/projects.ts');
const skillsData = require('../data/skills.ts');
const blogData = require('../data/blog.ts');

/**
 * Seed personal information
 */
async function seedPersonalInfo() {
  console.log('🔄 Seeding personal information...');
  
  try {
    // Clear existing data
    await supabase.from('personal_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const personalInfo = {
      name: personalData.personalInfo.name,
      title: personalData.personalInfo.title,
      bio: personalData.personalInfo.bio,
      email: personalData.personalInfo.email,
      phone: personalData.personalInfo.phone,
      location: personalData.personalInfo.location,
      avatar: personalData.personalInfo.avatar,
      resume_url: personalData.personalInfo.resumeUrl,
      social_links: personalData.personalInfo.socialLinks,
      working_hours: personalData.personalInfo.workingHours,
      languages: personalData.personalInfo.languages,
      interests: personalData.personalInfo.interests
    };
    
    const { error } = await supabase.from('personal_info').insert([personalInfo]);
    
    if (error) throw error;
    console.log('✅ Personal information seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding personal info:', error.message);
  }
}

/**
 * Seed projects
 */
async function seedProjects() {
  console.log('🔄 Seeding projects...');
  
  try {
    // Clear existing data
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const projects = projectsData.projects.map(project => ({
      title: project.title,
      description: project.description,
      long_description: project.longDescription,
      image: project.image,
      technologies: project.technologies,
      category: project.category,
      github_url: project.githubUrl,
      live_url: project.liveUrl,
      featured: project.featured,
      status: project.status,
      start_date: project.startDate,
      end_date: project.endDate
    }));
    
    const { error } = await supabase.from('projects').insert(projects);
    
    if (error) throw error;
    console.log(`✅ ${projects.length} projects seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding projects:', error.message);
  }
}

/**
 * Seed skills
 */
async function seedSkills() {
  console.log('🔄 Seeding skills...');
  
  try {
    // Clear existing data
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const skills = skillsData.skills.map(skill => ({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      years_experience: skill.yearsExperience,
      description: skill.description,
      icon: skill.icon
    }));
    
    const { error } = await supabase.from('skills').insert(skills);
    
    if (error) throw error;
    console.log(`✅ ${skills.length} skills seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding skills:', error.message);
  }
}

/**
 * Seed experience
 */
async function seedExperience() {
  console.log('🔄 Seeding experience...');
  
  try {
    // Clear existing data
    await supabase.from('experience').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Note: You'll need to create experience data in your static files
    // For now, we'll use sample data
    const experience = [
      {
        company: 'Tech Corp',
        position: 'Senior Full Stack Developer',
        description: 'Led development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        start_date: '2022-01-01',
        end_date: null,
        location: 'San Francisco, CA',
        type: 'full-time',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        achievements: ['Improved application performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline']
      },
      {
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        description: 'Developed responsive web applications using React and modern JavaScript. Worked closely with designers to implement pixel-perfect UIs.',
        start_date: '2020-06-01',
        end_date: '2021-12-31',
        location: 'Remote',
        type: 'full-time',
        technologies: ['React', 'JavaScript', 'CSS', 'Webpack'],
        achievements: ['Reduced bundle size by 30%', 'Implemented design system', 'Mentored junior developers']
      }
    ];
    
    const { error } = await supabase.from('experience').insert(experience);
    
    if (error) throw error;
    console.log(`✅ ${experience.length} experience entries seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding experience:', error.message);
  }
}

/**
 * Seed blog posts
 */
async function seedBlogPosts() {
  console.log('🔄 Seeding blog posts...');
  
  try {
    // Clear existing data
    await supabase.from('blog_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const blogPosts = blogData.blogPosts.map(post => ({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      published_at: post.publishedAt,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      image: post.image,
      read_time: post.readTime,
      views: post.views || 0,
      likes: post.likes || 0,
      slug: post.slug
    }));
    
    const { error } = await supabase.from('blog_posts').insert(blogPosts);
    
    if (error) throw error;
    console.log(`✅ ${blogPosts.length} blog posts seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error.message);
  }
}

/**
 * Main seeding function
 */
async function seedDatabase() {
  console.log('🚀 Starting database seeding...');
  console.log('================================');
  
  try {
    await seedPersonalInfo();
    await seedProjects();
    await seedSkills();
    await seedExperience();
    await seedBlogPosts();
    
    console.log('================================');
    console.log('🎉 Database seeding completed successfully!');
    console.log('Your Supabase database is now populated with all the static data.');
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
}

/**
 * Verify database connection
 */
async function verifyConnection() {
  try {
    const { data, error } = await supabase.from('personal_info').select('count').single();
    if (error && error.code !== 'PGRST116') throw error;
    console.log('✅ Database connection verified');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Run the seeding script
if (require.main === module) {
  (async () => {
    console.log('🔍 Verifying database connection...');
    const connected = await verifyConnection();
    
    if (connected) {
      await seedDatabase();
    } else {
      console.error('❌ Cannot proceed without database connection');
      process.exit(1);
    }
  })();
}

module.exports = {
  seedDatabase,
  seedPersonalInfo,
  seedProjects,
  seedSkills,
  seedExperience,
  seedBlogPosts
};