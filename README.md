# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase. Features a complete admin dashboard for content management, blog system, and contact form handling.

## ✨ Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Admin Dashboard**: Secure admin panel for content management
- **Blog System**: MDX-powered blog with syntax highlighting
- **Contact Form**: Integrated contact form with Supabase storage
- **Real-time Analytics**: Live visitor tracking and statistics
- **Content Management**: Easy-to-use CMS for projects, skills, and experience
- **Authentication**: Secure admin authentication with Supabase Auth
- **SEO Optimized**: Meta tags, OpenGraph, and Twitter cards

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd porfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up the database:
```bash
# Run the setup SQL in your Supabase SQL Editor
# File: supabase-setup.sql

# Seed with sample data (optional)
npm run seed
```

5. Create an admin user:
```bash
npm run create-admin
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

## 🔐 Admin Setup

The portfolio includes a secure admin dashboard for content management. You can create admin credentials using several methods:

### Method 1: Using the Script (Recommended)
```bash
npm run create-admin
```
This interactive script will prompt for email and password.

### Method 2: Environment Variables
```bash
EMAIL=admin@yourdomain.com PASSWORD=yourpassword npm run create-admin
```

### Method 3: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and fill in the details
4. Check "Auto Confirm User"

### Method 4: SQL Script
Run the SQL script in your Supabase SQL Editor:
```sql
-- See scripts/create-admin-user.sql for the complete script
```

For detailed instructions, see [ADMIN_SETUP.md](./ADMIN_SETUP.md).

## 📁 Project Structure

```
porfolio/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   └── ...                # Other pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # Reusable UI components
├── contexts/             # React contexts
├── data/                 # Static data files
├── lib/                  # Utility libraries
├── posts/                # MDX blog posts
├── scripts/              # Database and admin scripts
└── public/               # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data
- `npm run create-admin` - Create admin user

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
