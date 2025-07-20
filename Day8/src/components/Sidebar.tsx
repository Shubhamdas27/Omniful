import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap
} from 'lucide-react'
import { useAuthStore, useAppStore } from '../store/useStore'
import { cn } from '../lib/utils'
import type { PageRoute } from '../App'

interface SidebarProps {
  currentPath: PageRoute
  onNavigate: (path: string) => void
}

const studentMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: BookOpen, label: 'Courses', path: 'course-details' },
  { icon: ClipboardList, label: 'Assignments', path: 'assignments' },
  { icon: Calendar, label: 'Schedule', path: 'schedule' },
  { icon: BarChart3, label: 'Grades', path: 'grades' },
  { icon: User, label: 'Profile', path: 'profile' },
]

const teacherMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: BookOpen, label: 'My Courses', path: 'courses' },
  { icon: Users, label: 'Students', path: 'students' },
  { icon: ClipboardList, label: 'Assignments', path: 'assignments' },
  { icon: Calendar, label: 'Schedule', path: 'schedule' },
  { icon: BarChart3, label: 'Analytics', path: 'analytics' },
  { icon: User, label: 'Profile', path: 'profile' },
]

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: Users, label: 'Users', path: 'users' },
  { icon: GraduationCap, label: 'Courses', path: 'courses' },
  { icon: Calendar, label: 'Academic Calendar', path: 'calendar' },
  { icon: BarChart3, label: 'Reports', path: 'reports' },
  { icon: Settings, label: 'Settings', path: 'settings' },
]

export default function Sidebar({ currentPath = 'dashboard', onNavigate }: SidebarProps) {
  const { user, logout } = useAuthStore()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student': return studentMenuItems
      case 'teacher': return teacherMenuItems
      case 'admin': return adminMenuItems
      default: return studentMenuItems
    }
  }

  const menuItems = getMenuItems()

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  }

  const menuItemVariants = {
    hover: {
      x: 4,
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <motion.div
      variants={sidebarVariants}
      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-slate-900/95 backdrop-blur-lg border-r border-white/10 flex flex-col relative z-20"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">EduFlow</h1>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </motion.div>
          )}
          
          <motion.button
            onClick={toggleSidebar}
            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full ring-2 ring-purple-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
          </motion.div>
          
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 min-w-0"
            >
              <p className="text-white font-medium truncate">{user?.name}</p>
              <p className="text-gray-400 text-sm truncate">{user?.email}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.path}
            variants={menuItemVariants}
            whileHover="hover"
            onClick={() => onNavigate?.(item.path)}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300",
              currentPath === item.path
                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
            
            {currentPath === item.path && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-4 w-2 h-2 bg-purple-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <motion.button
          variants={menuItemVariants}
          whileHover="hover"
          onClick={() => onNavigate?.('/settings')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium"
            >
              Settings
            </motion.span>
          )}
        </motion.button>

        <motion.button
          variants={menuItemVariants}
          whileHover="hover"
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium"
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
