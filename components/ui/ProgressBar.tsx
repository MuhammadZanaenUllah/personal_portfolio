'use client';
import React, { useEffect, useState } from 'react';

type ProgressVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  animated?: boolean;
  striped?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  animated = false,
  striped = false,
  showLabel = false,
  label,
  className = '',
  animate = true
}) => {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, animate]);
  
  const percentage = Math.min((displayValue / max) * 100, 100);
  
  const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden';
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const variantClasses = {
    default: 'bg-gray-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  };
  
  const progressClasses = `h-full transition-all duration-1000 ease-out ${variantClasses[variant]}`;
  const stripedClasses = striped ? 'bg-stripes' : '';
  const animatedClasses = animated ? 'animate-pulse' : '';
  
  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || `Progress`}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`${baseClasses} ${sizeClasses[size]}`}>
        <div
          className={`${progressClasses} ${stripedClasses} ${animatedClasses}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Skill Progress Bar with icon
interface SkillProgressProps extends Omit<ProgressBarProps, 'showLabel' | 'label'> {
  skill: string;
  icon?: React.ReactNode;
}

const SkillProgress: React.FC<SkillProgressProps> = ({
  skill,
  icon,
  value,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="font-medium text-gray-900">{skill}</span>
        <span className="ml-auto text-sm font-semibold text-gray-600">
          {value}%
        </span>
      </div>
      <ProgressBar
        value={value}
        variant="default"
        size="md"
        {...props}
      />
    </div>
  );
};

// Circular Progress Bar
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  label,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const variantColors = {
    default: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6'
  };
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={variantColors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-sm text-gray-600 mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
export { SkillProgress, CircularProgress };