import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-purple-300/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 border-r-blue-400"></div>
        </motion.div>
        
        <motion.h2
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          EduFlow
        </motion.h2>
        
        <motion.p
          className="text-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Loading your experience...
        </motion.p>
      </motion.div>
    </div>
  );
}