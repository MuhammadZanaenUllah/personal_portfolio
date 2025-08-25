#!/usr/bin/env node

/**
 * Admin User Creation Script
 * 
 * This script creates an admin user for the portfolio application.
 * Requires SUPABASE_SERVICE_ROLE_KEY environment variable.
 * 
 * Usage:
 *   node scripts/create-admin.js
 *   
 * Or with custom credentials:
 *   EMAIL=admin@example.com PASSWORD=mypassword node scripts/create-admin.js
 */

const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');
require('dotenv').config({ path: '.env' });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  if (!supabaseUrl) console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseServiceKey) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env.local file.');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility function to prompt user input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Utility function to prompt password (hidden input)
function promptPassword(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    
    process.stdin.on('data', function(char) {
      char = char + '';
      
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003': // Ctrl+C
          process.stdout.write('\n');
          process.exit();
          break;
        case '\u007f': // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function isStrongPassword(password) {
  return password.length >= 8;
}

// Main function to create admin user
async function createAdminUser() {
  console.log('🔐 Portfolio Admin User Creation');
  console.log('================================\n');

  try {
    // Get email from environment or prompt
    let email = process.env.EMAIL;
    if (!email) {
      email = await prompt('Enter admin email: ');
    }

    // Validate email
    if (!isValidEmail(email)) {
      console.error('❌ Invalid email format');
      process.exit(1);
    }

    // Get password from environment or prompt
    let password = process.env.PASSWORD;
    if (!password) {
      password = await promptPassword('Enter admin password: ');
    }

    // Validate password
    if (!isStrongPassword(password)) {
      console.error('❌ Password must be at least 8 characters long');
      process.exit(1);
    }

    console.log('\n⏳ Creating admin user...');

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error checking existing users:', listError.message);
      process.exit(1);
    }

    const existingUser = existingUsers.users.find(user => user.email === email);
    if (existingUser) {
      console.log('⚠️  User with this email already exists');
      console.log('User ID:', existingUser.id);
      console.log('Created:', existingUser.created_at);
      console.log('\nYou can login at: http://localhost:3000/admin');
      return;
    }

    // Create the admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        created_by: 'admin-script'
      }
    });

    if (error) {
      console.error('❌ Error creating admin user:', error.message);
      process.exit(1);
    }

    // Success message
    console.log('\n✅ Admin user created successfully!');
    console.log('================================');
    console.log('Email:', email);
    console.log('User ID:', data.user.id);
    console.log('Created:', data.user.created_at);
    console.log('\n🌐 Login URL: http://localhost:3000/admin');
    console.log('\n📝 Next steps:');
    console.log('1. Save these credentials securely');
    console.log('2. Test login at the admin URL');
    console.log('3. Consider enabling 2FA for additional security');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle script interruption
process.on('SIGINT', () => {
  console.log('\n\n👋 Admin creation cancelled');
  rl.close();
  process.exit(0);
});

// Run the script
if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser };