# Admin Credentials Setup Guide

This guide explains how to set up admin credentials for your portfolio application using Supabase authentication.

## Option 1: Create Admin User via Supabase Dashboard

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project
3. Navigate to **Authentication** > **Users** in the sidebar

### Step 2: Create Admin User
1. Click **"Add user"** button
2. Fill in the form:
   - **Email**: Your admin email (e.g., `admin@yourdomain.com`)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
3. Click **"Create user"**

### Step 3: Verify Admin User
1. The user will appear in the users list
2. Note down the email and password for login
3. Test login at `http://localhost:3000/admin`

## Option 2: Create Admin User via SQL

### Step 1: Access SQL Editor
1. In Supabase Dashboard, go to **SQL Editor**
2. Create a new query

### Step 2: Run Admin Creation Script
```sql
-- Create admin user with email and password
-- Replace 'your-admin@email.com' and 'your-secure-password' with your credentials

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'your-admin@email.com',
  crypt('your-secure-password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create corresponding identity record
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'your-admin@email.com'),
  format('{"sub":"%s","email":"%s"}', (SELECT id FROM auth.users WHERE email = 'your-admin@email.com'), 'your-admin@email.com')::jsonb,
  'email',
  NOW(),
  NOW(),
  NOW()
);
```

## Option 3: Create Admin User via Supabase CLI

### Prerequisites
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_REF`

### Create Admin User
```bash
# Create admin user
supabase auth users create \
  --email admin@yourdomain.com \
  --password your-secure-password \
  --confirm
```

## Option 4: Programmatic Creation (Development Only)

### Create Admin Setup Script
Create a file `scripts/create-admin.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key needed

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const email = 'admin@yourdomain.com';
  const password = 'your-secure-password';

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (error) {
      console.error('Error creating admin user:', error.message);
      return;
    }

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('User ID:', data.user.id);
    console.log('\nYou can now login at: http://localhost:3000/admin');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createAdminUser();
```

Run with: `node scripts/create-admin.js`

## Environment Variables Required

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Only for admin creation script
```

## Security Best Practices

1. **Strong Passwords**: Use passwords with at least 12 characters, including uppercase, lowercase, numbers, and symbols
2. **Unique Email**: Use a dedicated admin email address
3. **Environment Variables**: Never commit credentials to version control
4. **Service Role Key**: Only use service role key for admin operations, never in client-side code
5. **Regular Updates**: Change admin passwords regularly

## Troubleshooting

### "Invalid login credentials" Error
- Verify email and password are correct
- Check if user exists in Supabase Dashboard > Authentication > Users
- Ensure user is confirmed (email_confirmed_at is not null)

### "User already registered" Error
- User with that email already exists
- Check existing users in Supabase Dashboard
- Use password reset if you forgot the password

### Authentication Not Working
- Verify environment variables are set correctly
- Check Supabase project URL and keys
- Ensure RLS policies allow authentication

## Password Reset

If you forget the admin password:

1. **Via Dashboard**: Go to Authentication > Users, find the user, click "Send recovery email"
2. **Via SQL**: Update password directly in database (not recommended for production)
3. **Create New User**: Delete old user and create new one with different email

## Next Steps

After creating admin credentials:
1. Test login at `/admin` route
2. Verify all admin functionality works
3. Set up proper backup procedures
4. Document credentials securely
5. Consider implementing 2FA for additional security