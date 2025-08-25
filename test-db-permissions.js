#!/usr/bin/env node

/**
 * Database Permissions Test Script
 * 
 * This script tests if the current Supabase setup allows authenticated users
 * to write to the database tables.
 * 
 * Usage:
 *   node test-db-permissions.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required environment variables:');
  if (!supabaseUrl) console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.error('\nPlease add these to your .env.local file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabasePermissions() {
  console.log('🔍 Testing Database Permissions...');
  console.log('================================');
  
  try {
    // Test 1: Check if we can read data (should work)
    console.log('\n📖 Test 1: Reading projects...');
    const { data: projects, error: readError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (readError) {
      console.error('❌ Read test failed:', readError.message);
    } else {
      console.log('✅ Read test passed:', projects?.length || 0, 'projects found');
    }
    
    // Test 2: Try to authenticate with admin credentials
    console.log('\n🔐 Test 2: Authenticating as admin...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@zanaen.pk',
      password: 'wezjox-sahmor-mejHy7'
    });
    
    if (authError) {
      console.error('❌ Authentication failed:', authError.message);
      console.log('\n💡 Possible solutions:');
      console.log('1. Run the admin user creation script: npm run create-admin');
      console.log('2. Check if the admin user exists in Supabase Dashboard');
      console.log('3. Verify the credentials are correct');
      return;
    } else {
      console.log('✅ Authentication successful');
      console.log('   User ID:', authData.user?.id);
      console.log('   Email:', authData.user?.email);
    }
    
    // Test 3: Try to update a project (should work after authentication)
    console.log('\n✏️  Test 3: Testing write permissions...');
    
    // First, get a project to update
    const { data: testProjects, error: getError } = await supabase
      .from('projects')
      .select('id, title, featured')
      .limit(1);
    
    if (getError || !testProjects || testProjects.length === 0) {
      console.error('❌ Could not get test project:', getError?.message || 'No projects found');
      return;
    }
    
    const testProject = testProjects[0];
    const newFeaturedStatus = !testProject.featured;
    
    console.log(`   Updating project "${testProject.title}" featured status: ${testProject.featured} → ${newFeaturedStatus}`);
    
    const { data: updateData, error: updateError } = await supabase
      .from('projects')
      .update({ featured: newFeaturedStatus })
      .eq('id', testProject.id)
      .select();
    
    if (updateError) {
      console.error('❌ Write test failed:', updateError.message);
      console.log('\n💡 Possible solutions:');
      console.log('1. Run the RLS policies script in Supabase SQL Editor:');
      console.log('   File: supabase-admin-policies.sql');
      console.log('2. Check Row Level Security policies in Supabase Dashboard');
      console.log('3. Verify authenticated user permissions');
    } else {
      console.log('✅ Write test passed! Project updated successfully');
      console.log('   Updated project:', updateData?.[0]?.title);
      console.log('   New featured status:', updateData?.[0]?.featured);
      
      // Revert the change
      await supabase
        .from('projects')
        .update({ featured: testProject.featured })
        .eq('id', testProject.id);
      console.log('   ↩️  Reverted change back to original state');
    }
    
    // Test 4: Sign out
    console.log('\n🚪 Test 4: Signing out...');
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error('❌ Sign out failed:', signOutError.message);
    } else {
      console.log('✅ Sign out successful');
    }
    
    console.log('\n================================');
    console.log('🎉 Database permissions test completed!');
    console.log('\nIf all tests passed, your admin interface should work correctly.');
    console.log('If any tests failed, follow the suggested solutions above.');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

// Run the test
if (require.main === module) {
  testDatabasePermissions();
}

module.exports = { testDatabasePermissions };