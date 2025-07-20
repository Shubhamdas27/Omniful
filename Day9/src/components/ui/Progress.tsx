import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'default' | 'lg';
  animate?: boolean;
  showLabel?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(({
  className,
  value = 0,
  max = 100,
  variant = 'default',
  size = 'default',
  animate = true,
  showLabel = false,
  ...props
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const baseClasses = "relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800";
  
  const variants = {
    default: "bg-gradient-to-r from-blue-500 to-blue-600",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    error: "bg-gradient-to-r from-red-500 to-red-600"
  };

  const sizes = {
    sm: "h-2",
    default: "h-3",
    lg: "h-4"
  };

  return (
    <div ref={ref} className="w-full space-y-2" {...props}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn(baseClasses, sizes[size], className)}>
        <motion.div
          className={cn("h-full rounded-full", variants[variant])}
          initial={animate ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={animate ? { 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.2 
          } : undefined}
          style={!animate ? { width: `${percentage}%` } : undefined}
        >
          {animate && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
});

Progress.displayName = "Progress";

// Circular Progress Component
interface CircularProgressProps {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animate?: boolean;
  className?: string;
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  animate = true,
  className,
  ...props
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    default: "#3B82F6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444"
  };

  const getSizeClass = (size: number) => {
    // Convert size to Tailwind classes
    if (size <= 64) return 'w-16 h-16';
    if (size <= 96) return 'w-24 h-24';
    if (size <= 120) return 'w-30 h-30';
    return 'w-32 h-32';
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center",
        getSizeClass(size),
        className
      )}
      {...props}
    >
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
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset }}
          animate={{ strokeDashoffset }}
          transition={animate ? {
            duration: 1.5,
            ease: "easeOut",
            delay: 0.2
          } : undefined}
          style={!animate ? { strokeDashoffset } : undefined}
        />
      </svg>
      
      {showLabel && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={animate ? { opacity: 0, scale: 0.5 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={animate ? { delay: 0.5, duration: 0.5 } : undefined}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(percentage)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Progress
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
});

CircularProgress.displayName = "CircularProgress";

export { Progress, CircularProgress };
