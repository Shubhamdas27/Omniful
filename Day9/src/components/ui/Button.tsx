import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600",
    outline: "border-2 border-white/30 text-gray-800 dark:text-white backdrop-blur-sm bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 shadow-md hover:shadow-lg",
    ghost: "text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const motionProps: MotionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 }
  };

  return (
    <motion.button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      {...motionProps}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}