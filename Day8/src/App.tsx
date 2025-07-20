import { useEffect, useState } from 'react'
import { useAuthStore } from './store/useStore'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import StudentProfile from './pages/StudentProfile'
import CourseDetails from './pages/CourseDetails'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Layout from './components/Layout'
import { motion, AnimatePresence } from 'framer-motion'

// Simple routing system
export type PageRoute = 'dashboard' | 'profile' | 'courses' | 'course-details' | 'grades' | 'schedule'

function App() {
  const { isAuthenticated, user } = useAuthStore()
  const [currentPage, setCurrentPage] = useState<PageRoute>('dashboard')

  useEffect(() => {
    // Add any initialization logic here
    console.log('EduFlow - Premium College Management System Initialized')
  }, [])

  const renderCurrentPage = () => {
    if (!user) return <DashboardPage />

    // Role-specific routing
    if (user.role === 'admin') {
      return <AdminDashboard />
    }

    if (user.role === 'teacher') {
      return <TeacherDashboard />
    }

    // Student pages
    switch (currentPage) {
      case 'profile':
        return <StudentProfile />
      case 'course-details':
        return <CourseDetails />
      case 'dashboard':
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginPage />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
              {renderCurrentPage()}
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
