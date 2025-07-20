import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Users, Calendar, Clock, MapPin, 
  FileText, Video, Download, Play, ChevronRight,
  Star, Award, CheckCircle, AlertCircle
} from 'lucide-react'
import { cn } from '../lib/utils'

interface Assignment {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
  grade?: number
  maxGrade: number
}

interface Lecture {
  id: string
  title: string
  date: string
  duration: string
  type: 'video' | 'live' | 'recorded'
  watched: boolean
}

interface CourseData {
  id: string
  title: string
  code: string
  instructor: string
  instructorImage: string
  credits: number
  semester: string
  description: string
  progress: number
  totalStudents: number
  schedule: string
  location: string
  grade: string
  attendanceRate: number
}

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'lectures' | 'grades'>('overview')

  const courseData: CourseData = {
    id: '1',
    title: 'Advanced Web Development',
    code: 'CS-401',
    instructor: 'Dr. Sarah Mitchell',
    instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    credits: 4,
    semester: 'Fall 2024',
    description: 'This course covers advanced concepts in web development including modern frameworks, API integration, database design, and deployment strategies.',
    progress: 78,
    totalStudents: 45,
    schedule: 'Mon, Wed, Fri - 2:00 PM to 3:30 PM',
    location: 'Room 301, Computer Science Building',
    grade: 'A-',
    attendanceRate: 92
  }

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'React Component Library',
      dueDate: '2024-03-15',
      status: 'graded',
      grade: 92,
      maxGrade: 100
    },
    {
      id: '2',
      title: 'API Integration Project',
      dueDate: '2024-03-22',
      status: 'submitted',
      maxGrade: 100
    },
    {
      id: '3',
      title: 'Database Design Assignment',
      dueDate: '2024-03-29',
      status: 'pending',
      maxGrade: 100
    },
    {
      id: '4',
      title: 'Final Project Proposal',
      dueDate: '2024-04-05',
      status: 'pending',
      maxGrade: 50
    }
  ]

  const lectures: Lecture[] = [
    {
      id: '1',
      title: 'Introduction to Modern Web Frameworks',
      date: '2024-02-15',
      duration: '90 min',
      type: 'recorded',
      watched: true
    },
    {
      id: '2',
      title: 'State Management in React',
      date: '2024-02-18',
      duration: '85 min',
      type: 'recorded',
      watched: true
    },
    {
      id: '3',
      title: 'API Design and Integration',
      date: '2024-02-22',
      duration: '90 min',
      type: 'recorded',
      watched: false
    },
    {
      id: '4',
      title: 'Database Optimization Techniques',
      date: '2024-02-25',
      duration: '95 min',
      type: 'live',
      watched: false
    }
  ]

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'graded':
        return 'text-green-400 bg-green-400/10'
      case 'submitted':
        return 'text-blue-400 bg-blue-400/10'
      case 'pending':
        return 'text-orange-400 bg-orange-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'graded':
        return CheckCircle
      case 'submitted':
        return Clock
      case 'pending':
        return AlertCircle
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl floating" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 blur-3xl floating-delayed" />
        </div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  {courseData.code}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                  {courseData.credits} Credits
                </span>
              </div>
              <h1 className="heading-lg gradient-text mb-4">
                {courseData.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {courseData.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">{courseData.semester}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-sm">{courseData.totalStudents} Students</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span className="text-sm">{courseData.schedule}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span className="text-sm">{courseData.location}</span>
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="glass-dark rounded-2xl p-6 min-w-[280px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                  <img 
                    src={courseData.instructorImage} 
                    alt="Instructor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{courseData.instructor}</h3>
                  <p className="text-gray-400 text-sm">Course Instructor</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{courseData.grade}</div>
                  <div className="text-xs text-gray-400">Current Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{courseData.attendanceRate}%</div>
                  <div className="text-xs text-gray-400">Attendance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Course Progress</span>
              <span className="text-blue-400 font-semibold">{courseData.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${courseData.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full shimmer" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-2"
      >
        <div className="flex gap-2">
          {[
            { key: 'overview', label: 'Overview', icon: BookOpen },
            { key: 'assignments', label: 'Assignments', icon: FileText },
            { key: 'lectures', label: 'Lectures', icon: Video },
            { key: 'grades', label: 'Grades', icon: Star }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300",
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'assignments' && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                Assignments
              </h3>
              <div className="space-y-4">
                {assignments.map((assignment, index) => {
                  const StatusIcon = getStatusIcon(assignment.status)
                  return (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass-dark rounded-xl p-6 card-hover cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", getStatusColor(assignment.status))}>
                            <StatusIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{assignment.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                              {assignment.grade && (
                                <span className="text-green-400">
                                  Grade: {assignment.grade}/{assignment.maxGrade}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn("px-3 py-1 rounded-full text-xs font-medium capitalize", getStatusColor(assignment.status))}>
                            {assignment.status}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'lectures' && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Video className="w-6 h-6 text-purple-400" />
                Lecture Videos
              </h3>
              <div className="space-y-4">
                {lectures.map((lecture, index) => (
                  <motion.div
                    key={lecture.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="glass-dark rounded-xl p-6 card-hover cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          lecture.watched ? "bg-green-400/20 text-green-400" : "bg-blue-400/20 text-blue-400"
                        )}>
                          <Play className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{lecture.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{new Date(lecture.date).toLocaleDateString()}</span>
                            <span>{lecture.duration}</span>
                            <span className="capitalize">{lecture.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {lecture.watched && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        <Download className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Course Overview</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {courseData.description} This comprehensive course will take you through modern web development practices, 
                    from frontend frameworks to backend integration and deployment strategies.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-dark rounded-xl p-4">
                      <h4 className="text-white font-medium mb-2">Learning Objectives</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Master modern JavaScript frameworks</li>
                        <li>• Build scalable web applications</li>
                        <li>• Implement secure authentication</li>
                        <li>• Deploy production-ready apps</li>
                      </ul>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <h4 className="text-white font-medium mb-2">Prerequisites</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Basic JavaScript knowledge</li>
                        <li>• HTML/CSS proficiency</li>
                        <li>• Database fundamentals</li>
                        <li>• Version control (Git)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Completion</span>
                      <span className="text-blue-400 font-semibold">{courseData.progress}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Current Grade</span>
                      <span className="text-green-400 font-semibold">{courseData.grade}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Attendance</span>
                      <span className="text-orange-400 font-semibold">{courseData.attendanceRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Upcoming</h3>
                  <div className="space-y-3">
                    <div className="glass-dark rounded-lg p-3">
                      <div className="text-white text-sm font-medium">Midterm Exam</div>
                      <div className="text-xs text-gray-400">March 30, 2024</div>
                    </div>
                    <div className="glass-dark rounded-lg p-3">
                      <div className="text-white text-sm font-medium">Project Presentation</div>
                      <div className="text-xs text-gray-400">April 15, 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                Grade Breakdown
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {assignments.filter(a => a.grade).map((assignment) => (
                    <div key={assignment.id} className="glass-dark rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">{assignment.title}</h4>
                          <p className="text-gray-400 text-sm">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-lg">
                            {assignment.grade}/{assignment.maxGrade}
                          </div>
                          <div className="text-sm text-gray-400">
                            {Math.round(((assignment.grade || 0) / assignment.maxGrade) * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="glass-dark rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Grade Distribution</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Assignments (40%)</span>
                        <span className="text-green-400">92%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="w-[92%] h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Midterm (30%)</span>
                        <span className="text-blue-400">85%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="w-[85%] h-2 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Final Project (30%)</span>
                        <span className="text-yellow-400">Pending</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="w-[0%] h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CourseDetails
