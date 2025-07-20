// Common types and utilities

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export const formatGrade = (grade: number): string => {
  if (grade >= 97) return 'A+'
  if (grade >= 93) return 'A'
  if (grade >= 90) return 'A-'
  if (grade >= 87) return 'B+'
  if (grade >= 83) return 'B'
  if (grade >= 80) return 'B-'
  if (grade >= 77) return 'C+'
  if (grade >= 73) return 'C'
  if (grade >= 70) return 'C-'
  if (grade >= 67) return 'D+'
  if (grade >= 63) return 'D'
  if (grade >= 60) return 'D-'
  return 'F'
}

export const getGradeColor = (grade: number): string => {
  if (grade >= 90) return 'text-green-400'
  if (grade >= 80) return 'text-blue-400'
  if (grade >= 70) return 'text-yellow-400'
  if (grade >= 60) return 'text-orange-400'
  return 'text-red-400'
}

export const calculateGPA = (grades: number[]): number => {
  if (grades.length === 0) return 0
  const total = grades.reduce((sum, grade) => {
    if (grade >= 97) return sum + 4.0
    if (grade >= 93) return sum + 4.0
    if (grade >= 90) return sum + 3.7
    if (grade >= 87) return sum + 3.3
    if (grade >= 83) return sum + 3.0
    if (grade >= 80) return sum + 2.7
    if (grade >= 77) return sum + 2.3
    if (grade >= 73) return sum + 2.0
    if (grade >= 70) return sum + 1.7
    if (grade >= 67) return sum + 1.3
    if (grade >= 63) return sum + 1.0
    if (grade >= 60) return sum + 0.7
    return sum + 0.0
  }, 0)
  return Math.round((total / grades.length) * 100) / 100
}

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'admin'
  avatar?: string
}

export interface Course {
  id: string
  title: string
  code: string
  instructor: string
  credits: number
  semester: string
  description: string
}

export interface Assignment {
  id: string
  title: string
  courseId: string
  dueDate: string
  maxPoints: number
  description: string
  type: 'assignment' | 'quiz' | 'exam' | 'project'
}

export const getStatusBadgeClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'submitted':
    case 'passed':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'pending':
    case 'in-progress':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'overdue':
    case 'failed':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'draft':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}
