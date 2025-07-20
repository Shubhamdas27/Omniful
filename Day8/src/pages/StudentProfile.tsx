import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, Phone, MapPin, Calendar, GraduationCap, 
  Award, BookOpen, Clock, Target, TrendingUp, Star,
  Camera, Edit3, X
} from 'lucide-react'
import { cn } from '../lib/utils'

interface StudentData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  enrollmentDate: string
  studentId: string
  course: string
  semester: number
  gpa: number
  credits: number
  profileImage?: string
}

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [studentData] = useState<StudentData>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@college.edu',
    phone: '+1 (555) 123-4567',
    address: '123 College Street, University City, UC 12345',
    dateOfBirth: '2002-08-15',
    enrollmentDate: '2020-09-01',
    studentId: 'STU2020001',
    course: 'Computer Science',
    semester: 6,
    gpa: 3.8,
    credits: 128,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  })

  const achievements = [
    { title: 'Dean\'s List', date: '2023', icon: Award, color: 'text-yellow-400' },
    { title: 'Best Project Award', date: '2023', icon: Star, color: 'text-purple-400' },
    { title: 'Academic Excellence', date: '2022', icon: TrendingUp, color: 'text-blue-400' },
    { title: 'Leadership Award', date: '2022', icon: Target, color: 'text-green-400' }
  ]

  const subjects = [
    { name: 'Data Structures', grade: 'A', credits: 4, progress: 95 },
    { name: 'Web Development', grade: 'A-', credits: 3, progress: 88 },
    { name: 'Database Systems', grade: 'B+', credits: 4, progress: 85 },
    { name: 'Software Engineering', grade: 'A', credits: 4, progress: 92 },
    { name: 'Machine Learning', grade: 'A-', credits: 3, progress: 89 }
  ]

  // const handleSave = () => {
  //   setIsEditing(false)
  //   // Here you would typically save to backend
  // }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="glass rounded-3xl p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-3xl floating" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 blur-3xl floating-delayed" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500/30 relative">
                {studentData.profileImage ? (
                  <img 
                    src={studentData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="heading-lg gradient-text">
                  {studentData.name}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-glow p-3 glass rounded-xl"
                >
                  {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <span>{studentData.course} • Semester {studentData.semester}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>{studentData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>{studentData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span>ID: {studentData.studentId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Academic Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{studentData.gpa}</div>
                  <div className="text-sm text-gray-400">Current GPA</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{studentData.credits}</div>
                  <div className="text-sm text-gray-400">Credits Earned</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{studentData.semester}</div>
                  <div className="text-sm text-gray-400">Current Semester</div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Subjects */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Current Subjects
            </h3>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-dark rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="text-white font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Grade: <span className="text-green-400">{subject.grade}</span></span>
                        <span>Credits: {subject.credits}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{subject.progress}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ delay: 0.2 * index, duration: 1 }}
                      className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Personal Information */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Personal Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Born: {new Date(studentData.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <span>Enrolled: {new Date(studentData.enrollmentDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <span className="text-xs leading-relaxed">{studentData.address}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3 p-3 glass-dark rounded-lg hover:bg-white/5 transition-colors"
                >
                  <achievement.icon className={cn("w-5 h-5", achievement.color)} />
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{achievement.title}</div>
                    <div className="text-xs text-gray-400">{achievement.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-glow glass-dark rounded-lg p-3 text-left text-white hover:bg-white/10 transition-colors">
                View Transcript
              </button>
              <button className="w-full btn-glow glass-dark rounded-lg p-3 text-left text-white hover:bg-white/10 transition-colors">
                Course Registration
              </button>
              <button className="w-full btn-glow glass-dark rounded-lg p-3 text-left text-white hover:bg-white/10 transition-colors">
                Academic Calendar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default StudentProfile
