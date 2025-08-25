import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  icon,
  removable = false,
  onRemove
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-800 hover:bg-red-200',
    info: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes}>
      {icon && (
        <span className="mr-1">{icon}</span>
      )}
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors duration-200"
          type="button"
          aria-label="Remove badge"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

// Preset badge components
const SkillBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="primary" />
);

const StatusBadge: React.FC<Omit<BadgeProps, 'variant'> & { status: 'online' | 'offline' | 'busy' | 'away' }> = ({ status, ...props }) => {
  const statusConfig = {
    online: { variant: 'success' as BadgeVariant, icon: '🟢' },
    offline: { variant: 'default' as BadgeVariant, icon: '⚫' },
    busy: { variant: 'danger' as BadgeVariant, icon: '🔴' },
    away: { variant: 'warning' as BadgeVariant, icon: '🟡' }
  };
  
  return (
    <Badge 
      {...props} 
      variant={statusConfig[status].variant}
      icon={statusConfig[status].icon}
    />
  );
};

const CategoryBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="info" />
);

export default Badge;
export { SkillBadge, StatusBadge, CategoryBadge };