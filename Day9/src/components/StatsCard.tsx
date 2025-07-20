import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../utils/cn';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  delay?: number;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  trend, 
  delay = 0 
}: StatsCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const numericValue = parseInt(value.replace(/[^\d]/g, ''));

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedValue(prev => {
          if (prev < numericValue) {
            return Math.min(prev + Math.ceil(numericValue / 20), numericValue);
          }
          clearInterval(interval);
          return numericValue;
        });
      }, 50);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [numericValue, delay]);

  const trendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  }[trend];

  const trendColor = {
    up: 'text-emerald-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }[trend];

  const TrendIcon = trendIcon;

  return (
    <motion.div
      className="executive-glass rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500 corporate-texture"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -8 }}
    >
      {/* Enhanced Background Gradient */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500",
          color
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      />

      {/* Animated Border Glow */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-30 blur-sm",
          color
        )}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className={cn(
              "w-14 h-14 rounded-2xl bg-gradient-to-r flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300",
              color
            )}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: delay + 0.3, 
              duration: 0.6, 
              type: "spring", 
              stiffness: 200 
            }}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon className="w-7 h-7 text-white drop-shadow-sm" />
          </motion.div>

          <motion.div
            className={cn("flex items-center space-x-1", trendColor)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.5 }}
          >
            <TrendIcon className="w-5 h-5" />
          </motion.div>
        </div>

        <motion.h3
          className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          {value.includes('%') || value.includes('$') 
            ? value 
            : animatedValue.toLocaleString()
          }
        </motion.h3>

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {title}
        </p>

        <motion.p
          className="text-xs text-gray-600 dark:text-gray-400 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.6 }}
        >
          {change}
        </motion.p>
      </div>

      {/* Enhanced Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}