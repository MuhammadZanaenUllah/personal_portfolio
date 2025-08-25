-- Admin User Creation Script for Supabase
-- Run this in your Supabase SQL Editor to create an admin user

-- IMPORTANT: Replace the email and password values below with your desired credentials
-- Email: Change 'admin@yourdomain.com' to your admin email
-- Password: Change 'your-secure-password-here' to a strong password

-- Step 1: Create the admin user in auth.users table
DO $$
DECLARE
    admin_email TEXT := 'admin@zanaen.pk';  -- 🔄 CHANGE THIS
    admin_password TEXT := 'wezjox-sahmor-mejHy7';  -- 🔄 CHANGE THIS
    user_id UUID;
    existing_user_id UUID;
BEGIN
    -- Check if user already exists
    SELECT id INTO existing_user_id 
    FROM auth.users 
    WHERE email = admin_email;
    
    IF existing_user_id IS NOT NULL THEN
        RAISE NOTICE 'User with email % already exists with ID: %', admin_email, existing_user_id;
        RETURN;
    END IF;
    
    -- Generate new UUID for the user
    user_id := gen_random_uuid();
    
    -- Insert into auth.users
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        invited_at,
        confirmation_token,
        confirmation_sent_at,
        recovery_token,
        recovery_sent_at,
        email_change_token_new,
        email_change,
        email_change_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        phone,
        phone_confirmed_at,
        phone_change,
        phone_change_token,
        phone_change_sent_at,
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        user_id,
        'authenticated',
        'authenticated',
        admin_email,
        crypt(admin_password, gen_salt('bf')),
        NOW(),
        NOW(),
        '',
        NOW(),
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider": "email", "providers": ["email"]}',
        '{"role": "admin"}',
        FALSE,
        NOW(),
        NOW(),
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL
    );
    
    -- Insert into auth.identities
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
        user_id,
        format('{"sub":"%s","email":"%s"}', user_id, admin_email)::jsonb,
        'email',
        NOW(),
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'Admin user created successfully!';
    RAISE NOTICE 'Email: %', admin_email;
    RAISE NOTICE 'User ID: %', user_id;
    RAISE NOTICE 'You can now login at your admin page.';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error creating admin user: %', SQLERRM;
END $$;

-- Step 2: Verify the user was created
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    raw_user_meta_data
FROM auth.users 
WHERE email = 'admin@yourdomain.com';  -- 🔄 CHANGE THIS to match your email above

-- Step 3: (Optional) Grant additional permissions if needed
-- Uncomment and modify these if you have custom roles or permissions

/*
-- Example: Create a custom admin role table (if you have one)
INSERT INTO user_roles (user_id, role) 
SELECT id, 'admin' 
FROM auth.users 
WHERE email = 'admin@yourdomain.com';

-- Example: Add to admin_users table (if you have one)
INSERT INTO admin_users (user_id, permissions, created_at)
SELECT id, '{"all": true}', NOW()
FROM auth.users 
WHERE email = 'admin@yourdomain.com';
*/

-- Instructions:
-- 1. Replace 'admin@yourdomain.com' with your desired admin email
-- 2. Replace 'your-secure-password-here' with a strong password
-- 3. Run this script in Supabase SQL Editor
-- 4. Check the output messages for success confirmation
-- 5. Test login at your admin page

-- Security Notes:
-- - Use a strong password (12+ characters, mixed case, numbers, symbols)
-- - Use a dedicated admin email address
-- - Consider enabling 2FA after first login
-- - Never commit this file with real credentials to version control