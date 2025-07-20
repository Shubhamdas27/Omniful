import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, User, Search, BookOpen } from 'lucide-react';
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

export default function AssignmentsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assignments = [
    {
      id: 1,
      title: 'Mathematics Problem Set 3',
      subject: 'Mathematics 101',
      instructor: 'Prof. Rajesh Kumar',
      dueDate: '2025-07-25',
      status: 'pending',
      priority: 'high',
      description: 'Solve differential equations and integration problems from chapter 8-10',
      submissionType: 'PDF Upload',
      maxMarks: 50
    },
    {
      id: 2,
      title: 'Physics Lab Report - Pendulum Experiment',
      subject: 'Physics Lab',
      instructor: 'Dr. Priya Sharma',
      dueDate: '2025-07-28',
      status: 'completed',
      priority: 'medium',
      description: 'Detailed analysis of simple pendulum motion with error calculations',
      submissionType: 'Document + Data',
      maxMarks: 25,
      submittedDate: '2025-07-20',
      grade: 23
    },
    {
      id: 3,
      title: 'English Literature Essay - Shakespeare Analysis',
      subject: 'English Literature',
      instructor: 'Prof. Ananya Singh',
      dueDate: '2025-07-30',
      status: 'pending',
      priority: 'medium',
      description: 'Write a 2000-word analysis on the themes in Hamlet',
      submissionType: 'Essay',
      maxMarks: 40
    },
    {
      id: 4,
      title: 'Chemistry Practical Assessment',
      subject: 'Chemistry',
      instructor: 'Dr. Vikram Patel',
      dueDate: '2025-08-02',
      status: 'submitted',
      priority: 'high',
      description: 'Organic compound identification and synthesis report',
      submissionType: 'Lab Report',
      maxMarks: 35,
      submittedDate: '2025-07-21'
    },
    {
      id: 5,
      title: 'Computer Programming Project',
      subject: 'Computer Science',
      instructor: 'Prof. Suresh Gupta',
      dueDate: '2025-08-05',
      status: 'pending',
      priority: 'high',
      description: 'Build a web application using React and Node.js',
      submissionType: 'Code + Documentation',
      maxMarks: 60
    },
    {
      id: 6,
      title: 'Biology Research Paper',
      subject: 'Biology',
      instructor: 'Dr. Meera Joshi',
      dueDate: '2025-07-26',
      status: 'overdue',
      priority: 'high',
      description: 'Research paper on genetic mutations and their effects',
      submissionType: 'Research Paper',
      maxMarks: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'submitted':
        return 'from-blue-500 to-cyan-500';
      case 'overdue':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-yellow-500 to-amber-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'submitted':
        return <Clock className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400';
      default:
        return 'text-green-500 dark:text-green-400';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative">
      {/* Assignment-specific floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-6 h-6 text-orange-400/30 dark:text-orange-300/30 animate-bounce delay-200">
          <FileText className="w-full h-full" />
        </div>
        <div className="absolute bottom-24 left-16 w-5 h-5 text-blue-400/25 dark:text-blue-300/25 animate-pulse delay-400">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 text-green-400/30 dark:text-green-300/30 animate-spin-slow delay-300">
          <CheckCircle className="w-full h-full" />
        </div>
        
        <div className="absolute top-24 left-1/3 w-2 h-2 bg-orange-400/20 dark:bg-orange-300/20 rounded-full animate-ping-5s delay-150" />
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-blue-400/25 dark:bg-blue-300/25 rounded-full animate-bounce-4s delay-500" />
        <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-green-400/30 dark:bg-green-300/30 rounded-full animate-pulse delay-600" />
      </div>

      <motion.div
        className="space-y-6 relative z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="glass-card rounded-3xl p-8 border border-white/40 dark:border-gray-600/40 shadow-2xl bg-gradient-to-r from-orange-500/15 via-red-500/15 to-pink-500/15 dark:from-orange-500/20 dark:via-red-500/20 dark:to-pink-500/20"
          variants={item}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-300 dark:via-red-300 dark:to-pink-300 bg-clip-text text-transparent mb-3">
                Assignments 📝
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                Track and manage your academic assignments
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30"
          variants={item}
        >
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'submitted', 'completed', 'overdue'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 capitalize ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Assignments Grid */}
        <motion.div
          className="grid gap-6"
          variants={item}
        >
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment, index) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);
              
              return (
                <motion.div
                  key={assignment.id}
                  className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getStatusColor(assignment.status)} text-white`}>
                        {getStatusIcon(assignment.status)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                          {assignment.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {assignment.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(assignment.priority)} bg-current bg-opacity-10`}>
                        {assignment.priority.toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Max: {assignment.maxMarks} marks
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {assignment.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                        <User className="w-4 h-4" />
                        <span>{assignment.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                        <FileText className="w-4 h-4" />
                        <span>{assignment.submissionType}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {assignment.status === 'completed' && assignment.grade && (
                        <div className="text-green-600 dark:text-green-400 font-semibold">
                          Grade: {assignment.grade}/{assignment.maxMarks}
                        </div>
                      )}
                      
                      {assignment.status === 'submitted' && assignment.submittedDate && (
                        <div className="text-blue-600 dark:text-blue-400 text-sm">
                          Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                        </div>
                      )}
                      
                      {assignment.status === 'pending' && (
                        <div className={`font-semibold ${
                          daysUntilDue < 0 ? 'text-red-500 dark:text-red-400' :
                          daysUntilDue <= 2 ? 'text-orange-500 dark:text-orange-400' :
                          'text-green-500 dark:text-green-400'
                        }`}>
                          {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                           daysUntilDue === 0 ? 'Due today!' :
                           `${daysUntilDue} days left`}
                        </div>
                      )}
                      
                      {assignment.status === 'overdue' && (
                        <div className="text-red-500 dark:text-red-400 font-semibold">
                          {Math.abs(daysUntilDue)} days overdue
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="glass-card rounded-2xl p-12 border border-white/30 dark:border-gray-600/30 text-center"
              variants={item}
            >
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Assignments Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'No assignments match the selected filter'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
