"use client"

import React from 'react';
import Link from 'next/link';

interface FooterLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks: FooterLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' }
  ];

  const resources: FooterLink[] = [
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Resume', href: '/resume.pdf' },
    { name: 'Portfolio', href: '/portfolio.pdf' }
  ];

  const socialLinks: SocialLink[] = [
    { name: 'GitHub', href: 'https://github.com/alexjohnson', icon: '🐙' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/alexjohnson', icon: '💼' },
    { name: 'Twitter', href: 'https://twitter.com/alexjohnson', icon: '🐦' },
    { name: 'Email', href: 'mailto:alex@example.com', icon: '📧' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-300 rounded-xl flex items-center justify-center text-gray-900 font-bold text-xl">
                A
              </div>
              <div>
                <h3 className="text-2xl font-bold">Alex Johnson</h3>
                <p className="text-gray-400">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Passionate about creating exceptional digital experiences through clean code, 
              innovative design, and cutting-edge technology. Let's build something amazing together.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-2xl hover:bg-gray-700 hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Get notified about new projects, blog posts, and opportunities.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Alex Johnson. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          >
            <span>Back to Top</span>
            <span className="text-lg">⬆️</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;