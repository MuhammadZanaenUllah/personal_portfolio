# Database Seeding Scripts

This directory contains scripts for managing your Supabase database data.

## seed-database.js

A comprehensive script that populates your Supabase database with data from your static files.

### Prerequisites

1. Ensure your Supabase project is set up and running
2. Make sure your `.env` file contains the correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Run the database setup SQL first (if not already done):
   - Execute `supabase-setup.sql` in your Supabase SQL Editor
   - Execute `supabase-permissions-fix.sql` to grant necessary permissions

### Usage

#### Method 1: Using npm script (Recommended)
```bash
npm run seed
```

#### Method 2: Direct execution
```bash
node scripts/seed-database.js
```

### What it does

The script will:

1. **Verify database connection** - Ensures your Supabase credentials are working
2. **Clear existing data** - Removes old data to prevent duplicates
3. **Seed personal information** - Populates the `personal_info` table
4. **Seed projects** - Adds all projects from your static data
5. **Seed skills** - Imports your skills and proficiency levels
6. **Seed experience** - Adds work experience entries
7. **Seed blog posts** - Imports all blog posts with metadata

### Output

You'll see progress messages like:
```
🔍 Verifying database connection...
✅ Database connection verified
🚀 Starting database seeding...
================================
🔄 Seeding personal information...
✅ Personal information seeded successfully
🔄 Seeding projects...
✅ 3 projects seeded successfully
🔄 Seeding skills...
✅ 10 skills seeded successfully
🔄 Seeding experience...
✅ 2 experience entries seeded successfully
🔄 Seeding blog posts...
✅ 3 blog posts seeded successfully
================================
🎉 Database seeding completed successfully!
```

### Troubleshooting

#### Permission Errors
If you get permission errors, make sure you've run the `supabase-permissions-fix.sql` script:
```sql
GRANT UPDATE ON personal_info TO anon, authenticated;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
```

#### Connection Errors
- Verify your Supabase URL and API key in `.env`
- Check that your Supabase project is active
- Ensure your internet connection is stable

#### Data Import Errors
- Make sure your static data files exist in the `data/` directory
- Verify the data structure matches your database schema
- Check for any required fields that might be missing

### Customization

You can modify the script to:
- Add more data sources
- Change the seeding behavior
- Add data validation
- Implement incremental updates instead of full replacement

### Safety Notes

⚠️ **Warning**: This script will delete existing data before seeding new data. Make sure you have backups if needed.

✅ **Safe to run multiple times**: The script is idempotent and can be run multiple times safely.