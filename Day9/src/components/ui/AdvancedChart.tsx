import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartProps {
  data: any[];
  type?: 'line' | 'area' | 'bar' | 'pie' | 'radial' | 'composed';
  title?: string;
  height?: number;
  colors?: string[];
  xKey?: string;
  yKey?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  gradientFill?: boolean;
  animated?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#06B6D4', // cyan-500
  '#EC4899', // pink-500
  '#84CC16', // lime-500
];

export function AdvancedChart({
  data,
  type = 'line',
  title,
  height = 300,
  colors = DEFAULT_COLORS,
  xKey = 'name',
  yKey = 'value',
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  gradientFill = true,
  animated = true,
  className = ''
}: ChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm text-[${entry.color}]`}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderGradients = () => (
    <defs>
      {colors.map((color, index) => (
        <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0.1} />
        </linearGradient>
      ))}
    </defs>
  );

  const chartAnimation = animated ? {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  } : {};

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              {gradientFill && renderGradients()}
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
              <XAxis 
                dataKey={xKey} 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey={yKey}
                stroke={colors[0]}
                fill={gradientFill ? `url(#gradient-0)` : colors[0]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[0] }}
                activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2, fill: 'white' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              {gradientFill && renderGradients()}
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
              <XAxis 
                dataKey={xKey} 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend />}
              <Bar
                dataKey={yKey}
                fill={gradientFill ? `url(#gradient-0)` : colors[0]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend />}
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={height / 3}
                fill="#8884d8"
                dataKey={yKey}
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                className="text-xs fill-gray-700 dark:fill-gray-300"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radial':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={data}>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend />}
              <RadialBar
                dataKey={yKey}
                cornerRadius={4}
                fill={colors[0]}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        );

      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={data}>
              {gradientFill && renderGradients()}
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
              <XAxis 
                dataKey={xKey} 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend />}
              <Bar
                dataKey={yKey}
                fill={gradientFill ? `url(#gradient-1)` : colors[1]}
                radius={[2, 2, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="trend"
                stroke={colors[0]}
                strokeWidth={3}
                dot={{ fill: colors[0], r: 4 }}
                activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2, fill: 'white' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      default: // line
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
              <XAxis 
                dataKey={xKey} 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={yKey}
                stroke={colors[0]}
                strokeWidth={3}
                dot={{ fill: colors[0], r: 4 }}
                activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2, fill: 'white' }}
                strokeDasharray={animated ? "5 5" : "0"}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <motion.div 
      className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}
      {...chartAnimation}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      
      <div className="w-full">
        {renderChart()}
      </div>
      
      {/* Chart Actions */}
      <div className="flex justify-end mt-4 gap-2">
        <button 
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="Chart options"
          aria-label="Chart options"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
