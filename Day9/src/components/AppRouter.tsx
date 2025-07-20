import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardLayout from '../layouts/DashboardLayout';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import CoursesPage from '../pages/CoursesPage';
import SchedulePage from '../pages/SchedulePage';
import AssignmentsPage from '../pages/AssignmentsPage';
import GradesPage from '../pages/GradesPage';
import StudentEnrollmentForm from '../pages/StudentEnrollmentForm';
import LoadingScreen from './LoadingScreen';

export default function AppRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/*" element={<LoginPage />} />
        </Routes>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to={`/${user.role}`} replace />} />
          <Route path="student" element={<StudentDashboard />} />
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="enroll" element={<StudentEnrollmentForm />} />
        </Route>
      </Routes>
    </motion.div>
  );
}