import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { AdvancedChart } from '../ui/AdvancedChart';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { usePermissions } from '../../hooks/usePermissions';

interface AnalyticsData {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  attendanceRate: number;
  trends: {
    students: number;
    teachers: number;
    courses: number;
    attendance: number;
  };
  chartData: {
    enrollment: any[];
    attendance: any[];
    performance: any[];
    courseCompletion: any[];
  };
  recentActivity: any[];
  alerts: any[];
}

export function DashboardAnalytics() {
  const { user } = usePermissions() as any;
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        totalStudents: 1247,
        totalTeachers: 89,
        totalCourses: 156,
        attendanceRate: 87.5,
        trends: {
          students: 12.5,
          teachers: 5.2,
          courses: -2.1,
          attendance: 3.7
        },
        chartData: {
          enrollment: [
            { name: 'Jan', value: 1100, trend: 1080 },
            { name: 'Feb', value: 1150, trend: 1120 },
            { name: 'Mar', value: 1200, trend: 1180 },
            { name: 'Apr', value: 1247, trend: 1220 },
          ],
          attendance: [
            { name: 'Mon', value: 85 },
            { name: 'Tue', value: 88 },
            { name: 'Wed', value: 92 },
            { name: 'Thu', value: 87 },
            { name: 'Fri', value: 83 },
            { name: 'Sat', value: 76 },
            { name: 'Sun', value: 89 },
          ],
          performance: [
            { name: 'Excellent', value: 35, color: '#10B981' },
            { name: 'Good', value: 42, color: '#3B82F6' },
            { name: 'Average', value: 18, color: '#F59E0B' },
            { name: 'Poor', value: 5, color: '#EF4444' },
          ],
          courseCompletion: [
            { subject: 'Mathematics', completed: 78, total: 100 },
            { subject: 'Physics', completed: 65, total: 100 },
            { subject: 'Chemistry', completed: 82, total: 100 },
            { subject: 'Biology', completed: 71, total: 100 },
            { subject: 'English', completed: 89, total: 100 },
          ]
        },
        recentActivity: [
          { type: 'enrollment', message: '25 new students enrolled today', time: '2 hours ago', icon: Users },
          { type: 'assignment', message: 'Physics Assignment due in 2 days', time: '4 hours ago', icon: BookOpen },
          { type: 'event', message: 'Parent-Teacher meeting scheduled', time: '1 day ago', icon: Calendar },
          { type: 'achievement', message: '15 students received certificates', time: '2 days ago', icon: Award },
        ],
        alerts: [
          { type: 'warning', message: 'Low attendance in Grade 10-A (65%)', priority: 'high' },
          { type: 'info', message: 'Monthly report generation in progress', priority: 'medium' },
          { type: 'error', message: '3 assignments pending review', priority: 'high' },
        ]
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  const statCards = [
    {
      title: 'Total Students',
      value: analyticsData?.totalStudents || 0,
      trend: analyticsData?.trends.students || 0,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Teachers',
      value: analyticsData?.totalTeachers || 0,
      trend: analyticsData?.trends.teachers || 0,
      icon: BookOpen,
      color: 'emerald'
    },
    {
      title: 'Total Courses',
      value: analyticsData?.totalCourses || 0,
      trend: analyticsData?.trends.courses || 0,
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Attendance Rate',
      value: `${analyticsData?.attendanceRate || 0}%`,
      trend: analyticsData?.trends.attendance || 0,
      icon: Target,
      color: 'amber'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name || 'User'}! Here's what's happening at College Aaja Bhai.
          </p>
        </div>
        
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-colors
                ${timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {analyticsData?.alerts && analyticsData.alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsData.alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-lg border flex items-start gap-3
                ${alert.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                  alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }
              `}
            >
              <AlertTriangle className={`
                w-5 h-5 mt-0.5
                ${alert.type === 'error' ? 'text-red-500' :
                  alert.type === 'warning' ? 'text-amber-500' :
                  'text-blue-500'
                }
              `} />
              <div className="flex-1">
                <p className={`
                  text-sm font-medium
                  ${alert.type === 'error' ? 'text-red-800 dark:text-red-200' :
                    alert.type === 'warning' ? 'text-amber-800 dark:text-amber-200' :
                    'text-blue-800 dark:text-blue-200'
                  }
                `}>
                  {alert.message}
                </p>
                <Badge 
                  variant={alert.priority === 'high' ? 'error' : alert.priority === 'medium' ? 'warning' : 'default'}
                  className="mt-2"
                >
                  {alert.priority} priority
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.trend > 0;
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`
                    p-3 rounded-xl
                    ${card.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      card.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      card.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-amber-100 dark:bg-amber-900/30'
                    }
                  `}>
                    <Icon className={`
                      w-6 h-6
                      ${card.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        card.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                        card.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        'text-amber-600 dark:text-amber-400'
                      }
                    `} />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(card.trend)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <AdvancedChart
          data={analyticsData?.chartData.enrollment || []}
          type="composed"
          title="Student Enrollment Trend"
          height={300}
          xKey="name"
          yKey="value"
          showLegend={true}
          animated={true}
        />

        {/* Weekly Attendance */}
        <AdvancedChart
          data={analyticsData?.chartData.attendance || []}
          type="area"
          title="Weekly Attendance Pattern"
          height={300}
          xKey="name"
          yKey="value"
          gradientFill={true}
          animated={true}
        />

        {/* Performance Distribution */}
        <AdvancedChart
          data={analyticsData?.chartData.performance || []}
          type="pie"
          title="Student Performance Distribution"
          height={300}
          xKey="name"
          yKey="value"
          showLegend={true}
        />

        {/* Course Completion */}
        <AdvancedChart
          data={analyticsData?.chartData.courseCompletion || []}
          type="bar"
          title="Course Completion Rates"
          height={300}
          xKey="subject"
          yKey="completed"
          animated={true}
        />
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
        </div>

        <div className="space-y-4">
          {analyticsData?.recentActivity.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
