import React from 'react';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
  onClick
}) => {
  const baseClasses = 'rounded-3xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-lg',
    elevated: 'bg-white shadow-xl',
    outlined: 'bg-white border-2 border-gray-200',
    glass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

// Card sub-components
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-bold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-gray-600 mt-2 ${className}`}>
    {children}
  </p>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mt-6 pt-6 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

// Export all components
export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };