import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  GraduationCap,
  UserCheck,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';

const menuItems = {
  student: [
    { icon: Home, label: 'Dashboard', path: '/student' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: FileText, label: 'Assignments', path: '/assignments' },
    { icon: BarChart3, label: 'Grades', path: '/grades' },
  ],
  teacher: [
    { icon: Home, label: 'Dashboard', path: '/teacher' },
    { icon: Users, label: 'Classes', path: '/classes' },
    { icon: UserCheck, label: 'Attendance', path: '/attendance' },
    { icon: FileText, label: 'Assignments', path: '/assignments' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ],
  admin: [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: GraduationCap, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Schedules', path: '/schedules' },
    { icon: FileText, label: 'Enrollment', path: '/enroll' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const items = user ? menuItems[user.role] : [];

  return (
    <motion.div
      className={cn(
        "h-screen executive-glass border-r border-white/20 dark:border-white/10 shadow-2xl transition-all duration-500 relative corporate-texture",
        isCollapsed ? "w-20" : "w-72"
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Executive Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/3 via-transparent to-indigo-600/3 dark:from-blue-500/5 dark:via-transparent dark:to-indigo-500/5" />
      
      <div className="flex flex-col h-full relative z-10">
        {/* Enhanced Logo Section */}
        <div className="p-6">
          <motion.div
            className="flex items-center"
            layout
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-700 flex items-center justify-center shadow-xl border border-white/20 dark:border-white/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <GraduationCap className="w-7 h-7 text-white drop-shadow-lg" />
            </motion.div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="ml-4"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                    College Aaja Bhai
                  </h1>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {user?.role} Portal
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={item.path}>
                    <motion.div
                      className={cn(
                        "w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-300 group relative font-medium shadow-md hover:shadow-xl cursor-pointer",
                        isActive
                          ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-700 dark:text-purple-300 border-2 border-purple-400/50"
                          : "text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10 border-2 border-transparent hover:border-white/20"
                      )}
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 shadow-lg"
                        layoutId="activeBackground"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <motion.div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-colors shadow-md",
                        isActive 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                          : "bg-white/20 dark:bg-white/10 text-gray-600 dark:text-gray-400 group-hover:bg-white/30"
                      )}
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          className="font-semibold text-lg"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.02 }}
                    />
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Enhanced Collapse Toggle */}
        <div className="p-4">
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/20 dark:border-gray-600/20 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}