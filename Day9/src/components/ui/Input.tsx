import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface InputProps {
  className?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
}

export default function Input({ className, label, type = 'text', placeholder, value, onChange, onFocus, onBlur, required }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className="relative">
      <motion.input
        className={cn(
          "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-purple-400 transition-all duration-300",
          isFocused && "border-purple-400 shadow-lg shadow-purple-400/20",
          className
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      
      {(label || placeholder) && (
        <motion.label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none",
            isFocused || hasValue || value
              ? "top-2 text-xs text-purple-300"
              : "top-1/2 -translate-y-1/2 text-white/60"
          )}
          animate={{
            y: isFocused || hasValue || value ? -6 : 0,
            scale: isFocused || hasValue || value ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label || placeholder}
        </motion.label>
      )}
    </div>
  );
}