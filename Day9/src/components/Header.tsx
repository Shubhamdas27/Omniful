import { motion } from 'framer-motion';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      className="h-20 executive-glass border-b border-white/20 dark:border-white/10 px-8 shadow-lg relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Executive Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 via-transparent to-indigo-600/3 dark:from-blue-500/5 dark:via-transparent dark:to-indigo-500/5" />
      
      <div className="flex items-center justify-between h-full relative z-10">
        {/* Enhanced Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-colors" />
            <motion.input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-6 py-3 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-gray-600/30 rounded-2xl text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </div>

        {/* Enhanced Right Section */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-white/30 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 border border-white/20 dark:border-gray-600/20 shadow-md hover:shadow-lg transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-yellow-500 drop-shadow-sm group-hover:text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-purple-600 drop-shadow-sm group-hover:text-purple-700" />
              )}
            </motion.div>
          </motion.button>

          {/* Enhanced Notifications */}
          <motion.button
            className="relative p-3 rounded-2xl bg-white/30 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 border border-white/20 dark:border-gray-600/20 shadow-md hover:shadow-lg transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            <motion.span
              className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs text-white font-bold">3</span>
            </motion.span>
          </motion.button>

          {/* Enhanced User Profile Section */}
          <div className="flex items-center space-x-4 pl-4 border-l border-white/20 dark:border-gray-600/20">
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {user?.name}
              </p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                {user?.role} Account
              </p>
            </div>
            
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 rounded-2xl border-3 border-white/30 dark:border-gray-600/30 shadow-lg overflow-hidden">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-3 border-white dark:border-gray-800 shadow-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <Button
              variant="outline"
              size="md"
              onClick={logout}
              className="ml-4 bg-white/20 dark:bg-white/10 border-2 border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-white/20 shadow-md hover:shadow-lg font-bold px-6"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}