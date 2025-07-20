import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Play,
  Book,
  Award,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  status: 'enrolled' | 'available' | 'completed';
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    instructor: 'Prof. Rajesh Sharma',
    description: 'Comprehensive course covering calculus, linear algebra, and advanced mathematical concepts.',
    duration: '14 weeks',
    students: 45,
    rating: 4.8,
    progress: 75,
    status: 'enrolled',
    category: 'Mathematics',
    level: 'Advanced',
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    instructor: 'Dr. Priya Singh',
    description: 'Introduction to classical mechanics, thermodynamics, and electromagnetic theory.',
    duration: '12 weeks',
    students: 38,
    rating: 4.6,
    progress: 45,
    status: 'enrolled',
    category: 'Physics',
    level: 'Intermediate',
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    title: 'Computer Science Basics',
    instructor: 'Akshay Nema',
    description: 'Programming fundamentals, data structures, and algorithm design principles.',
    duration: '16 weeks',
    students: 62,
    rating: 4.9,
    status: 'available',
    category: 'Computer Science',
    level: 'Beginner',
    image: '/api/placeholder/300/200'
  },
  {
    id: '4',
    title: 'Chemistry Lab',
    instructor: 'Dr. Yuvraj Yadav',
    description: 'Hands-on laboratory experiments in organic and inorganic chemistry.',
    duration: '10 weeks',
    students: 28,
    rating: 4.7,
    progress: 100,
    status: 'completed',
    category: 'Chemistry',
    level: 'Intermediate',
    image: '/api/placeholder/300/200'
  },
  {
    id: '5',
    title: 'English Literature',
    instructor: 'Prof. Anjali Patel',
    description: 'Study of classical and modern literature with emphasis on critical analysis.',
    duration: '12 weeks',
    students: 34,
    rating: 4.5,
    status: 'available',
    category: 'Literature',
    level: 'Intermediate',
    image: '/api/placeholder/300/200'
  },
  {
    id: '6',
    title: 'Business Management',
    instructor: 'Shubham Das',
    description: 'Principles of management, leadership, and business strategy fundamentals.',
    duration: '15 weeks',
    students: 41,
    rating: 4.4,
    status: 'available',
    category: 'Business',
    level: 'Advanced',
    image: '/api/placeholder/300/200'
  }
];

export default function CoursesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Literature', 'Business'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const enrolledCourses = mockCourses.filter(course => course.status === 'enrolled');
  const availableCourses = mockCourses.filter(course => course.status === 'available');
  const completedCourses = mockCourses.filter(course => course.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'info';
      case 'available': return 'success';
      case 'completed': return 'warning';
      default: return 'default';
    }
  };

  const renderCourseCard = (course: Course) => (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-white opacity-80" />
          <div className="absolute top-4 right-4">
            <Badge variant={getStatusColor(course.status)} className="capitalize">
              {course.status}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                by {course.instructor}
              </p>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm ml-1">{course.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {course.students} students
            </div>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          
          {course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ${
                    course.progress === 100 ? 'w-full' :
                    course.progress >= 75 ? 'w-3/4' :
                    course.progress >= 50 ? 'w-1/2' :
                    course.progress >= 25 ? 'w-1/4' :
                    'w-1/12'
                  }`}
                />
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            {course.status === 'enrolled' ? (
              <Button className="flex-1" variant="primary">
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            ) : course.status === 'available' ? (
              <Button className="flex-1" variant="primary">
                <Book className="w-4 h-4 mr-2" />
                Enroll Now
              </Button>
            ) : (
              <Button className="flex-1" variant="outline">
                <Award className="w-4 h-4 mr-2" />
                View Certificate
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {user?.role === 'admin' ? 'Course Management' : 'My Courses'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {user?.role === 'admin' 
              ? 'Manage and oversee all courses in the system' 
              : 'Discover and enroll in exciting courses'}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    title="Filter by category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <select
                  title="Filter by level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        {user?.role !== 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Enrolled</p>
                  <p className="text-3xl font-bold">{enrolledCourses.length}</p>
                </div>
                <BookOpen className="w-12 h-12 text-blue-200" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Available</p>
                  <p className="text-3xl font-bold">{availableCourses.length}</p>
                </div>
                <Book className="w-12 h-12 text-green-200" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Completed</p>
                  <p className="text-3xl font-bold">{completedCourses.length}</p>
                </div>
                <Award className="w-12 h-12 text-purple-200" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(renderCourseCard)}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
