import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Target, BookOpen, BarChart3, Search, Award } from 'lucide-react';
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

interface Grade {
  id: number;
  subject: string;
  instructor: string;
  assignment: string;
  score: number;
  totalMarks: number;
  grade: string;
  date: string;
  category: string;
  semester: string;
}

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('current');

  const grades: Grade[] = [
    {
      id: 1,
      subject: 'Mathematics 101',
      instructor: 'Prof. Rajesh Kumar',
      assignment: 'Problem Set 1',
      score: 92,
      totalMarks: 100,
      grade: 'A+',
      date: '2025-07-15',
      category: 'Assignment',
      semester: 'current'
    },
    {
      id: 2,
      subject: 'Physics Lab',
      instructor: 'Dr. Priya Sharma',
      assignment: 'Lab Report - Pendulum',
      score: 23,
      totalMarks: 25,
      grade: 'A',
      date: '2025-07-18',
      category: 'Lab',
      semester: 'current'
    },
    {
      id: 3,
      subject: 'English Literature',
      instructor: 'Prof. Ananya Singh',
      assignment: 'Mid-term Exam',
      score: 78,
      totalMarks: 100,
      grade: 'B+',
      date: '2025-07-10',
      category: 'Exam',
      semester: 'current'
    },
    {
      id: 4,
      subject: 'Chemistry',
      instructor: 'Dr. Vikram Patel',
      assignment: 'Practical Test',
      score: 88,
      totalMarks: 100,
      grade: 'A-',
      date: '2025-07-12',
      category: 'Practical',
      semester: 'current'
    },
    {
      id: 5,
      subject: 'Computer Science',
      instructor: 'Prof. Suresh Gupta',
      assignment: 'Programming Project',
      score: 95,
      totalMarks: 100,
      grade: 'A+',
      date: '2025-07-20',
      category: 'Project',
      semester: 'current'
    },
    {
      id: 6,
      subject: 'Biology',
      instructor: 'Dr. Meera Joshi',
      assignment: 'Quiz 1',
      score: 16,
      totalMarks: 20,
      grade: 'B',
      date: '2025-07-08',
      category: 'Quiz',
      semester: 'current'
    },
    {
      id: 7,
      subject: 'History',
      instructor: 'Prof. Ramesh Yadav',
      assignment: 'Research Paper',
      score: 85,
      totalMarks: 100,
      grade: 'A-',
      date: '2025-07-14',
      category: 'Assignment',
      semester: 'current'
    },
    // Previous semester grades
    {
      id: 8,
      subject: 'Mathematics Basics',
      instructor: 'Prof. Rajesh Kumar',
      assignment: 'Final Exam',
      score: 89,
      totalMarks: 100,
      grade: 'A-',
      date: '2025-05-20',
      category: 'Exam',
      semester: 'previous'
    },
    {
      id: 9,
      subject: 'Physics Fundamentals',
      instructor: 'Dr. Priya Sharma',
      assignment: 'Final Exam',
      score: 91,
      totalMarks: 100,
      grade: 'A',
      date: '2025-05-22',
      category: 'Exam',
      semester: 'previous'
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'from-green-500 to-emerald-500 text-white';
      case 'A':
        return 'from-green-400 to-green-500 text-white';
      case 'A-':
        return 'from-yellow-400 to-yellow-500 text-white';
      case 'B+':
        return 'from-orange-400 to-orange-500 text-white';
      case 'B':
        return 'from-orange-500 to-red-400 text-white';
      case 'B-':
        return 'from-red-400 to-red-500 text-white';
      default:
        return 'from-gray-400 to-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Exam':
        return <Target className="w-4 h-4" />;
      case 'Assignment':
        return <BookOpen className="w-4 h-4" />;
      case 'Lab':
        return <BarChart3 className="w-4 h-4" />;
      case 'Project':
        return <Trophy className="w-4 h-4" />;
      case 'Quiz':
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getPercentage = (score: number, totalMarks: number) => {
    return Math.round((score / totalMarks) * 100);
  };

  const filteredGrades = grades.filter(grade => {
    const matchesSemester = selectedSemester === 'all' || grade.semester === selectedSemester;
    const matchesSearch = grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  // Calculate overall statistics
  const currentSemesterGrades = grades.filter(g => g.semester === 'current');
  const totalScore = currentSemesterGrades.reduce((sum, g) => sum + g.score, 0);
  const totalPossible = currentSemesterGrades.reduce((sum, g) => sum + g.totalMarks, 0);
  const overallPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
  
  const gradeDistribution = currentSemesterGrades.reduce((acc, g) => {
    acc[g.grade] = (acc[g.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative">
      {/* Grades-specific floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-20 w-6 h-6 text-green-400/30 dark:text-green-300/30 animate-bounce delay-200">
          <Trophy className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-24 w-5 h-5 text-blue-400/25 dark:text-blue-300/25 animate-pulse delay-400">
          <Target className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 text-purple-400/30 dark:text-purple-300/30 animate-spin-slow delay-300">
          <Award className="w-full h-full" />
        </div>
        
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-green-400/20 dark:bg-green-300/20 rounded-full animate-ping-5s delay-100" />
        <div className="absolute bottom-32 right-1/4 w-3 h-3 bg-blue-400/25 dark:bg-blue-300/25 rounded-full animate-bounce-4s delay-500" />
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
          className="glass-card rounded-3xl p-8 border border-white/40 dark:border-gray-600/40 shadow-2xl bg-gradient-to-r from-green-500/15 via-blue-500/15 to-purple-500/15 dark:from-green-500/20 dark:via-blue-500/20 dark:to-purple-500/20"
          variants={item}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-3">
                Grades & Performance 🏆
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                Track your academic progress and achievements
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search grades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overall Performance Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={item}
        >
          <div className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Overall Average</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{overallPercentage}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Assignments</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{currentSemesterGrades.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">A Grades</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {(gradeDistribution['A+'] || 0) + (gradeDistribution['A'] || 0) + (gradeDistribution['A-'] || 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                <Trophy className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Semester Filter */}
        <motion.div
          className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30"
          variants={item}
        >
          <div className="flex flex-wrap gap-2">
            {['current', 'previous', 'all'].map((semester) => (
              <button
                key={semester}
                onClick={() => setSelectedSemester(semester)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 capitalize ${
                  selectedSemester === semester
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30'
                }`}
              >
                {semester === 'current' ? 'Current Semester' :
                 semester === 'previous' ? 'Previous Semester' : 'All Semesters'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grades List */}
        <motion.div
          className="grid gap-4"
          variants={item}
        >
          {filteredGrades.length > 0 ? (
            filteredGrades.map((grade, index) => {
              const percentage = getPercentage(grade.score, grade.totalMarks);
              
              return (
                <motion.div
                  key={grade.id}
                  className="glass-card rounded-2xl p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {getCategoryIcon(grade.category)}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {grade.assignment}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {grade.subject} • {grade.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          {grade.score}/{grade.totalMarks}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {percentage}%
                        </p>
                      </div>

                      <div className="text-right text-sm">
                        <p className="text-gray-600 dark:text-gray-400">
                          {new Date(grade.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">
                          {grade.category}
                        </p>
                      </div>

                      <div className="w-20">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${
                              percentage >= 90 ? 'from-green-500 to-emerald-500 w-full' :
                              percentage >= 80 ? 'from-yellow-500 to-green-500 w-4/5' :
                              percentage >= 70 ? 'from-orange-500 to-yellow-500 w-3/4' :
                              percentage >= 60 ? 'from-red-500 to-orange-500 w-3/5' :
                              percentage >= 50 ? 'from-red-600 to-red-500 w-1/2' :
                              'from-red-700 to-red-600 w-2/5'
                            }`}
                          />
                        </div>
                      </div>
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
              <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Grades Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'No grades match the selected semester'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
