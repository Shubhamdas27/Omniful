import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Mathematics Exam',
    date: '2024-01-15',
    time: '09:00 AM',
    location: 'Room 201',
    type: 'exam',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Physics Lab',
    date: '2024-01-16',
    time: '02:00 PM',
    location: 'Lab 3',
    type: 'lab',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Chemistry Assignment Due',
    date: '2024-01-18',
    time: '11:59 PM',
    location: 'Online',
    type: 'assignment',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    title: 'Biology Presentation',
    date: '2024-01-20',
    time: '10:00 AM',
    location: 'Auditorium',
    type: 'presentation',
    color: 'from-purple-500 to-indigo-500'
  }
];

export default function UpcomingEvents() {
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
        <Calendar className="w-6 h-6 mr-3 text-purple-500" />
        Upcoming Events
      </motion.h3>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="relative p-5 rounded-2xl bg-white/30 dark:bg-white/10 border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 6 }}
          >
            {/* Enhanced Color Indicator */}
            <motion.div
              className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl bg-gradient-to-b ${event.color} shadow-md`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            />

            <div className="ml-4">
              <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {event.title}
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-white/10 rounded-lg p-2">
                  <Calendar className="w-4 h-4 mr-3 text-purple-500" />
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-white/10 rounded-lg p-2">
                  <Clock className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="font-medium">{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-white/10 rounded-lg p-2">
                  <MapPin className="w-4 h-4 mr-3 text-green-500" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>

              <motion.div
                className={`inline-block px-3 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${event.color} text-white mt-4 shadow-md uppercase tracking-wide`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {event.type}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}