'use client';
import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'slide-up';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          }, delay);
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, once, hasAnimated]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'fade-in-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'fade-in-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
        case 'fade-in-left':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'fade-in-right':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'scale-in':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        case 'slide-up':
          return `${baseClasses} ${durationClass} translate-y-full`;
        default:
          return `${baseClasses} ${durationClass} opacity-0`;
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

// Preset animated components
const FadeInUp: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="fade-in-up" />
);

const FadeIn: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="fade-in" />
);

const ScaleIn: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="scale-in" />
);

const SlideInLeft: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="fade-in-left" />
);

const SlideInRight: React.FC<Omit<AnimatedSectionProps, 'animation'>> = (props) => (
  <AnimatedSection {...props} animation="fade-in-right" />
);

export default AnimatedSection;
export { FadeInUp, FadeIn, ScaleIn, SlideInLeft, SlideInRight };