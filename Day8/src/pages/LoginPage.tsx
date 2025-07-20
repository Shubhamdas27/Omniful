import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, GraduationCap, Sparkles } from 'lucide-react'
import { useAuthStore } from '../store/useStore'
import { cn } from '../lib/utils'

interface FloatingShapeProps {
  className?: string
  delay?: number
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ className, delay = 0 }) => (
  <motion.div
    className={cn(
      "absolute rounded-full opacity-20",
      className
    )}
    animate={{
      y: [0, -30, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
)

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access courses, assignments, and grades',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-purple-600',
    hover: 'hover:from-blue-600 hover:to-purple-700'
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Manage classes, students, and assessments',
    icon: User,
    gradient: 'from-emerald-500 to-teal-600',
    hover: 'hover:from-emerald-600 hover:to-teal-700'
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'System administration and user management',
    icon: Sparkles,
    gradient: 'from-pink-500 to-rose-600',
    hover: 'hover:from-pink-600 hover:to-rose-700'
  }
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student')
  const [step, setStep] = useState<'role' | 'credentials'>('role')
  const { login, isLoading } = useAuthStore()

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setSelectedRole(role)
    setStep('credentials')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password, selectedRole)
  }

  const handleBack = () => {
    setStep('role')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="center-container">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Multi-layered gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/30 via-transparent to-pink-900/30 animate-gradient-shift" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
        
        {/* Enhanced floating geometric shapes */}
        <FloatingShape 
          className="w-[500px] h-[500px] bg-gradient-to-r from-purple-400/25 to-pink-400/25 top-5 left-5 rounded-full blur-3xl animate-glow-pulse"
          delay={0}
        />
        <FloatingShape 
          className="w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 top-1/3 right-10 rounded-full blur-3xl animate-glow-pulse"
          delay={2}
        />
        <FloatingShape 
          className="w-80 h-80 bg-gradient-to-r from-emerald-400/25 to-teal-400/25 bottom-10 left-1/5 rounded-full blur-3xl animate-glow-pulse"
          delay={4}
        />
        <FloatingShape 
          className="w-64 h-64 bg-gradient-to-r from-violet-400/20 to-fuchsia-400/20 top-1/2 left-1/2 rounded-full blur-2xl animate-glow-pulse"
          delay={1}
        />
        <FloatingShape 
          className="w-72 h-72 bg-gradient-to-r from-orange-400/15 to-red-400/15 bottom-1/3 right-1/4 rounded-full blur-3xl animate-glow-pulse"
          delay={3}
        />
        
        {/* Animated border accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent animate-shimmer" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent animate-shimmer" style={{ animationDelay: '3s' }} />
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-500/60 to-transparent animate-shimmer" style={{ animationDelay: '1s' }} />
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-violet-500/60 to-transparent animate-shimmer" style={{ animationDelay: '4s' }} />
        
        {/* Additional floating elements */}
        <FloatingShape 
          className="w-60 h-60 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 bottom-10 right-10 rounded-full blur-xl"
          delay={1}
        />
        
        {/* Additional ambient particles */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce" />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          {/* Enhanced Logo with Premium Design */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-purple-500 via-blue-600 to-violet-700 shadow-2xl animate-gradient-shift card-hover-lift"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <GraduationCap className="w-12 h-12 text-white drop-shadow-lg" />
          </motion.div>
          
          {/* Enhanced Title with Rainbow Gradient */}
          <motion.h1 
            className="text-6xl font-bold mb-6 text-rainbow text-glow"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            EduFlow
          </motion.h1>
          
          {/* Enhanced Subtitle with Glow Effect */}
          <motion.p 
            className="text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Premium College Management System - Where Education Meets Innovation ✨
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'role' ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* Role selection intro */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Choose Your Role</h2>
                <p className="text-gray-400">Select how you'd like to access the system</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.2, 
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 120
                    }}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -20,
                      rotateY: 5,
                      rotateX: 5
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRoleSelect(role.id as any)}
                    className={cn(
                      "relative cursor-pointer group perspective-1000",
                      "transition-all duration-700 transform-gpu"
                    )}
                  >
                    {/* Main Card */}
                    <div className={cn(
                      "relative rounded-[2.5rem] p-8 overflow-hidden",
                      "bg-gradient-to-br backdrop-blur-xl border-2",
                      "shadow-2xl group-hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.4)]",
                      role.gradient,
                      role.hover,
                      "border-white/20 group-hover:border-white/40"
                    )}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700" />
                      </div>

                      {/* Animated Shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="shimmer absolute inset-0 rounded-[2.5rem]" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon Container */}
                        <motion.div 
                          className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-[1.5rem] bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-500 shadow-lg group-hover:shadow-xl"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                        >
                          <role.icon className="w-12 h-12 text-white drop-shadow-lg filter group-hover:drop-shadow-2xl" />
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-shadow-glow transition-all duration-300 tracking-wide">
                          {role.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-200 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 font-medium">
                          {role.description}
                        </p>

                        {/* Hover Indicator */}
                        <motion.div
                          className="mt-6 w-16 h-1 bg-white/50 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg"
                          initial={{ width: 0 }}
                          whileHover={{ width: 64 }}
                        />

                        {/* Corner Accent */}
                        <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full group-hover:scale-150 group-hover:bg-white/60 transition-all duration-300" />
                      </div>

                      {/* Border Glow Effect */}
                      <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Selection Indicator */}
                    <motion.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="max-w-md mx-auto"
            >
              <motion.div 
                className="glass rounded-3xl p-8 relative overflow-hidden group"
                initial={{ scale: 0.9, rotateY: -15 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-xl" />

                <div className="text-center mb-8 relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="heading-md text-white mb-2">
                    Welcome <span className="capitalize text-purple-300">{selectedRole}</span>! 👋
                  </h2>
                  <p className="text-gray-300">Please sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-200 pl-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="glass w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 focus:bg-white/10 focus:scale-[1.02]"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-200 pl-1">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="glass w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 focus:bg-white/10 focus:scale-[1.02]"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-glow bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shimmer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner mr-3" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Sign In & Continue
                      </span>
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleBack}
                    className="w-full text-gray-300 hover:text-white transition-colors duration-300 py-3 rounded-xl hover:bg-white/5 flex items-center justify-center group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.span
                      className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                    >
                      ←
                    </motion.span>
                    Back to role selection
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
