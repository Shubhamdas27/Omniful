import { motion } from 'framer-motion';
import { Activity, CheckCircle, FileText, MessageCircle, Award } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'assignment',
    title: 'Completed Physics Assignment #3',
    description: 'Submitted thermodynamics problem set',
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'text-emerald-500'
  },
  {
    id: 2,
    type: 'grade',
    title: 'Received grade for Math Quiz',
    description: 'Scored 92% on calculus quiz',
    time: '5 hours ago',
    icon: Award,
    color: 'text-yellow-500'
  },
  {
    id: 3,
    type: 'discussion',
    title: 'Posted in Chemistry Discussion',
    description: 'Asked question about molecular bonds',
    time: '1 day ago',
    icon: MessageCircle,
    color: 'text-blue-500'
  },
  {
    id: 4,
    type: 'submission',
    title: 'Uploaded Biology Lab Report',
    description: 'Cell division observation report',
    time: '2 days ago',
    icon: FileText,
    color: 'text-purple-500'
  }
];

export default function RecentActivity() {
  return (
    <motion.div
      className="glass-card rounded-3xl p-6 border border-white/40 dark:border-gray-600/40 shadow-2xl hover:shadow-3xl transition-all duration-500"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Activity className="w-6 h-6 mr-3 text-purple-500" />
        Recent Activity
      </motion.h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              className="flex items-start space-x-4 p-5 rounded-2xl bg-white/30 dark:bg-white/10 border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.01, x: 6 }}
            >
              <motion.div
                className={`flex-shrink-0 w-12 h-12 rounded-full bg-white/30 dark:bg-white/10 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Icon className={`w-6 h-6 ${activity.color} drop-shadow-sm`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.h4
                  className="font-bold text-gray-800 dark:text-white text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {activity.title}
                </motion.h4>
                
                <motion.p
                  className="text-gray-700 dark:text-gray-300 mt-2 font-medium leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {activity.description}
                </motion.p>
                
                <motion.div
                  className="bg-white/20 dark:bg-white/10 rounded-lg px-3 py-1 mt-3 inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {activity.time}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <motion.button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Activities
        </motion.button>
      </motion.div>
    </motion.div>
  );
}