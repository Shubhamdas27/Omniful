import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  Users, 
  Calendar, 
  Award,
  Clock,
  Target,
  BarChart3,
  Star
} from 'lucide-react'
import { cn } from '../lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: React.ComponentType<any>
  gradient: string
  delay?: number
}

interface ProgressCardProps {
  title: string
  progress: number
  total: number
  color: string
  delay?: number
}

export function StatsCard({ title, value, change, icon: Icon, gradient, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "glass rounded-2xl p-6 card-hover relative overflow-hidden",
        "bg-gradient-to-br", gradient
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <Icon className="w-20 h-20" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-white/20">
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {change && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300 }}
              className={cn(
                "flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium",
                change.type === 'increase' 
                  ? "bg-green-500/20 text-green-300" 
                  : "bg-red-500/20 text-red-300"
              )}
            >
              {change.type === 'increase' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change.value)}%</span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
        >
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          <p className="text-gray-200 text-sm">{title}</p>
        </motion.div>
      </div>

      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 60%)'
        }}
      />
    </motion.div>
  )
}

export function ProgressCard({ title, progress, total, color, delay = 0 }: ProgressCardProps) {
  const percentage = (progress / total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-6 card-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <span className="text-gray-300 text-sm">{progress}/{total}</span>
      </div>

      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
            className={cn("h-full rounded-full", color)}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
          className="flex justify-between text-sm"
        >
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-medium">{Math.round(percentage)}%</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function QuickActionCard({ title, description, icon: Icon, onClick, delay = 0 }: {
  title: string
  description: string
  icon: React.ComponentType<any>
  onClick: () => void
  delay?: number
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass rounded-2xl p-6 text-left w-full card-hover group"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 group-hover:from-purple-600 group-hover:to-blue-700 transition-colors duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

// Predefined cards for different roles
export const studentDashboardCards = [
  {
    title: "Courses Enrolled",
    value: 6,
    change: { value: 2, type: 'increase' as const },
    icon: BookOpen,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Assignments Due",
    value: 4,
    change: { value: 1, type: 'decrease' as const },
    icon: Clock,
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "Overall GPA",
    value: "3.8",
    change: { value: 5, type: 'increase' as const },
    icon: Award,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Attendance Rate",
    value: "94%",
    change: { value: 2, type: 'increase' as const },
    icon: Target,
    gradient: "from-pink-500 to-rose-600"
  }
]

export const teacherDashboardCards = [
  {
    title: "Total Students",
    value: 156,
    change: { value: 8, type: 'increase' as const },
    icon: Users,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Active Courses",
    value: 4,
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Pending Grades",
    value: 23,
    change: { value: 15, type: 'decrease' as const },
    icon: BarChart3,
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "This Week's Classes",
    value: 12,
    icon: Calendar,
    gradient: "from-pink-500 to-rose-600"
  }
]

export const adminDashboardCards = [
  {
    title: "Total Students",
    value: "2,847",
    change: { value: 12, type: 'increase' as const },
    icon: Users,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Total Teachers",
    value: 189,
    change: { value: 5, type: 'increase' as const },
    icon: Star,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Active Courses",
    value: 127,
    change: { value: 8, type: 'increase' as const },
    icon: BookOpen,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "System Usage",
    value: "87%",
    change: { value: 3, type: 'increase' as const },
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-600"
  }
]
