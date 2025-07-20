import { motion } from 'framer-motion';
import { BookOpen, Award, TrendingUp, Calendar, Clock, Users, Star } from 'lucide-react';
import Chart from '../components/Chart';
import RecentActivity from '../components/RecentActivity';
import UpcomingEvents from '../components/UpcomingEvents';

export default function StudentDashboard() {
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

  const studentStats = [
    { 
      title: 'Current GPA', 
      value: '3.8', 
      change: '+0.2',
      icon: Star,
      color: 'text-[#51e2f5]' // bright-blue
    },
    { 
      title: 'Courses', 
      value: '6', 
      change: '+1',
      icon: BookOpen,
      color: 'text-[#9df9ef]' // blue-green
    },
    { 
      title: 'Assignments Due', 
      value: '12', 
      change: '-3',
      icon: Calendar,
      color: 'text-[#edf756]' // dusty-white/yellow
    },
    { 
      title: 'Study Hours', 
      value: '28h', 
      change: '+5h',
      icon: Clock,
      color: 'text-[#ffa8b6]' // pink-sand
    },
  ];

  const chartData = [
    { name: 'Math', grade: 92 },
    { name: 'Physics', grade: 88 },
    { name: 'Chemistry', grade: 94 },
    { name: 'English', grade: 89 },
    { name: 'Biology', grade: 91 },
    { name: 'History', grade: 83 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Floating Elements with Minimal Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-16 w-4 h-4 text-[#51e2f5]/20 animate-bounce delay-100">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute bottom-24 left-12 w-3 h-3 text-[#9df9ef]/25 animate-pulse delay-300">
          <Award className="w-full h-full" />
        </div>
        <div className="absolute top-1/4 right-1/5 w-3 h-3 text-[#ffa8b6]/30 animate-spin-slow delay-500">
          <TrendingUp className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 text-[#edf756]/20 animate-float delay-700">
          <Users className="w-full h-full" />
        </div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 text-[#51e2f5]/25 animate-ping delay-1000">
          <Calendar className="w-full h-full" />
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
            Student Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Track your academic progress and stay organized
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={item} 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {studentStats.map((stat) => (
            <div key={stat.title} className="group">
              <div className="glass-card rounded-lg p-3 lg:p-4 hover:scale-105 transition-all duration-300 border border-white/20 hover:border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    stat.change.startsWith('+') 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
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
          ))}
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Performance Chart */}
          <motion.div variants={item} className="lg:col-span-2">
            <div className="glass-card rounded-lg p-4 lg:p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Subject Performance
              </h3>
              <div className="h-64 lg:h-80">
                <Chart title="Subject Grades" data={chartData} type="line" />
              </div>
            </div>
          </motion.div>

          {/* Quick Actions & Upcoming */}
          <motion.div variants={item} className="space-y-4">
            <div className="glass-card rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-[#51e2f5]/10 to-[#9df9ef]/10 hover:from-[#51e2f5]/20 hover:to-[#9df9ef]/20 border border-[#51e2f5]/20 hover:border-[#51e2f5]/40 transition-all text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">Submit Assignment</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2 pending submissions</p>
                </button>
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-[#edf756]/10 to-[#ffa8b6]/10 hover:from-[#edf756]/20 hover:to-[#ffa8b6]/20 border border-[#edf756]/20 hover:border-[#edf756]/40 transition-all text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">Check Schedule</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Next class in 2 hours</p>
                </button>
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-[#ffa8b6]/10 to-[#51e2f5]/10 hover:from-[#ffa8b6]/20 hover:to-[#51e2f5]/20 border border-[#ffa8b6]/20 hover:border-[#ffa8b6]/40 transition-all text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">View Grades</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Updated results available</p>
                </button>
              </div>
            </div>

            <UpcomingEvents />
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