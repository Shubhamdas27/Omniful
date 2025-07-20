import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, BookOpen, Calendar, MessageSquare, 
  TrendingUp, Clock, CheckCircle,
  GraduationCap, FileText, Star
} from 'lucide-react'
import { cn } from '../lib/utils'

interface ClassData {
  id: string
  name: string
  code: string
  students: number
  schedule: string
  progress: number
  averageGrade: number
}

interface StudentPerformance {
  id: string
  name: string
  grade: number
  attendance: number
  assignments: number
  status: 'excellent' | 'good' | 'needs-attention'
}

interface UpcomingTask {
  id: string
  title: string
  dueDate: string
  type: 'assignment' | 'exam' | 'meeting'
  priority: 'high' | 'medium' | 'low'
}

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState<string>('1')

  const classes: ClassData[] = [
    {
      id: '1',
      name: 'Advanced Web Development',
      code: 'CS-401',
      students: 45,
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      progress: 78,
      averageGrade: 87.5
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS-305',
      students: 38,
      schedule: 'Tue, Thu - 10:00 AM',
      progress: 65,
      averageGrade: 82.3
    },
    {
      id: '3',
      name: 'Software Engineering',
      code: 'CS-450',
      students: 32,
      schedule: 'Mon, Wed - 4:00 PM',
      progress: 85,
      averageGrade: 91.2
    }
  ]

  const students: StudentPerformance[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      grade: 92,
      attendance: 95,
      assignments: 100,
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Emma Davis',
      grade: 88,
      attendance: 90,
      assignments: 95,
      status: 'good'
    },
    {
      id: '3',
      name: 'Michael Chen',
      grade: 75,
      attendance: 78,
      assignments: 80,
      status: 'needs-attention'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      grade: 94,
      attendance: 100,
      assignments: 100,
      status: 'excellent'
    }
  ]

  const upcomingTasks: UpcomingTask[] = [
    {
      id: '1',
      title: 'Grade Midterm Exams',
      dueDate: '2024-03-20',
      type: 'assignment',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Faculty Meeting',
      dueDate: '2024-03-18',
      type: 'meeting',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Final Project Review',
      dueDate: '2024-03-25',
      type: 'exam',
      priority: 'high'
    }
  ]

  const getStatusColor = (status: StudentPerformance['status']) => {
    switch (status) {
      case 'excellent':
        return 'text-green-400 bg-green-400/10'
      case 'good':
        return 'text-blue-400 bg-blue-400/10'
      case 'needs-attention':
        return 'text-orange-400 bg-orange-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getPriorityColor = (priority: UpcomingTask['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10'
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'low':
        return 'text-green-400 bg-green-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const selectedClassData = classes.find(c => c.id === selectedClass)

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start gap-6"
      >
        <div>
          <h1 className="heading-lg gradient-text">Teacher Dashboard</h1>
          <p className="text-gray-300 mt-2">Welcome back, Dr. Sarah Mitchell</p>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-glow glass rounded-xl px-6 py-3 text-white">
            Schedule Class
          </button>
          <button className="btn-glow glass rounded-xl px-6 py-3 text-white">
            New Assignment
          </button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Students',
            value: '115',
            change: '+5%',
            icon: Users,
            color: 'from-blue-500 to-cyan-500'
          },
          {
            title: 'Active Courses',
            value: '3',
            change: '+1',
            icon: BookOpen,
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Avg. Class Grade',
            value: '87.0',
            change: '+2.3%',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500'
          },
          {
            title: 'Pending Reviews',
            value: '12',
            change: '-3',
            icon: Clock,
            color: 'from-orange-500 to-red-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="glass rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                stat.color
              )}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={cn(
                "text-sm font-medium px-2 py-1 rounded-full",
                stat.change.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
              )}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Classes & Students */}
        <div className="lg:col-span-2 space-y-6">
          {/* Class Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              My Classes
            </h3>
            
            <div className="grid gap-4 mb-6">
              {classes.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setSelectedClass(classItem.id)}
                  className={cn(
                    "glass-dark rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-102",
                    selectedClass === classItem.id ? "ring-2 ring-blue-500/50 bg-blue-500/10" : ""
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">{classItem.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <span>{classItem.code}</span>
                        <span>{classItem.students} students</span>
                        <span>{classItem.schedule}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">
                        {classItem.averageGrade.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-400">Avg Grade</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Progress</span>
                      <span className="text-blue-400">{classItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${classItem.progress}%` }}
                        transition={{ delay: 0.3 + 0.1 * index, duration: 1 }}
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Student Performance */}
          {selectedClassData && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-green-400" />
                Student Performance - {selectedClassData.name}
              </h3>
              
              <div className="space-y-4">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="glass-dark rounded-xl p-4 card-hover"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{student.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Grade: <span className="text-green-400">{student.grade}%</span></span>
                            <span>Attendance: <span className="text-blue-400">{student.attendance}%</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium capitalize",
                          getStatusColor(student.status)
                        )}>
                          {student.status.replace('-', ' ')}
                        </span>
                        <div className="text-right">
                          <div className="text-purple-400 font-semibold">{student.assignments}%</div>
                          <div className="text-xs text-gray-400">Assignments</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Create Assignment', icon: FileText, color: 'text-blue-400' },
                { label: 'Grade Submissions', icon: CheckCircle, color: 'text-green-400' },
                { label: 'Schedule Office Hours', icon: Calendar, color: 'text-purple-400' },
                { label: 'Send Announcements', icon: MessageSquare, color: 'text-orange-400' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full btn-glow glass-dark rounded-lg p-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <action.icon className={cn("w-5 h-5", action.color)} />
                  <span className="text-white">{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-dark rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">{task.title}</h4>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium uppercase",
                      getPriorityColor(task.priority)
                    )}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Recent Activity
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { text: "Alex Johnson submitted Project 2", time: "2 hours ago", type: "submission" },
                { text: "New student enrolled in CS-401", time: "5 hours ago", type: "enrollment" },
                { text: "Graded 15 assignments", time: "1 day ago", type: "grading" },
                { text: "Posted new announcement", time: "2 days ago", type: "announcement" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 glass-dark rounded-lg p-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    activity.type === 'submission' ? 'bg-green-400' :
                    activity.type === 'enrollment' ? 'bg-blue-400' :
                    activity.type === 'grading' ? 'bg-purple-400' : 'bg-orange-400'
                  )} />
                  <div className="flex-1">
                    <p className="text-gray-300">{activity.text}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
