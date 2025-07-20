import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 animate-pulse-slow" />
        
        {/* Moving Grid Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_25%,rgba(59,130,246,0.03)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.03)_75%)] bg-[length:40px_40px] animate-grid-move"></div>
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(99,102,241,0.03)_25%,rgba(99,102,241,0.03)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.03)_75%)] bg-[length:60px_60px] animate-reverse-spin-25s"></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20 dark:bg-blue-300/20 rotate-45 animate-spin-slow" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-indigo-400/25 dark:bg-indigo-300/25 rounded-full animate-bounce-3s delay-100" />
        <div className="absolute bottom-32 left-40 w-2 h-8 bg-purple-400/20 dark:bg-purple-300/20 animate-pulse delay-200" />
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-cyan-400/20 dark:bg-cyan-300/20 rounded-full animate-ping-4s delay-300" />
        
        {/* Animated Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/8 via-indigo-400/5 to-transparent rounded-full blur-3xl animate-blob transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/6 via-pink-400/4 to-transparent rounded-full blur-3xl animate-blob delay-200 transform -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-violet-400/5 to-cyan-400/5 rounded-full blur-3xl animate-blob delay-500 transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/40 dark:bg-blue-300/40 rounded-full animate-ping-5s delay-75" />
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-indigo-400/50 dark:bg-indigo-300/50 rounded-full animate-pulse delay-150" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/30 dark:bg-purple-300/30 rounded-full animate-bounce-4s delay-300" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-400/40 dark:bg-cyan-300/40 rounded-full animate-ping-6s delay-700" />
        </div>
        
        {/* Corporate Accent Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/4 via-transparent to-indigo-600/4 dark:from-blue-500/8 dark:via-transparent dark:to-indigo-500/8" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-600/2 to-transparent dark:from-transparent dark:via-slate-400/5 dark:to-transparent" />
      </div>
      
      {/* Premium Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent dark:via-white/[0.01]" />
      
      <div className="flex relative z-10">
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          
          <motion.main
            className="flex-1 p-6 overflow-x-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
}