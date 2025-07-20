import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Chart from '../components/Chart';
import RecentActivity from '../components/RecentActivity';

export default function TeacherDashboard() {
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

  const teacherStats = [
    { 
      title: 'Students', 
      value: '156', 
      change: '+12',
      icon: Users,
      color: 'text-[#51e2f5]' // bright-blue
    },
    { 
      title: 'Courses', 
      value: '4', 
      change: '+1',
      icon: BookOpen,
      color: 'text-[#9df9ef]' // blue-green
    },
    { 
      title: 'Classes Today', 
      value: '6', 
      change: '0',
      icon: Calendar,
      color: 'text-[#edf756]' // dusty-white/yellow
    },
    { 
      title: 'Pending Reviews', 
      value: '23', 
      change: '-5',
      icon: Clock,
      color: 'text-[#ffa8b6]' // pink-sand
    },
  ];

  const chartData = [
    { name: 'CS 101', attendance: 92 },
    { name: 'CS 201', attendance: 88 },
    { name: 'CS 301', attendance: 95 },
    { name: 'CS 401', attendance: 89 },
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Computer Science 101', room: 'Room 201' },
    { time: '11:00 AM', subject: 'Data Structures', room: 'Room 305' },
    { time: '02:00 PM', subject: 'Algorithms', room: 'Lab 102' },
    { time: '04:00 PM', subject: 'Database Systems', room: 'Room 401' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-16 w-4 h-4 text-[#51e2f5]/20 animate-bounce delay-100">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute bottom-24 left-12 w-3 h-3 text-[#9df9ef]/25 animate-pulse delay-300">
          <Users className="w-full h-full" />
        </div>
        <div className="absolute top-1/4 right-1/5 w-3 h-3 text-[#ffa8b6]/30 animate-spin-slow delay-500">
          <CheckCircle className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 text-[#edf756]/20 animate-float delay-700">
          <Calendar className="w-full h-full" />
        </div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 text-[#51e2f5]/25 animate-ping delay-1000">
          <AlertTriangle className="w-full h-full" />
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
            Teacher Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Manage your classes and track student progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={item} 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {teacherStats.map((stat) => (
            <div key={stat.title} className="group">
              <div className="glass-card rounded-lg p-3 lg:p-4 hover:scale-105 transition-all duration-300 border border-white/20 hover:border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                  {stat.change !== '0' && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      stat.change.startsWith('+') 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                  )}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Attendance Chart */}
          <motion.div variants={item} className="lg:col-span-2">
            <div className="glass-card rounded-lg p-4 lg:p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Class Attendance
              </h3>
              <div className="h-64 lg:h-80">
                <Chart title="Course Attendance" data={chartData} type="bar" />
              </div>
            </div>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div variants={item} className="space-y-4">
            <div className="glass-card rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Today's Schedule
              </h3>
              <div className="space-y-2">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-white/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#51e2f5]">
                        {classItem.time}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {classItem.room}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {classItem.subject}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-[#51e2f5]/10 to-[#9df9ef]/10 hover:from-[#51e2f5]/20 hover:to-[#9df9ef]/20 border border-[#51e2f5]/20 hover:border-[#51e2f5]/40 transition-all text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">Mark Attendance</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Next class in 45 mins</p>
                </button>
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-[#edf756]/10 to-[#ffa8b6]/10 hover:from-[#edf756]/20 hover:to-[#ffa8b6]/20 border border-[#edf756]/20 hover:border-[#edf756]/40 transition-all text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">Grade Assignments</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">23 pending reviews</p>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <RecentActivity />
        </motion.div>
      </motion.div>
    </div>
  );
}