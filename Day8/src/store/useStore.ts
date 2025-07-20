import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'admin'
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: User['role']) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

interface AppState {
  theme: 'dark' | 'light'
  sidebarCollapsed: boolean
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email: string, _password: string, role: User['role']) => {
    set({ isLoading: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    }
    
    set({ 
      user: mockUser, 
      isAuthenticated: true, 
      isLoading: false 
    })
  },
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      isLoading: false 
    })
  },
  setUser: (user: User) => {
    set({ user, isAuthenticated: true })
  }
}))

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  sidebarCollapsed: false,
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  setSidebarCollapsed: (collapsed: boolean) => set({ 
    sidebarCollapsed: collapsed 
  })
}))

// Mock data for the application
export interface Course {
  id: string
  name: string
  code: string
  instructor: string
  students: number
  progress: number
  color: string
}

export interface Assignment {
  id: string
  title: string
  course: string
  dueDate: Date
  status: 'pending' | 'submitted' | 'graded'
  grade?: number
}

export interface Student {
  id: string
  name: string
  email: string
  course: string
  attendance: number
  grade: number
  avatar: string
}

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Sarah Johnson',
    students: 45,
    progress: 75,
    color: 'from-purple-500 to-blue-600'
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    code: 'MATH201',
    instructor: 'Prof. Michael Chen',
    students: 32,
    progress: 60,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: '3',
    name: 'Digital Design',
    code: 'ART150',
    instructor: 'Ms. Emma Wilson',
    students: 28,
    progress: 85,
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: '4',
    name: 'Database Systems',
    code: 'CS301',
    instructor: 'Dr. James Rodriguez',
    students: 38,
    progress: 45,
    color: 'from-yellow-500 to-orange-600'
  }
]

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Algorithm',
    course: 'CS101',
    dueDate: new Date('2024-02-15'),
    status: 'pending'
  },
  {
    id: '2',
    title: 'Calculus Problem Set 3',
    course: 'MATH201',
    dueDate: new Date('2024-02-18'),
    status: 'submitted'
  },
  {
    id: '3',
    title: 'Logo Design Project',
    course: 'ART150',
    dueDate: new Date('2024-02-20'),
    status: 'graded',
    grade: 92
  },
  {
    id: '4',
    title: 'ER Diagram Design',
    course: 'CS301',
    dueDate: new Date('2024-02-22'),
    status: 'pending'
  }
]

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Cooper',
    email: 'alice@college.edu',
    course: 'CS101',
    attendance: 95,
    grade: 88,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'
  },
  {
    id: '2',
    name: 'Bob Johnson',
    email: 'bob@college.edu',
    course: 'CS101',
    attendance: 87,
    grade: 92,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'
  },
  {
    id: '3',
    name: 'Carol Smith',
    email: 'carol@college.edu',
    course: 'MATH201',
    attendance: 92,
    grade: 85,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@college.edu',
    course: 'ART150',
    attendance: 78,
    grade: 94,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
  }
]
