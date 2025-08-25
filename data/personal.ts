export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  avatar: string;
  resume: string;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message: string;
  };
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
  followers?: number;
}

export interface ContactMethod {
  type: string;
  value: string;
  icon: string;
  primary: boolean;
}

export const personalInfo: PersonalInfo = {
  name: 'Alex Johnson',
  title: 'Full Stack Developer',
  tagline: 'Building digital experiences that matter',
  bio: `I'm a passionate full-stack developer with 6+ years of experience creating scalable web applications and digital solutions. I specialize in React, Node.js, and modern web technologies, with a strong focus on user experience and performance optimization.

My journey in tech started with a curiosity about how websites work, which led me to pursue a Computer Science degree and eventually become a professional developer. I love solving complex problems, learning new technologies, and collaborating with teams to build products that make a real impact.

When I'm not coding, you can find me hiking in the mountains, experimenting with new recipes, or contributing to open-source projects. I believe in continuous learning and sharing knowledge with the developer community.`,
  location: 'San Francisco, CA',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  website: 'https://alexjohnson.dev',
  avatar: '/api/placeholder/400/400',
  resume: '/resume-alex-johnson.pdf',
  availability: {
    status: 'available',
    message: 'Available for new opportunities and freelance projects'
  }
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alexjohnson',
    icon: 'github',
    username: '@alexjohnson',
    followers: 1247
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/alexjohnson-dev',
    icon: 'linkedin',
    username: 'alexjohnson-dev',
    followers: 2156
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/alexjohnson_dev',
    icon: 'twitter',
    username: '@alexjohnson_dev',
    followers: 892
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/alexjohnson.codes',
    icon: 'instagram',
    username: '@alexjohnson.codes',
    followers: 634
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@alexjohnsondev',
    icon: 'youtube',
    username: 'Alex Johnson Dev',
    followers: 15420
  },
  {
    name: 'Dev.to',
    url: 'https://dev.to/alexjohnson',
    icon: 'dev',
    username: '@alexjohnson',
    followers: 567
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@alexjohnson',
    icon: 'medium',
    username: '@alexjohnson',
    followers: 1089
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/alexjohnson',
    icon: 'dribbble',
    username: 'alexjohnson',
    followers: 234
  }
];

export const contactMethods: ContactMethod[] = [
  {
    type: 'Email',
    value: 'alex.johnson@example.com',
    icon: 'mail',
    primary: true
  },
  {
    type: 'Phone',
    value: '+1 (555) 123-4567',
    icon: 'phone',
    primary: true
  },
  {
    type: 'Location',
    value: 'San Francisco, CA',
    icon: 'map-pin',
    primary: false
  },
  {
    type: 'Website',
    value: 'alexjohnson.dev',
    icon: 'globe',
    primary: false
  },
  {
    type: 'LinkedIn',
    value: 'linkedin.com/in/alexjohnson-dev',
    icon: 'linkedin',
    primary: false
  },
  {
    type: 'GitHub',
    value: 'github.com/alexjohnson',
    icon: 'github',
    primary: false
  }
];

export const workingHours = {
  timezone: 'PST (UTC-8)',
  schedule: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'Available for urgent matters',
    sunday: 'Offline'
  },
  responseTime: 'Usually responds within 2-4 hours during business days'
};

export const interests = [
  'Web Development',
  'Open Source',
  'Machine Learning',
  'UI/UX Design',
  'Photography',
  'Hiking',
  'Cooking',
  'Travel',
  'Music Production',
  'Gaming',
  'Reading',
  'Fitness'
];

export const languages = [
  {
    name: 'English',
    level: 'Native',
    proficiency: 100
  },
  {
    name: 'Spanish',
    level: 'Conversational',
    proficiency: 70
  },
  {
    name: 'French',
    level: 'Basic',
    proficiency: 40
  },
  {
    name: 'Japanese',
    level: 'Learning',
    proficiency: 25
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Product Manager at TechCorp',
    company: 'TechCorp Solutions',
    content: 'Alex is an exceptional developer who consistently delivers high-quality work. His attention to detail and ability to solve complex problems makes him invaluable to any team.',
    avatar: '/api/placeholder/100/100',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'CTO',
    company: 'StartupXYZ',
    content: 'Working with Alex was a game-changer for our startup. He built our entire platform from scratch and helped us scale to thousands of users. Highly recommended!',
    avatar: '/api/placeholder/100/100',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Davis',
    title: 'Design Lead',
    company: 'WebAgency Pro',
    content: 'Alex has an incredible ability to translate designs into pixel-perfect, responsive websites. His collaboration skills and technical expertise are outstanding.',
    avatar: '/api/placeholder/100/100',
    rating: 5
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Senior Developer',
    company: 'Digital Solutions Inc',
    content: 'I had the pleasure of mentoring Alex early in his career. His growth mindset and dedication to learning new technologies is truly impressive.',
    avatar: '/api/placeholder/100/100',
    rating: 5
  }
];

export const achievements = [
  {
    title: 'Top Contributor',
    description: 'Recognized as top contributor to React open-source projects',
    year: '2023',
    icon: 'award'
  },
  {
    title: 'Hackathon Winner',
    description: 'First place at TechCrunch Disrupt Hackathon',
    year: '2022',
    icon: 'trophy'
  },
  {
    title: 'Speaker',
    description: 'Keynote speaker at React Conference 2022',
    year: '2022',
    icon: 'mic'
  },
  {
    title: 'Mentor of the Year',
    description: 'Recognized for outstanding mentorship in developer community',
    year: '2021',
    icon: 'users'
  },
  {
    title: 'Innovation Award',
    description: 'Company innovation award for performance optimization project',
    year: '2021',
    icon: 'lightbulb'
  }
];