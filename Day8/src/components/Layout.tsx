import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import { useAppStore } from '../store/useStore'
import type { PageRoute } from '../App'

interface LayoutProps {
  children: React.ReactNode
  currentPage?: PageRoute
  setCurrentPage?: (page: PageRoute) => void
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    x: -200,
    scale: 0.98
  },
  in: { 
    opacity: 1, 
    x: 0,
    scale: 1
  },
  out: { 
    opacity: 0, 
    x: 200,
    scale: 0.98
  }
}

const Layout = ({ children, currentPage = 'dashboard', setCurrentPage }: LayoutProps) => {
  const { sidebarCollapsed } = useAppStore()

  const handleNavigate = (path: string) => {
    if (setCurrentPage) {
      setCurrentPage(path as PageRoute)
    }
    console.log(`Navigating to: ${path}`)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <Sidebar currentPath={currentPage} onNavigate={handleNavigate} />
      
      <main className={`
        flex-1 transition-all duration-300 ease-in-out relative
        ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
      `}>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-sm" />
        
        <div className="relative z-10 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.4
              }}
              className="h-full overflow-y-auto"
            >
              {/* Scrollable content container */}
              <div className="min-h-full">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Layout
