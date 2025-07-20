import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  className
}: DialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl mx-4'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Dialog Content */}
          <motion.div
            className={cn(
              "relative w-full mx-4 executive-glass rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden",
              sizes[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-600/10">
                <div className="flex-1">
                  {title && (
                    <motion.h2
                      className="text-2xl font-semibold text-gray-900 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {title}
                    </motion.h2>
                  )}
                  {description && (
                    <motion.p
                      className="mt-2 text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {description}
                    </motion.p>
                  )}
                </div>
                
                {showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    className="ml-4 p-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Content */}
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Dialog Trigger Component
interface DialogTriggerProps {
  children: ReactNode;
  dialog: ReactNode;
  triggerClassName?: string;
}

export function DialogTrigger({ children, dialog, triggerClassName }: DialogTriggerProps) {
  return (
    <div className={cn("inline-block", triggerClassName)}>
      {children}
      {dialog}
    </div>
  );
}

// Dialog Content Components
export function DialogHeader({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return (
    <h3 className={cn("text-2xl font-semibold text-gray-900 dark:text-white", className)} {...props}>
      {children}
    </h3>
  );
}

export function DialogDescription({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return (
    <p className={cn("text-gray-600 dark:text-gray-400", className)} {...props}>
      {children}
    </p>
  );
}

export function DialogFooter({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 pt-4 border-t border-white/10 dark:border-gray-600/10 mt-6", className)} {...props}>
      {children}
    </div>
  );
}
