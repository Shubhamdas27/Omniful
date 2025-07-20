import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  animate?: boolean;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({
  className,
  variant = 'default',
  size = 'default',
  animate = false,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-colors";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-800/20 dark:text-emerald-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
    error: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400",
    outline: "border border-gray-200 bg-transparent text-gray-700 dark:border-gray-700 dark:text-gray-300"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        whileHover={{ scale: 1.05 }}
        {...(props as any)}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge };
