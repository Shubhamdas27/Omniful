import { motion } from 'framer-motion'
import { useAuthStore } from '../store/useStore'
import { 
  StatsCard, 
  ProgressCard, 
  QuickActionCard, 
  studentDashboardCards, 
  teacherDashboardCards, 
  adminDashboardCards 
} from '../components/DashboardCards'
import { 
  Plus, 
  Upload, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Search,
  Sun,
  Moon
} from 'lucide-react'
import { useAppStore } from '../store/useStore'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { theme, toggleTheme } = useAppStore()

  const getDashboardCards = () => {
    switch (user?.role) {
      case 'student': return studentDashboardCards
      case 'teacher': return teacherDashboardCards
      case 'admin': return adminDashboardCards
      default: return studentDashboardCards
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getQuickActions = () => {
    switch (user?.role) {
      case 'student':
        return [
          { title: 'Submit Assignment', description: 'Upload your completed work', icon: Upload },
          { title: 'View Schedule', description: 'Check today\'s classes', icon: Calendar },
          { title: 'Join Discussion', description: 'Participate in course forums', icon: MessageSquare },
        ]
      case 'teacher':
        return [
          { title: 'Create Assignment', description: 'Add new assignment for students', icon: Plus },
          { title: 'Take Attendance', description: 'Mark student attendance', icon: Calendar },
          { title: 'Grade Submissions', description: 'Review and grade student work', icon: Upload },
        ]
      case 'admin':
        return [
          { title: 'Add User', description: 'Register new student or teacher', icon: Plus },
          { title: 'System Reports', description: 'View detailed analytics', icon: Upload },
          { title: 'Manage Courses', description: 'Create or modify courses', icon: Calendar },
        ]
      default:
        return []
    }
  }

  const cards = getDashboardCards()
  const quickActions = getQuickActions()

  return (
    <div className="min-h-screen bg-transparent p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <motion.h1 
            className="heading-lg text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {getGreeting()}, {user?.name}! 👋
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to your {user?.role} dashboard
          </motion.p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="glass pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="glass p-3 rounded-xl hover:bg-white/10 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-400" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="glass p-3 rounded-xl hover:bg-white/10 transition-colors duration-200 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Bell className="w-5 h-5 text-gray-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {cards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <StatsCard {...card} delay={index * 0.1} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <h2 className="heading-md text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                {...action}
                onClick={() => console.log(`Clicked: ${action.title}`)}
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="heading-md text-white mb-6">Progress Overview</h2>
          <div className="space-y-4">
            {user?.role === 'student' && (
              <>
                <ProgressCard
                  title="Course Completion"
                  progress={18}
                  total={24}
                  color="bg-gradient-to-r from-blue-500 to-purple-600"
                  delay={1.0}
                />
                <ProgressCard
                  title="Assignment Submissions"
                  progress={12}
                  total={15}
                  color="bg-gradient-to-r from-emerald-500 to-teal-600"
                  delay={1.1}
                />
                <ProgressCard
                  title="Study Goals"
                  progress={7}
                  total={10}
                  color="bg-gradient-to-r from-pink-500 to-rose-600"
                  delay={1.2}
                />
              </>
            )}
            
            {user?.role === 'teacher' && (
              <>
                <ProgressCard
                  title="Grading Progress"
                  progress={45}
                  total={68}
                  color="bg-gradient-to-r from-blue-500 to-purple-600"
                  delay={1.0}
                />
                <ProgressCard
                  title="Lesson Plans"
                  progress={8}
                  total={12}
                  color="bg-gradient-to-r from-emerald-500 to-teal-600"
                  delay={1.1}
                />
                <ProgressCard
                  title="Student Feedback"
                  progress={23}
                  total={30}
                  color="bg-gradient-to-r from-pink-500 to-rose-600"
                  delay={1.2}
                />
              </>
            )}

            {user?.role === 'admin' && (
              <>
                <ProgressCard
                  title="System Health"
                  progress={9}
                  total={10}
                  color="bg-gradient-to-r from-green-500 to-emerald-600"
                  delay={1.0}
                />
                <ProgressCard
                  title="User Registrations"
                  progress={2847}
                  total={3000}
                  color="bg-gradient-to-r from-blue-500 to-purple-600"
                  delay={1.1}
                />
                <ProgressCard
                  title="Course Approvals"
                  progress={115}
                  total={127}
                  color="bg-gradient-to-r from-pink-500 to-rose-600"
                  delay={1.2}
                />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="mt-8"
      >
        <h2 className="heading-md text-white mb-6">Recent Activity</h2>
        <div className="glass rounded-2xl p-6">
          <div className="space-y-4">
            {[
              { activity: "Completed assignment submission", time: "2 hours ago", type: "success" },
              { activity: "Joined Computer Science 101 discussion", time: "4 hours ago", type: "info" },
              { activity: "Graded by Prof. Johnson", time: "1 day ago", type: "grade" },
              { activity: "New course material available", time: "2 days ago", type: "info" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'success' ? 'bg-green-500' :
                    item.type === 'grade' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <span className="text-white">{item.activity}</span>
                </div>
                <span className="text-gray-400 text-sm">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
