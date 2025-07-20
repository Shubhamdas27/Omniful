import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'executive' | 'gradient';
  hover?: boolean;
  animate?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  hover = true,
  animate = true,
  children,
  ...props
}, ref) => {
  const baseClasses = "rounded-xl border shadow-sm";
  
  const variants = {
    default: "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800",
    glass: "executive-glass border-white/20 dark:border-white/10",
    executive: "executive-glass corporate-texture border-white/20 dark:border-white/10",
    gradient: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-gray-200 dark:border-gray-800"
  };

  const animateProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    ...(hover && {
      whileHover: { y: -4, scale: 1.02 },
      transition: { duration: 0.2 }
    })
  } : {};

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          hover && "transition-all duration-300 hover:shadow-lg",
          className
        )}
        {...animateProps}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        hover && "transition-all duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
