export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  teamSize: number;
  role: string;
  challenges: string[];
  achievements: string[];
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI/UX, payment integration, and admin dashboard.',
    longDescription: 'Built a comprehensive e-commerce platform from scratch using Next.js and Node.js. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and a complete admin dashboard for inventory management.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma'],
    category: 'Full Stack',
    featured: true,
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/alexjohnson/ecommerce-platform',
    status: 'completed',
    startDate: '2023-08-01',
    endDate: '2023-11-15',
    teamSize: 3,
    role: 'Lead Full Stack Developer',
    challenges: [
      'Implementing secure payment processing',
      'Optimizing database queries for large product catalogs',
      'Building responsive design for mobile commerce'
    ],
    achievements: [
      'Achieved 99.9% uptime in production',
      'Reduced page load times by 40%',
      'Processed over $100K in transactions'
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative project management tool with real-time updates, team collaboration, and advanced analytics.',
    longDescription: 'Developed a comprehensive task management application that helps teams organize, track, and complete projects efficiently. Features include real-time collaboration, file sharing, time tracking, custom workflows, and detailed analytics dashboards.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'Socket.io', 'Chart.js'],
    category: 'Frontend',
    featured: true,
    liveUrl: 'https://taskflow-app.netlify.app',
    githubUrl: 'https://github.com/alexjohnson/taskflow',
    status: 'completed',
    startDate: '2023-05-01',
    endDate: '2023-07-30',
    teamSize: 2,
    role: 'Frontend Lead',
    challenges: [
      'Implementing real-time synchronization across multiple users',
      'Creating intuitive drag-and-drop interfaces',
      'Optimizing performance for large datasets'
    ],
    achievements: [
      'Increased team productivity by 35%',
      'Achieved 4.8/5 user satisfaction rating',
      'Scaled to support 1000+ concurrent users'
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: '3',
    title: 'Weather Analytics Dashboard',
    description: 'A data visualization platform for weather patterns with interactive charts and predictive analytics.',
    longDescription: 'Created an advanced weather analytics dashboard that aggregates data from multiple sources to provide comprehensive weather insights. Features include interactive maps, historical data analysis, weather predictions, and customizable alerts.',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'MongoDB', 'Docker'],
    category: 'Data Visualization',
    featured: false,
    liveUrl: 'https://weather-analytics.herokuapp.com',
    githubUrl: 'https://github.com/alexjohnson/weather-dashboard',
    status: 'completed',
    startDate: '2023-03-01',
    endDate: '2023-04-30',
    teamSize: 1,
    role: 'Full Stack Developer',
    challenges: [
      'Processing large volumes of weather data',
      'Creating smooth animations for data transitions',
      'Implementing accurate weather prediction algorithms'
    ],
    achievements: [
      'Processed 10M+ data points daily',
      'Achieved 85% prediction accuracy',
      'Reduced data loading time by 60%'
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: '4',
    title: 'Social Media Analytics Tool',
    description: 'An AI-powered social media monitoring and analytics platform for brands and marketers.',
    longDescription: 'Built a comprehensive social media analytics platform that helps businesses track their online presence, analyze competitor performance, and optimize their social media strategy using AI-powered insights.',
    image: '/api/placeholder/600/400',
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'TensorFlow', 'AWS'],
    category: 'Full Stack',
    featured: true,
    liveUrl: 'https://social-insights.com',
    githubUrl: 'https://github.com/alexjohnson/social-analytics',
    status: 'completed',
    startDate: '2023-01-01',
    endDate: '2023-02-28',
    teamSize: 4,
    role: 'Backend Developer',
    challenges: [
      'Integrating multiple social media APIs',
      'Implementing real-time sentiment analysis',
      'Scaling to handle millions of social posts'
    ],
    achievements: [
      'Analyzed 50M+ social media posts',
      'Achieved 92% sentiment analysis accuracy',
      'Reduced API response time by 50%'
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: '5',
    title: 'Cryptocurrency Portfolio Tracker',
    description: 'A real-time crypto portfolio management app with advanced charting and trading insights.',
    longDescription: 'Developed a sophisticated cryptocurrency portfolio tracker that provides real-time price updates, portfolio analytics, profit/loss calculations, and trading insights. Features include price alerts, news integration, and technical analysis tools.',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Redux', 'WebSocket', 'CoinGecko API', 'SQLite'],
    category: 'Mobile',
    featured: false,
    liveUrl: 'https://crypto-tracker-app.com',
    githubUrl: 'https://github.com/alexjohnson/crypto-tracker',
    status: 'in-progress',
    startDate: '2023-12-01',
    teamSize: 2,
    role: 'Mobile Developer',
    challenges: [
      'Handling real-time price updates efficiently',
      'Creating smooth chart animations on mobile',
      'Implementing secure local data storage'
    ],
    achievements: [
      'Achieved 4.7/5 app store rating',
      'Processed 1M+ price updates daily',
      'Reduced battery usage by 30%'
    ],
    screenshots: [
      '/api/placeholder/400/800',
      '/api/placeholder/400/800'
    ]
  },
  {
    id: '6',
    title: 'AI Content Generator',
    description: 'An AI-powered content creation platform for bloggers, marketers, and content creators.',
    longDescription: 'Created an innovative AI content generation platform that helps users create high-quality blog posts, social media content, and marketing copy. Features include multiple content types, SEO optimization, and collaborative editing.',
    image: '/api/placeholder/600/400',
    technologies: ['Svelte', 'SvelteKit', 'OpenAI API', 'Supabase', 'Tailwind CSS'],
    category: 'Frontend',
    featured: false,
    githubUrl: 'https://github.com/alexjohnson/ai-content-generator',
    status: 'planned',
    startDate: '2024-02-01',
    teamSize: 1,
    role: 'Full Stack Developer',
    challenges: [
      'Integrating AI models effectively',
      'Creating intuitive content editing interfaces',
      'Implementing real-time collaboration'
    ],
    achievements: [],
    screenshots: []
  }
];

export const projectCategories = [
  'All',
  'Full Stack',
  'Frontend',
  'Backend',
  'Mobile',
  'Data Visualization',
  'AI/ML'
];

export const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Vue.js',
  'Angular',
  'React Native',
  'Svelte',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'AWS',
  'Docker',
  'Tailwind CSS'
];