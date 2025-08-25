'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(() => {
    const baseItems = [
      { name: 'Home', href: '/', icon: '🏠' },
      { name: 'About', href: '/about', icon: '👨‍💻' },
      { name: 'Skills', href: '/skills', icon: '⚡' },
      { name: 'Projects', href: '/projects', icon: '🚀' },
      { name: 'Blog', href: '/blog', icon: '📝' },
      { name: 'Contact', href: '/contact', icon: '📧' }
    ];

    // Add admin link in development or with admin parameter
    const showAdmin = process.env.NODE_ENV === 'development' || 
      (typeof window !== 'undefined' && window.location.search.includes('admin=true'));
    
    if (showAdmin) {
      baseItems.push({ name: 'Admin', href: '/admin', icon: '⚙️' });
    }

    return baseItems;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Update active index when pathname changes
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => {
      if (item.href === '/') {
        return pathname === '/';
      }
      return pathname.startsWith(item.href);
    });
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname, navItems]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out animate-in slide-in-from-top-4 fade-in ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl">
              Z
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-all duration-300 group-hover:tracking-wide">
              <span className="hidden sm:inline">M.Zanaen Ullah</span>
              <span className="sm:hidden">Zanaen</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center relative">
            {/* Sliding background indicator - only show on larger screens */}
            <div 
              className="absolute w-24 lg:w-28 h-10 bg-black rounded-full transition-all duration-500 ease-out shadow-lg hidden sm:block"
              style={{
                transform: `translateX(${activeIndex * (windowWidth >= 1024 ? 112 : 96)}px)`,
                zIndex: 0
              }}
            />
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`w-24 lg:w-28 px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1 relative group animate-in slide-in-from-top-2 fade-in z-10 ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-gray-700 hover:text-black'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <span className="text-base transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">{item.icon}</span>
                <span className="relative hidden sm:inline">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-lg"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:scale-110 transition-all duration-300 group animate-in slide-in-from-top-2 fade-in"
            style={{
              animationDelay: `${navItems.length * 100}ms`
            }}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-500 ease-out ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-500 ease-out ${
                isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-500 ease-out flex items-center gap-3 hover:scale-105 hover:-translate-y-1 hover:shadow-md group ${
                  isOpen ? 'animate-in slide-in-from-left-4 fade-in' : 'animate-out slide-out-to-left-4 fade-out'
                } ${
                  isActive(item.href)
                    ? 'bg-black text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                }`}
                style={{
                  animationDelay: isOpen ? `${index * 100 + 200}ms` : '0ms'
                }}
              >
                <span className="text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">{item.icon}</span>
                <span className="relative">
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`} />
                </span>
              </Link>
            ))}
            <div className={`pt-4 border-t border-gray-200 transition-all duration-500 ease-out ${
              isOpen ? 'animate-in slide-in-from-left-4 fade-in' : 'animate-out slide-out-to-left-4 fade-out'
            }`}
            style={{
              animationDelay: isOpen ? `${navItems.length * 100 + 300}ms` : '0ms'
            }}>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-lg"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;