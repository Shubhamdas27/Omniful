import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  renderOption?: (option: Option, isSelected: boolean) => ReactNode;
}

export default function Select({
  options,
  value,
  placeholder = "Select an option",
  searchable = false,
  disabled = false,
  className,
  onChange,
  renderOption
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleSelect = (option: Option) => {
    if (!option.disabled) {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div ref={selectRef} className={cn("relative w-full", className)}>
      <motion.button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative w-full px-4 py-3 text-left bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-200",
          isOpen && "ring-2 ring-blue-500/20 border-blue-500/50"
        )}
        whileTap={{ scale: 0.995 }}
      >
        <span className={cn(
          "block truncate",
          selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.span
          className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-xl shadow-2xl overflow-hidden"
          >
            {searchable && (
              <div className="p-3 border-b border-white/10 dark:border-gray-600/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border border-white/20 dark:border-gray-600/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}
            
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={cn(
                      "relative w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:outline-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      selectedOption?.value === option.value && "bg-blue-100 dark:bg-blue-900/30"
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      {renderOption ? (
                        renderOption(option, selectedOption?.value === option.value)
                      ) : (
                        <>
                          <span className={cn(
                            "block truncate",
                            selectedOption?.value === option.value 
                              ? "font-semibold text-blue-600 dark:text-blue-400" 
                              : "text-gray-900 dark:text-white"
                          )}>
                            {option.label}
                          </span>
                          {selectedOption?.value === option.value && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-blue-600 dark:text-blue-400"
                            >
                              <Check className="w-5 h-5" />
                            </motion.span>
                          )}
                        </>
                      )}
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
