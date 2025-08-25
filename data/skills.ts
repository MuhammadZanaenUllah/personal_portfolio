export interface Skill {
  name: string;
  level: number;
  category: string;
  yearsOfExperience: number;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'work' | 'education' | 'certification';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  image: string;
}

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    level: 95,
    category: 'Frontend',
    yearsOfExperience: 5,
    description: 'Advanced React development with hooks, context, and performance optimization'
  },
  {
    name: 'TypeScript',
    level: 90,
    category: 'Frontend',
    yearsOfExperience: 4,
    description: 'Strong typing, advanced types, and large-scale application architecture'
  },
  {
    name: 'Next.js',
    level: 88,
    category: 'Frontend',
    yearsOfExperience: 3,
    description: 'SSR, SSG, API routes, and performance optimization'
  },
  {
    name: 'Vue.js',
    level: 82,
    category: 'Frontend',
    yearsOfExperience: 3,
    description: 'Vue 3 composition API, Vuex, and component architecture'
  },
  {
    name: 'Angular',
    level: 75,
    category: 'Frontend',
    yearsOfExperience: 2,
    description: 'Angular 15+, RxJS, and enterprise application development'
  },
  {
    name: 'Svelte',
    level: 70,
    category: 'Frontend',
    yearsOfExperience: 1,
    description: 'Modern reactive framework with excellent performance'
  },
  {
    name: 'HTML5',
    level: 95,
    category: 'Frontend',
    yearsOfExperience: 6,
    description: 'Semantic markup, accessibility, and modern web standards'
  },
  {
    name: 'CSS3',
    level: 92,
    category: 'Frontend',
    yearsOfExperience: 6,
    description: 'Advanced CSS, Grid, Flexbox, animations, and responsive design'
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    category: 'Frontend',
    yearsOfExperience: 3,
    description: 'Utility-first CSS framework and custom design systems'
  },
  {
    name: 'Sass/SCSS',
    level: 85,
    category: 'Frontend',
    yearsOfExperience: 4,
    description: 'Advanced preprocessing, mixins, and modular CSS architecture'
  },

  // Backend
  {
    name: 'Node.js',
    level: 92,
    category: 'Backend',
    yearsOfExperience: 5,
    description: 'Server-side JavaScript, Express.js, and microservices architecture'
  },
  {
    name: 'Python',
    level: 85,
    category: 'Backend',
    yearsOfExperience: 4,
    description: 'Django, FastAPI, data processing, and automation scripts'
  },
  {
    name: 'Express.js',
    level: 90,
    category: 'Backend',
    yearsOfExperience: 4,
    description: 'RESTful APIs, middleware, authentication, and real-time applications'
  },
  {
    name: 'FastAPI',
    level: 80,
    category: 'Backend',
    yearsOfExperience: 2,
    description: 'Modern Python web framework with automatic API documentation'
  },
  {
    name: 'GraphQL',
    level: 78,
    category: 'Backend',
    yearsOfExperience: 2,
    description: 'Schema design, resolvers, and Apollo Server implementation'
  },
  {
    name: 'REST APIs',
    level: 95,
    category: 'Backend',
    yearsOfExperience: 5,
    description: 'API design, documentation, versioning, and best practices'
  },

  // Database
  {
    name: 'PostgreSQL',
    level: 88,
    category: 'Database',
    yearsOfExperience: 4,
    description: 'Advanced queries, indexing, performance tuning, and migrations'
  },
  {
    name: 'MongoDB',
    level: 82,
    category: 'Database',
    yearsOfExperience: 3,
    description: 'Document modeling, aggregation pipelines, and scaling strategies'
  },
  {
    name: 'Redis',
    level: 80,
    category: 'Database',
    yearsOfExperience: 3,
    description: 'Caching strategies, session management, and pub/sub patterns'
  },
  {
    name: 'Prisma',
    level: 85,
    category: 'Database',
    yearsOfExperience: 2,
    description: 'Type-safe database access, migrations, and schema management'
  },

  // DevOps & Tools
  {
    name: 'Docker',
    level: 85,
    category: 'DevOps',
    yearsOfExperience: 3,
    description: 'Containerization, multi-stage builds, and Docker Compose'
  },
  {
    name: 'AWS',
    level: 80,
    category: 'DevOps',
    yearsOfExperience: 3,
    description: 'EC2, S3, Lambda, RDS, and serverless architecture'
  },
  {
    name: 'Git',
    level: 92,
    category: 'DevOps',
    yearsOfExperience: 6,
    description: 'Advanced Git workflows, branching strategies, and collaboration'
  },
  {
    name: 'CI/CD',
    level: 78,
    category: 'DevOps',
    yearsOfExperience: 2,
    description: 'GitHub Actions, automated testing, and deployment pipelines'
  },
  {
    name: 'Kubernetes',
    level: 65,
    category: 'DevOps',
    yearsOfExperience: 1,
    description: 'Container orchestration, deployments, and service management'
  },

  // Mobile
  {
    name: 'React Native',
    level: 82,
    category: 'Mobile',
    yearsOfExperience: 2,
    description: 'Cross-platform mobile development and native module integration'
  },
  {
    name: 'Flutter',
    level: 70,
    category: 'Mobile',
    yearsOfExperience: 1,
    description: 'Dart programming and cross-platform mobile applications'
  },

  // Design & UX
  {
    name: 'Figma',
    level: 85,
    category: 'Design',
    yearsOfExperience: 3,
    description: 'UI/UX design, prototyping, and design system creation'
  },
  {
    name: 'Adobe XD',
    level: 75,
    category: 'Design',
    yearsOfExperience: 2,
    description: 'User interface design and interactive prototypes'
  },
  {
    name: 'UI/UX Design',
    level: 80,
    category: 'Design',
    yearsOfExperience: 4,
    description: 'User research, wireframing, and user-centered design principles'
  }
];

export const experience: Experience[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    startDate: '2022-03-01',
    current: true,
    description: 'Lead development of enterprise web applications serving 100K+ users. Architect scalable solutions using modern technologies and mentor junior developers.',
    achievements: [
      'Reduced application load time by 40% through performance optimization',
      'Led migration from monolithic to microservices architecture',
      'Mentored 5 junior developers and established code review processes',
      'Implemented automated testing pipeline reducing bugs by 60%'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    type: 'work'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    startDate: '2020-06-01',
    endDate: '2022-02-28',
    current: false,
    description: 'Developed and maintained multiple client projects from conception to deployment. Worked closely with design and product teams to deliver high-quality solutions.',
    achievements: [
      'Built 8 production applications from scratch',
      'Improved development workflow efficiency by 50%',
      'Implemented real-time features using WebSocket technology',
      'Achieved 99.9% uptime across all deployed applications'
    ],
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Redis', 'Digital Ocean'],
    type: 'work'
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebAgency Pro',
    location: 'Remote',
    startDate: '2019-01-01',
    endDate: '2020-05-31',
    current: false,
    description: 'Specialized in creating responsive, accessible web interfaces for diverse clients. Collaborated with designers to implement pixel-perfect designs.',
    achievements: [
      'Delivered 25+ responsive websites with 100% client satisfaction',
      'Reduced development time by 30% through component reusability',
      'Improved website accessibility scores to AAA compliance',
      'Established design system used across 15+ projects'
    ],
    technologies: ['React', 'Sass', 'JavaScript', 'Webpack', 'Figma'],
    type: 'work'
  },
  {
    id: '4',
    title: 'Junior Web Developer',
    company: 'Digital Solutions Inc',
    location: 'Denver, CO',
    startDate: '2018-03-01',
    endDate: '2018-12-31',
    current: false,
    description: 'Started career developing WordPress themes and custom web applications. Gained experience in full-stack development and client communication.',
    achievements: [
      'Developed 12 custom WordPress themes',
      'Learned modern JavaScript frameworks and best practices',
      'Contributed to open-source projects',
      'Received "Rising Star" award for exceptional growth'
    ],
    technologies: ['WordPress', 'PHP', 'jQuery', 'MySQL', 'HTML/CSS'],
    type: 'work'
  },
  {
    id: '5',
    title: 'Bachelor of Science in Computer Science',
    company: 'University of Colorado Boulder',
    location: 'Boulder, CO',
    startDate: '2014-08-01',
    endDate: '2018-05-31',
    current: false,
    description: 'Comprehensive computer science education with focus on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.',
    achievements: [
      'Graduated Magna Cum Laude (GPA: 3.8/4.0)',
      'President of Computer Science Student Association',
      'Winner of Annual Hackathon (2017, 2018)',
      'Teaching Assistant for Web Development course'
    ],
    technologies: ['Java', 'Python', 'C++', 'Data Structures', 'Algorithms'],
    type: 'education'
  }
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023-06-15',
    credentialId: 'AWS-SAA-2023-001234',
    url: 'https://aws.amazon.com/certification/',
    image: '/api/placeholder/200/150'
  },
  {
    id: '2',
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: '2023-03-20',
    credentialId: 'GCP-PD-2023-005678',
    url: 'https://cloud.google.com/certification/',
    image: '/api/placeholder/200/150'
  },
  {
    id: '3',
    name: 'Meta React Developer Certificate',
    issuer: 'Meta (Facebook)',
    date: '2022-11-10',
    credentialId: 'META-REACT-2022-009876',
    url: 'https://www.coursera.org/professional-certificates/meta-react-developer',
    image: '/api/placeholder/200/150'
  },
  {
    id: '4',
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    date: '2022-08-05',
    credentialId: 'MONGO-DEV-2022-543210',
    url: 'https://university.mongodb.com/certification',
    image: '/api/placeholder/200/150'
  },
  {
    id: '5',
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: '2022-04-18',
    credentialId: 'DOCKER-DCA-2022-112233',
    url: 'https://www.docker.com/certification',
    image: '/api/placeholder/200/150'
  }
];

export const skillCategories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'Design'
];

export const techStack = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
  backend: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'GraphQL'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  devops: ['Docker', 'AWS', 'Git', 'CI/CD'],
  mobile: ['React Native', 'Flutter'],
  design: ['Figma', 'Adobe XD', 'UI/UX Design']
};

export const stats = {
  yearsOfExperience: 6,
  projectsCompleted: 50,
  clientsSatisfied: 35,
  technologiesMastered: 25,
  linesOfCode: 500000,
  cupsOfCoffee: 2847
};