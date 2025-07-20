import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, DollarSign, Calendar, Settings, UserCheck, AlertCircle } from 'lucide-react';
import Chart from '../components/Chart';

// Placeholder Can component for role-based access
const Can = ({ children }: { children: React.ReactNode, ability: string }) => {
  // For demo purposes, always render children
  return <>{children}</>;
};

export default function AdminDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const adminStats = [
    { 
      title: 'Total Students', 
      value: '2,847', 
      change: '+127',
      icon: Users,
      color: 'text-[#51e2f5]' // bright-blue
    },
    { 
      title: 'Faculty', 
      value: '234', 
      change: '+12',
      icon: UserCheck,
      color: 'text-[#9df9ef]' // blue-green
    },
    { 
      title: 'Courses', 
      value: '89', 
      change: '+7',
      icon: BookOpen,
      color: 'text-[#edf756]' // dusty-white/yellow
    },
    { 
      title: 'Revenue', 
      value: '₹45.2L', 
      change: '+8.3%',
      icon: DollarSign,
      color: 'text-[#ffa8b6]' // pink-sand
    },
  ];

  const enrollmentData = [
    { name: 'Jan', students: 2400 },
    { name: 'Feb', students: 2500 },
    { name: 'Mar', students: 2650 },
    { name: 'Apr', students: 2720 },
    { name: 'May', students: 2780 },
    { name: 'Jun', students: 2847 },
  ];

  const departmentData = [
    { name: 'Computer Science', students: 1200 },
    { name: 'Engineering', students: 850 },
    { name: 'Business', students: 450 },
    { name: 'Arts', students: 347 },
  ];

  const managementTasks = [
    { task: 'Faculty Meeting', time: '10:00 AM', priority: 'high' },
    { task: 'Budget Review', time: '02:00 PM', priority: 'medium' },
    { task: 'Student Counseling', time: '04:00 PM', priority: 'low' },
    { task: 'Infrastructure Planning', time: '05:30 PM', priority: 'high' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-16 w-4 h-4 text-[#51e2f5]/20 animate-bounce delay-100">
          <Settings className="w-full h-full" />
        </div>
        <div className="absolute bottom-24 left-12 w-3 h-3 text-[#9df9ef]/25 animate-pulse delay-300">
          <Users className="w-full h-full" />
        </div>
        <div className="absolute top-1/4 right-1/5 w-3 h-3 text-[#ffa8b6]/30 animate-spin-slow delay-500">
          <TrendingUp className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 text-[#edf756]/20 animate-float delay-700">
          <Calendar className="w-full h-full" />
        </div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 text-[#51e2f5]/25 animate-ping delay-1000">
          <AlertCircle className="w-full h-full" />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 p-4 lg:p-6 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Comprehensive college management and analytics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={item} 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {adminStats.map((stat) => (
            <Can key={stat.title} ability="view:stats">
              <div className="group">
                <div className="glass-card rounded-lg p-3 lg:p-4 hover:scale-105 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      stat.change.startsWith('+') 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                </div>
              </div>
            </Can>
          ))}
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Enrollment Trends */}
          <motion.div variants={item}>
            <Can ability="view:enrollment">
              <div className="glass-card rounded-lg p-4 lg:p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Enrollment Trends
                </h3>
                <div className="h-64 lg:h-80">
                  <Chart title="Monthly Enrollment" data={enrollmentData} type="line" />
                </div>
              </div>
            </Can>
          </motion.div>

          {/* Department Distribution */}
          <motion.div variants={item}>
            <Can ability="view:departments">
              <div className="glass-card rounded-lg p-4 lg:p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Department Distribution
                </h3>
                <div className="h-64 lg:h-80">
                  <Chart title="Students by Department" data={departmentData} type="bar" />
                </div>
              </div>
            </Can>
          </motion.div>
        </div>

        {/* Management Tasks and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Today's Tasks */}
          <motion.div variants={item}>
            <Can ability="view:tasks">
              <div className="glass-card rounded-lg p-4 lg:p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Today's Priority Tasks
                </h3>
                <div className="space-y-3">
                  {managementTasks.map((task, index) => (
                    <div key={index} className={`p-3 rounded-lg border transition-all ${
                      task.priority === 'high' 
                        ? 'bg-gradient-to-r from-[#f43a09]/10 to-[#ffa8b6]/10 border-[#f43a09]/20 hover:border-[#f43a09]/40'
                        : task.priority === 'medium'
                        ? 'bg-gradient-to-r from-[#edf756]/10 to-[#9df9ef]/10 border-[#edf756]/20 hover:border-[#edf756]/40'
                        : 'bg-gradient-to-r from-[#51e2f5]/10 to-[#9df9ef]/10 border-[#51e2f5]/20 hover:border-[#51e2f5]/40'
                    }`}>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.task}
                        </h4>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {task.time}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Can>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item}>
            <Can ability="admin:actions">
              <div className="glass-card rounded-lg p-4 lg:p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 text-left rounded-lg bg-gradient-to-r from-[#51e2f5]/10 to-[#9df9ef]/10 hover:from-[#51e2f5]/20 hover:to-[#9df9ef]/20 border border-[#51e2f5]/20 hover:border-[#51e2f5]/40 transition-all">
                    <Users className="w-6 h-6 text-[#51e2f5] mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white block">
                      Manage Users
                    </span>
                  </button>
                  <button className="p-4 text-left rounded-lg bg-gradient-to-r from-[#9df9ef]/10 to-[#edf756]/10 hover:from-[#9df9ef]/20 hover:to-[#edf756]/20 border border-[#9df9ef]/20 hover:border-[#9df9ef]/40 transition-all">
                    <BookOpen className="w-6 h-6 text-[#9df9ef] mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white block">
                      Course Setup
                    </span>
                  </button>
                  <button className="p-4 text-left rounded-lg bg-gradient-to-r from-[#edf756]/10 to-[#ffa8b6]/10 hover:from-[#edf756]/20 hover:to-[#ffa8b6]/20 border border-[#edf756]/20 hover:border-[#edf756]/40 transition-all">
                    <Settings className="w-6 h-6 text-[#edf756] mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white block">
                      System Settings
                    </span>
                  </button>
                  <button className="p-4 text-left rounded-lg bg-gradient-to-r from-[#ffa8b6]/10 to-[#51e2f5]/10 hover:from-[#ffa8b6]/20 hover:to-[#51e2f5]/20 border border-[#ffa8b6]/20 hover:border-[#ffa8b6]/40 transition-all">
                    <TrendingUp className="w-6 h-6 text-[#ffa8b6] mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white block">
                      Reports
                    </span>
                  </button>
                </div>
              </div>
            </Can>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
