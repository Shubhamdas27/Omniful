import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ChartProps {
  title: string;
  data: any[];
  type: 'bar' | 'line' | 'pie';
  height?: number;
}

const COLORS = [
  '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B'
];

export default function Chart({ title, data, type, height = 300 }: ChartProps) {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <motion.div
        className="glass-card rounded-3xl p-6 border border-white/40 dark:border-gray-600/40 shadow-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{title}</h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </motion.div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey={data[0] && Object.keys(data[0]).find(key => key !== 'name') || 'value'}
                fill="url(#gradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone"
                dataKey={data[0] && Object.keys(data[0]).find(key => key !== 'name') || 'value'}
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={data[0] && Object.keys(data[0]).find(key => key !== 'name') || 'value'}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="glass-card rounded-3xl p-6 border border-white/40 dark:border-gray-600/40 shadow-2xl group hover:shadow-3xl transition-all duration-500"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01, y: -4 }}
    >
      <motion.h3
        className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="bg-white/20 dark:bg-black/10 rounded-2xl p-4 chart-container">
          {renderChart()}
        </div>
      </motion.div>
    </motion.div>
  );
}