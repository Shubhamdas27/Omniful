import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, User, BookOpen, Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FloatingElements from '../components/FloatingElements';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

type UserRole = 'student' | 'teacher' | 'admin';

const roles = [
  { id: 'student', label: 'Student', icon: User, color: 'from-blue-500 to-cyan-500' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
  { id: 'admin', label: 'Admin', icon: Shield, color: 'from-purple-500 to-pink-500' }
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* New Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-950">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-300/40 rotate-45 animate-reverse-spin"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse-slow"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-blue-300 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-float animation-delay-3000"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
      </div>
      
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">College Aaja Bhai</h1>
            <p className="text-purple-200">Premium College Management</p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-white text-sm font-medium mb-4 text-center">Select your role</p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <motion.button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as UserRole)}
                    className={`relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                      selectedRole === role.id
                        ? 'border-white/40 bg-white/20'
                        : 'border-white/20 bg-white/10 hover:bg-white/15'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-xs font-medium">{role.label}</p>
                    {selectedRole === role.id && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent"
                        layoutId="roleSelection"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <motion.a
                href="#"
                className="text-purple-200 text-sm hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Forgot your password?
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}