import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Search } from 'lucide-react';
import { useState } from 'react';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [searchTerm, setSearchTerm] = useState('');

  const schedule = {
    monday: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'Mathematics 101',
        instructor: 'Prof. Rajesh Kumar',
        room: 'Room 201',
        type: 'Lecture',
        color: 'from-blue-500 to-blue-600'
      },
      {
        time: '11:00 AM - 12:30 PM',
        subject: 'Physics Lab',
        instructor: 'Dr. Priya Sharma',
        room: 'Lab 3',
        type: 'Lab',
        color: 'from-green-500 to-green-600'
      },
      {
        time: '02:00 PM - 03:30 PM',
        subject: 'English Literature',
        instructor: 'Prof. Ananya Singh',
        room: 'Room 105',
        type: 'Lecture',
        color: 'from-purple-500 to-purple-600'
      },
      {
        time: '04:00 PM - 05:30 PM',
        subject: 'Chemistry',
        instructor: 'Dr. Vikram Patel',
        room: 'Room 304',
        type: 'Lecture',
        color: 'from-orange-500 to-orange-600'
      }
    ],
    tuesday: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'Computer Science',
        instructor: 'Prof. Suresh Gupta',
        room: 'Lab 1',
        type: 'Lab',
        color: 'from-cyan-500 to-cyan-600'
      },
      {
        time: '11:00 AM - 12:30 PM',
        subject: 'Biology',
        instructor: 'Dr. Meera Joshi',
        room: 'Room 208',
        type: 'Lecture',
        color: 'from-emerald-500 to-emerald-600'
      },
      {
        time: '02:00 PM - 03:30 PM',
        subject: 'History',
        instructor: 'Prof. Ramesh Yadav',
        room: 'Room 112',
        type: 'Lecture',
        color: 'from-amber-500 to-amber-600'
      }
    ],
    wednesday: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'Mathematics 101',
        instructor: 'Prof. Rajesh Kumar',
        room: 'Room 201',
        type: 'Lecture',
        color: 'from-blue-500 to-blue-600'
      },
      {
        time: '11:00 AM - 12:30 PM',
        subject: 'Physics',
        instructor: 'Dr. Priya Sharma',
        room: 'Room 305',
        type: 'Lecture',
        color: 'from-indigo-500 to-indigo-600'
      },
      {
        time: '02:00 PM - 03:30 PM',
        subject: 'Chemistry Lab',
        instructor: 'Dr. Vikram Patel',
        room: 'Lab 2',
        type: 'Lab',
        color: 'from-red-500 to-red-600'
      }
    ],
    thursday: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'English Literature',
        instructor: 'Prof. Ananya Singh',
        room: 'Room 105',
        type: 'Lecture',
        color: 'from-purple-500 to-purple-600'
      },
      {
        time: '11:00 AM - 12:30 PM',
        subject: 'Computer Science Lab',
        instructor: 'Prof. Suresh Gupta',
        room: 'Lab 1',
        type: 'Lab',
        color: 'from-teal-500 to-teal-600'
      },
      {
        time: '02:00 PM - 03:30 PM',
        subject: 'Biology Lab',
        instructor: 'Dr. Meera Joshi',
        room: 'Lab 4',
        type: 'Lab',
        color: 'from-lime-500 to-lime-600'
      }
    ],
    friday: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'History',
        instructor: 'Prof. Ramesh Yadav',
        room: 'Room 112',
        type: 'Lecture',
        color: 'from-amber-500 to-amber-600'
      },
      {
        time: '11:00 AM - 12:30 PM',
        subject: 'Mathematics Tutorial',
        instructor: 'Prof. Rajesh Kumar',
        room: 'Room 201',
        type: 'Tutorial',
        color: 'from-blue-500 to-blue-600'
      },
      {
        time: '02:00 PM - 03:30 PM',
        subject: 'Project Work',
        instructor: 'Various',
        room: 'Multiple',
        type: 'Project',
        color: 'from-rose-500 to-rose-600'
      }
    ]
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday', 
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday'
  };

  const filteredSchedule = schedule[selectedDay as keyof typeof schedule]?.filter(
    item => item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Schedule-specific floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-24 w-6 h-6 text-blue-400/30 dark:text-blue-300/30 animate-spin-slow delay-200">
          <Calendar className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-20 w-5 h-5 text-green-400/25 dark:text-green-300/25 animate-pulse delay-400">
          <Clock className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 text-purple-400/30 dark:text-purple-300/30 animate-bounce delay-300">
          <MapPin className="w-full h-full" />
        </div>
        
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400/20 dark:bg-blue-300/20 rounded-full animate-ping-5s delay-100" />
        <div className="absolute bottom-32 right-1/4 w-3 h-3 bg-green-400/25 dark:bg-green-300/25 rounded-full animate-bounce-4s delay-500" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-purple-400/30 dark:bg-purple-300/30 rounded-full animate-pulse delay-600" />
      </div>

      <motion.div
        className="space-y-6 relative z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="glass-card rounded-3xl p-8 border border-white/40 dark:border-gray-600/40 shadow-2xl bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-indigo-500/15 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-indigo-500/20"
          variants={item}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent mb-3">
                Class Schedule 📅
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                Your weekly class timetable and room assignments
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Day Selector */}
        <motion.div
          className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30"
          variants={item}
        >
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30'
                }`}
              >
                {dayNames[day as keyof typeof dayNames]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Schedule Grid */}
        <motion.div
          className="grid gap-6"
          variants={item}
        >
          {filteredSchedule && filteredSchedule.length > 0 ? (
            filteredSchedule.map((class_, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-16 bg-gradient-to-b ${class_.color} rounded-full`} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {class_.subject}
                      </h3>
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{class_.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{class_.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{class_.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${class_.color} text-white`}>
                      {class_.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="glass-card rounded-2xl p-12 border border-white/30 dark:border-gray-600/30 text-center"
              variants={item}
            >
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Classes Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'No classes scheduled for this day'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
