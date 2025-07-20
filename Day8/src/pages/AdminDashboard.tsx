import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, BookOpen, GraduationCap, TrendingUp,
  Settings, Shield, BarChart3, Calendar,
  DollarSign, AlertTriangle, CheckCircle, Clock,
  UserPlus, FileText, Database, Bell
} from 'lucide-react'
import { cn } from '../lib/utils'

interface SystemStats {
  totalUsers: number
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  activeRegistrations: number
  pendingApprovals: number
}

interface RecentActivity {
  id: string
  type: 'registration' | 'course' | 'payment' | 'system'
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'warning'
}

interface FinancialData {
  totalRevenue: number
  monthlyRevenue: number
  pendingPayments: number
  scholarships: number
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'finance' | 'reports'>('overview')

  const systemStats: SystemStats = {
    totalUsers: 1247,
    totalStudents: 1089,
    totalTeachers: 47,
    totalCourses: 124,
    activeRegistrations: 23,
    pendingApprovals: 12
  }

  const financialData: FinancialData = {
    totalRevenue: 2847500,
    monthlyRevenue: 245000,
    pendingPayments: 45000,
    scholarships: 125000
  }

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'registration',
      description: 'New student registration - Emma Watson',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'course',
      description: 'Course updated - Advanced Mathematics',
      timestamp: '15 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      type: 'payment',
      description: 'Payment pending verification - $2,500',
      timestamp: '1 hour ago',
      status: 'pending'
    },
    {
      id: '4',
      type: 'system',
      description: 'Database backup completed',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '5',
      type: 'registration',
      description: 'Teacher approval required - Dr. Johnson',
      timestamp: '3 hours ago',
      status: 'warning'
    }
  ]

  const upcomingEvents = [
    { title: 'Board Meeting', date: '2024-03-20', time: '10:00 AM' },
    { title: 'System Maintenance', date: '2024-03-22', time: '12:00 AM' },
    { title: 'Faculty Review', date: '2024-03-25', time: '2:00 PM' },
    { title: 'Budget Planning', date: '2024-03-28', time: '9:00 AM' }
  ]

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'registration': return UserPlus
      case 'course': return BookOpen
      case 'payment': return DollarSign
      case 'system': return Database
      default: return Bell
    }
  }

  const getActivityColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'warning': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start gap-6"
      >
        <div>
          <h1 className="heading-lg gradient-text">Admin Dashboard</h1>
          <p className="text-gray-300 mt-2">System Overview & Management</p>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-glow glass rounded-xl px-6 py-3 text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
          <button className="btn-glow glass rounded-xl px-6 py-3 text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Settings
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Users',
            value: systemStats.totalUsers.toLocaleString(),
            change: '+12%',
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            detail: `${systemStats.totalStudents} Students, ${systemStats.totalTeachers} Teachers`
          },
          {
            title: 'Active Courses',
            value: systemStats.totalCourses.toString(),
            change: '+8',
            icon: BookOpen,
            color: 'from-purple-500 to-pink-500',
            detail: 'Across all departments'
          },
          {
            title: 'Monthly Revenue',
            value: `$${(financialData.monthlyRevenue / 1000).toFixed(0)}K`,
            change: '+15%',
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500',
            detail: `Total: $${(financialData.totalRevenue / 1000000).toFixed(1)}M`
          },
          {
            title: 'Pending Actions',
            value: (systemStats.pendingApprovals + systemStats.activeRegistrations).toString(),
            change: '-3',
            icon: AlertTriangle,
            color: 'from-orange-500 to-red-500',
            detail: `${systemStats.pendingApprovals} approvals needed`
          }
        ].map((metric, index) => (
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
                metric.color
              )}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className={cn(
                "text-sm font-medium px-2 py-1 rounded-full",
                metric.change.startsWith('+') ? 'text-green-400 bg-green-400/10' : 
                metric.change.startsWith('-') ? 'text-red-400 bg-red-400/10' : 'text-blue-400 bg-blue-400/10'
              )}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-gray-400 text-sm mb-2">{metric.title}</div>
            <div className="text-gray-500 text-xs">{metric.detail}</div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-2"
      >
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'users', label: 'User Management', icon: Users },
            { key: 'courses', label: 'Course Management', icon: BookOpen },
            { key: 'finance', label: 'Financial', icon: DollarSign },
            { key: 'reports', label: 'Reports', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={cn(
                "flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 whitespace-nowrap",
                activeTab === tab.key
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-400" />
                  System Health & Performance
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-dark rounded-xl p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="text-green-400 font-semibold text-lg">99.8%</div>
                    <div className="text-gray-400 text-sm">Server Uptime</div>
                  </div>
                  
                  <div className="glass-dark rounded-xl p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Database className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-blue-400 font-semibold text-lg">2.4TB</div>
                    <div className="text-gray-400 text-sm">Database Size</div>
                  </div>
                  
                  <div className="glass-dark rounded-xl p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="text-purple-400 font-semibold text-lg">156ms</div>
                    <div className="text-gray-400 text-sm">Avg Response</div>
                  </div>
                </div>
              </motion.div>

              {/* Department Overview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  Department Statistics
                </h3>
                
                <div className="grid gap-4">
                  {[
                    { name: 'Computer Science', students: 450, teachers: 12, courses: 45, revenue: 875000 },
                    { name: 'Mathematics', students: 320, teachers: 8, courses: 32, revenue: 645000 },
                    { name: 'Physics', students: 280, teachers: 7, courses: 28, revenue: 520000 },
                    { name: 'Engineering', students: 380, teachers: 15, courses: 38, revenue: 780000 }
                  ].map((dept, index) => (
                    <motion.div
                      key={dept.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass-dark rounded-xl p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-semibold">{dept.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <span>{dept.students} Students</span>
                            <span>{dept.teachers} Teachers</span>
                            <span>{dept.courses} Courses</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">
                            ${(dept.revenue / 1000).toFixed(0)}K
                          </div>
                          <div className="text-xs text-gray-400">Revenue</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" />
                User Management
              </h3>
              <div className="text-gray-300">
                <p>User management interface would be implemented here with:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>User creation and editing forms</li>
                  <li>Role assignment and permissions</li>
                  <li>Bulk user operations</li>
                  <li>User activity monitoring</li>
                  <li>Account approval workflow</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-400" />
                Financial Overview
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-dark rounded-xl p-4">
                  <h4 className="text-white font-medium mb-4">Revenue Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tuition Fees</span>
                      <span className="text-green-400">${(financialData.totalRevenue * 0.7 / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Additional Fees</span>
                      <span className="text-blue-400">${(financialData.totalRevenue * 0.2 / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Other Income</span>
                      <span className="text-purple-400">${(financialData.totalRevenue * 0.1 / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass-dark rounded-xl p-4">
                  <h4 className="text-white font-medium mb-4">Payment Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pending Payments</span>
                      <span className="text-yellow-400">${(financialData.pendingPayments / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Scholarships</span>
                      <span className="text-orange-400">${(financialData.scholarships / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Target</span>
                      <span className="text-green-400">${(financialData.monthlyRevenue / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type)
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="glass-dark rounded-lg p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        getActivityColor(activity.status)
                      )}>
                        <ActivityIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.description}</p>
                        <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Upcoming Events
            </h3>
            
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-dark rounded-lg p-3"
                >
                  <h4 className="text-white text-sm font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{event.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Sessions</span>
                <span className="text-green-400 font-semibold">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Storage Used</span>
                <span className="text-blue-400 font-semibold">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Backup Status</span>
                <span className="text-green-400 font-semibold">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">License Usage</span>
                <span className="text-yellow-400 font-semibold">892/1000</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
