export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  readTime: number;
  views: number;
  likes: number;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    excerpt: 'Learn how to structure and build maintainable React applications using TypeScript, focusing on best practices for large-scale projects.',
    content: `# Building Scalable React Applications with TypeScript

TypeScript has become an essential tool for building robust React applications. In this comprehensive guide, we'll explore the best practices for creating scalable, maintainable React applications using TypeScript.

## Why TypeScript for React?

TypeScript brings several advantages to React development:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete, refactoring, and navigation
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Confident code changes with type checking

## Project Structure

A well-organized project structure is crucial for scalability:

\`\`\`
src/
├── components/
│   ├── ui/
│   └── features/
├── hooks/
├── types/
├── utils/
├── services/
└── pages/
\`\`\`

## Component Patterns

### 1. Typed Props Interface

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  disabled = false, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### 2. Custom Hooks with TypeScript

\`\`\`typescript
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
}
\`\`\`

## State Management

For complex applications, consider using Redux Toolkit with TypeScript:

\`\`\`typescript
interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
\`\`\`

## Testing with TypeScript

TypeScript makes testing more reliable:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn();
    
    render(
      <Button variant="primary" onClick={mockOnClick}>
        Click me
      </Button>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

## Performance Optimization

1. **Lazy Loading**: Use React.lazy() with proper typing
2. **Memoization**: Leverage useMemo and useCallback with TypeScript
3. **Bundle Analysis**: Monitor TypeScript compilation output

## Conclusion

TypeScript significantly improves the React development experience by providing type safety, better tooling, and enhanced maintainability. By following these patterns and best practices, you can build scalable React applications that are easier to maintain and debug.

Start small, gradually adopt TypeScript features, and enjoy the benefits of a more robust development workflow.`,
    author: 'Alex Johnson',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    category: 'Development',
    tags: ['React', 'TypeScript', 'Frontend', 'Best Practices'],
    featured: true,
    image: '/api/placeholder/800/400',
    readTime: 8,
    views: 2547,
    likes: 189,
    slug: 'building-scalable-react-applications-typescript'
  },
  {
    id: '2',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Explore the emerging trends and technologies that are shaping the future of web development, from AI integration to new frameworks.',
    content: `# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies. Let's explore what's on the horizon.

## 1. AI-Powered Development Tools

Artificial Intelligence is revolutionizing how we write code:

- **Code Generation**: Tools like GitHub Copilot and ChatGPT are becoming more sophisticated
- **Automated Testing**: AI can generate comprehensive test suites
- **Bug Detection**: Machine learning models can identify potential issues before they reach production

## 2. Edge Computing and CDNs

The push for faster, more responsive applications continues:

- **Edge Functions**: Running code closer to users for reduced latency
- **Distributed Databases**: Data replication across multiple regions
- **Smart Caching**: AI-driven cache optimization

## 3. WebAssembly (WASM) Adoption

WebAssembly is gaining traction for performance-critical applications:

\`\`\`rust
// Rust code compiled to WebAssembly
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
\`\`\`

## 4. Micro-Frontends Architecture

Breaking down monolithic frontends:

- **Independent Deployment**: Teams can deploy features independently
- **Technology Diversity**: Different parts can use different frameworks
- **Scalable Teams**: Better organization for large development teams

## 5. Progressive Web Apps (PWAs) 2.0

PWAs are becoming more powerful:

- **Advanced Capabilities**: File system access, background sync
- **Better Performance**: Improved caching strategies
- **Native Integration**: Deeper OS integration

## 6. Sustainability in Web Development

Green coding practices are becoming essential:

- **Carbon-Aware Computing**: Optimizing for energy efficiency
- **Lightweight Frameworks**: Reducing bundle sizes
- **Efficient Algorithms**: Writing more performant code

## 7. Enhanced Developer Experience

Tooling continues to improve:

- **Hot Module Replacement**: Faster development cycles
- **Better Debugging**: Advanced browser dev tools
- **Integrated Testing**: Seamless testing workflows

## Conclusion

The future of web development is bright, with AI assistance, better performance, and improved developer experiences leading the way. Stay curious, keep learning, and embrace these emerging trends to stay ahead in your development career.

What trends are you most excited about? Let me know in the comments!`,
    author: 'Alex Johnson',
    publishedAt: '2024-01-10T09:00:00Z',
    category: 'Technology',
    tags: ['Web Development', 'Trends', 'AI', 'Future Tech'],
    featured: true,
    image: '/api/placeholder/800/400',
    readTime: 6,
    views: 1823,
    likes: 142,
    slug: 'future-web-development-trends-2024'
  },
  {
    id: '3',
    title: 'Mastering CSS Grid: A Complete Guide',
    excerpt: 'Deep dive into CSS Grid layout system with practical examples and real-world use cases for modern web layouts.',
    content: `# Mastering CSS Grid: A Complete Guide

CSS Grid is one of the most powerful layout systems available in CSS. This comprehensive guide will take you from beginner to advanced Grid techniques.

## Grid Basics

CSS Grid is a two-dimensional layout system that allows you to work with both rows and columns:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100vh;
}
\`\`\`

## Grid Template Areas

One of the most intuitive features of CSS Grid:

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Grid Layouts

Create responsive layouts without media queries:

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

## Advanced Grid Techniques

### Subgrid (Limited Support)

\`\`\`css
.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.child {
  display: grid;
  grid-column: 1 / 4;
  grid-template-columns: subgrid;
}
\`\`\`

### Grid Animation

\`\`\`css
.animated-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  transition: grid-template-columns 0.3s ease;
}

.animated-grid:hover {
  grid-template-columns: 2fr 1fr 1fr;
}
\`\`\`

## Common Grid Patterns

### Card Layout

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
\`\`\`

### Holy Grail Layout

\`\`\`css
.holy-grail {
  display: grid;
  grid-template:
    "header header header" auto
    "nav main aside" 1fr
    "footer footer footer" auto
    / 200px 1fr 200px;
  min-height: 100vh;
}
\`\`\`

## Grid vs Flexbox

When to use each:

- **Grid**: Two-dimensional layouts, complex positioning
- **Flexbox**: One-dimensional layouts, component alignment

## Browser Support and Fallbacks

\`\`\`css
.grid-fallback {
  /* Flexbox fallback */
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .grid-fallback {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
\`\`\`

## Debugging Grid

Use Firefox Grid Inspector or Chrome DevTools:

1. Open DevTools
2. Select grid container
3. Click grid badge
4. Visualize grid lines and areas

## Conclusion

CSS Grid is a game-changer for web layouts. With its powerful features and intuitive syntax, you can create complex, responsive layouts with minimal code. Practice these techniques and experiment with different patterns to master Grid layout.

Happy coding!`,
    author: 'Alex Johnson',
    publishedAt: '2024-01-05T11:30:00Z',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Layout', 'Responsive Design'],
    featured: false,
    image: '/api/placeholder/800/400',
    readTime: 10,
    views: 3421,
    likes: 267,
    slug: 'mastering-css-grid-complete-guide'
  },
  {
    id: '4',
    title: 'Node.js Performance Optimization Techniques',
    excerpt: 'Learn advanced techniques to optimize your Node.js applications for better performance, scalability, and resource efficiency.',
    content: `# Node.js Performance Optimization Techniques

Node.js applications can handle thousands of concurrent connections, but poor optimization can lead to bottlenecks. Let's explore proven techniques to maximize performance.

## 1. Event Loop Optimization

Understanding the event loop is crucial:

\`\`\`javascript
// Bad: Blocking the event loop
function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += i;
  }
  return result;
}

// Good: Non-blocking approach
function heavyComputationAsync(callback) {
  setImmediate(() => {
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
      result += i;
    }
    callback(null, result);
  });
}
\`\`\`

## 2. Memory Management

### Avoid Memory Leaks

\`\`\`javascript
// Bad: Memory leak
const cache = {};
function addToCache(key, value) {
  cache[key] = value; // Never cleaned up
}

// Good: Use Map with size limit
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, value); // Move to end
    }
    return value;
  }
}
\`\`\`

## 3. Database Optimization

### Connection Pooling

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'myapp',
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use pool instead of individual connections
async function getUser(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}
\`\`\`

### Query Optimization

\`\`\`javascript
// Bad: N+1 query problem
async function getUsersWithPosts() {
  const users = await User.findAll();
  for (const user of users) {
    user.posts = await Post.findAll({ where: { userId: user.id } });
  }
  return users;
}

// Good: Use joins or eager loading
async function getUsersWithPosts() {
  return User.findAll({
    include: [{ model: Post }]
  });
}
\`\`\`

## 4. Caching Strategies

### Redis Caching

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

function cacheMiddleware(duration = 300) {
  return async (req, res, next) => {
    const key = req.originalUrl;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Store original res.json
      const originalJson = res.json;
      res.json = function(data) {
        // Cache the response
        client.setex(key, duration, JSON.stringify(data));
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
}
\`\`\`

## 5. Clustering and Load Balancing

\`\`\`javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers can share any TCP port
  require('./app.js');
  console.log(\`Worker \${process.pid} started\`);
}
\`\`\`

## 6. Monitoring and Profiling

### Performance Monitoring

\`\`\`javascript
const performanceMiddleware = (req, res, next) => {
  const start = process.hrtime.bigint();
  
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1000000; // Convert to ms
    
    console.log(\`\${req.method} \${req.url} - \${duration.toFixed(2)}ms\`);
    
    // Log slow requests
    if (duration > 1000) {
      console.warn(\`Slow request detected: \${req.url}\`);
    }
  });
  
  next();
};
\`\`\`

## 7. Code Optimization

### Async/Await Best Practices

\`\`\`javascript
// Bad: Sequential execution
async function processUsers() {
  const user1 = await getUser(1);
  const user2 = await getUser(2);
  const user3 = await getUser(3);
  return [user1, user2, user3];
}

// Good: Parallel execution
async function processUsers() {
  const [user1, user2, user3] = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
  return [user1, user2, user3];
}
\`\`\`

## 8. Production Optimizations

### Environment Configuration

\`\`\`javascript
// Use production-optimized settings
if (process.env.NODE_ENV === 'production') {
  // Disable detailed error messages
  app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
  // Enable compression
  app.use(compression());
  
  // Set security headers
  app.use(helmet());
}
\`\`\`

## Conclusion

Node.js performance optimization is an ongoing process. Monitor your applications, identify bottlenecks, and apply these techniques systematically. Remember that premature optimization can be counterproductive—measure first, then optimize.

Key takeaways:
- Keep the event loop free
- Manage memory carefully
- Optimize database queries
- Implement effective caching
- Monitor performance continuously

Happy optimizing!`,
    author: 'Alex Johnson',
    publishedAt: '2023-12-28T16:45:00Z',
    category: 'Backend',
    tags: ['Node.js', 'Performance', 'Optimization', 'Backend'],
    featured: false,
    image: '/api/placeholder/800/400',
    readTime: 12,
    views: 1967,
    likes: 156,
    slug: 'nodejs-performance-optimization-techniques'
  },
  {
    id: '5',
    title: 'Getting Started with Docker for Web Developers',
    excerpt: 'A beginner-friendly guide to Docker containerization, covering the basics and practical examples for web development workflows.',
    content: `# Getting Started with Docker for Web Developers

Docker has revolutionized how we develop, deploy, and scale applications. This guide will get you up and running with Docker for web development.

## What is Docker?

Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers.

### Benefits:
- **Consistency**: Same environment across development, testing, and production
- **Isolation**: Applications run in isolated environments
- **Portability**: Containers run anywhere Docker is installed
- **Scalability**: Easy to scale applications horizontally

## Docker Basics

### Key Concepts

- **Image**: A template for creating containers
- **Container**: A running instance of an image
- **Dockerfile**: Instructions for building an image
- **Registry**: A repository for Docker images (like Docker Hub)

### Basic Commands

\`\`\`bash
# Pull an image
docker pull nginx:latest

# Run a container
docker run -d -p 8080:80 nginx:latest

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>
\`\`\`

## Creating Your First Dockerfile

Let's containerize a Node.js application:

\`\`\`dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Start the application
CMD ["npm", "start"]
\`\`\`

### Building and Running

\`\`\`bash
# Build the image
docker build -t my-node-app .

# Run the container
docker run -d -p 3000:3000 --name my-app my-node-app
\`\`\`

## Docker Compose for Multi-Service Applications

For applications with multiple services (app, database, cache):

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

### Running with Compose

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up --build
\`\`\`

## Development Workflow

### Hot Reloading Setup

\`\`\`dockerfile
# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
\`\`\`

\`\`\`yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
\`\`\`

## Best Practices

### 1. Multi-Stage Builds

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### 2. Optimize Layer Caching

\`\`\`dockerfile
# Copy package files first (changes less frequently)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code last (changes more frequently)
COPY . .
\`\`\`

### 3. Use .dockerignore

\`\`\`
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.cache
\`\`\`

### 4. Health Checks

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Debugging Docker Containers

\`\`\`bash
# Execute commands in running container
docker exec -it <container_id> /bin/sh

# View container logs
docker logs -f <container_id>

# Inspect container details
docker inspect <container_id>

# Monitor resource usage
docker stats
\`\`\`

## Production Deployment

### Security Considerations

\`\`\`dockerfile
# Use specific versions
FROM node:18.17.0-alpine

# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Remove unnecessary packages
RUN apk del .build-deps
\`\`\`

### Environment Variables

\`\`\`bash
# Use environment-specific compose files
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
\`\`\`

## Conclusion

Docker simplifies development workflows and ensures consistency across environments. Start with simple containers, then gradually adopt more advanced features like multi-stage builds and orchestration.

Key benefits:
- Consistent development environments
- Simplified deployment process
- Better resource utilization
- Easier scaling and maintenance

Next steps: Explore Kubernetes for container orchestration and CI/CD integration with Docker.

Happy containerizing!`,
    author: 'Alex Johnson',
    publishedAt: '2023-12-20T13:20:00Z',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', 'Containerization', 'Deployment'],
    featured: false,
    image: '/api/placeholder/800/400',
    readTime: 15,
    views: 2134,
    likes: 178,
    slug: 'getting-started-docker-web-developers'
  }
];

export const blogCategories = [
  'All',
  'Development',
  'Technology',
  'CSS',
  'Backend',
  'DevOps',
  'AI/ML',
  'Mobile'
];

export const popularTags = [
  'React',
  'TypeScript',
  'Node.js',
  'CSS',
  'JavaScript',
  'Docker',
  'Performance',
  'Best Practices',
  'Frontend',
  'Backend'
];