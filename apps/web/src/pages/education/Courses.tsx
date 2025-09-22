import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import { type Course } from '@realtydirect/lib';
// Define enums locally for now
enum CourseCategory {
  RECO_LICENSING = 'RECO_LICENSING',
  LEGAL_REQUIREMENTS = 'LEGAL_REQUIREMENTS',
  MARKET_ANALYSIS = 'MARKET_ANALYSIS',
  NEGOTIATION = 'NEGOTIATION',
  DOCUMENTATION = 'DOCUMENTATION',
  ETHICS = 'ETHICS',
  CONTINUING_EDUCATION = 'CONTINUING_EDUCATION'
}
enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PROFESSIONAL = 'PROFESSIONAL'
}

const Courses: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    isFree: false,
  });

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiService.getEducationCourses(filters);
      setCourses(response.data);
    } catch (err: any) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getCategoryLabel = (category: CourseCategory) => {
    const labels = {
      [CourseCategory.RECO_LICENSING]: 'RECO Licensing',
      [CourseCategory.LEGAL_REQUIREMENTS]: 'Legal Requirements',
      [CourseCategory.MARKET_ANALYSIS]: 'Market Analysis',
      [CourseCategory.NEGOTIATION]: 'Negotiation',
      [CourseCategory.DOCUMENTATION]: 'Documentation',
      [CourseCategory.ETHICS]: 'Ethics',
      [CourseCategory.CONTINUING_EDUCATION]: 'Continuing Education',
    };
    return labels[category] || category;
  };

  const getLevelLabel = (level: CourseLevel) => {
    const labels = {
      [CourseLevel.BEGINNER]: 'Beginner',
      [CourseLevel.INTERMEDIATE]: 'Intermediate',
      [CourseLevel.ADVANCED]: 'Advanced',
      [CourseLevel.PROFESSIONAL]: 'Professional',
    };
    return labels[level] || level;
  };

  const getLevelColor = (level: CourseLevel) => {
    const colors = {
      [CourseLevel.BEGINNER]: 'bg-green-100 text-green-800',
      [CourseLevel.INTERMEDIATE]: 'bg-yellow-100 text-yellow-800',
      [CourseLevel.ADVANCED]: 'bg-orange-100 text-orange-800',
      [CourseLevel.PROFESSIONAL]: 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Real Estate Courses</h1>
        <p className="mt-2 text-gray-600">
          Professional development and RECO-approved education courses
        </p>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="input"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value={CourseCategory.RECO_LICENSING}>RECO Licensing</option>
              <option value={CourseCategory.LEGAL_REQUIREMENTS}>Legal Requirements</option>
              <option value={CourseCategory.MARKET_ANALYSIS}>Market Analysis</option>
              <option value={CourseCategory.NEGOTIATION}>Negotiation</option>
              <option value={CourseCategory.DOCUMENTATION}>Documentation</option>
              <option value={CourseCategory.ETHICS}>Ethics</option>
              <option value={CourseCategory.CONTINUING_EDUCATION}>Continuing Education</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              className="input"
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value={CourseLevel.BEGINNER}>Beginner</option>
              <option value={CourseLevel.INTERMEDIATE}>Intermediate</option>
              <option value={CourseLevel.ADVANCED}>Advanced</option>
              <option value={CourseLevel.PROFESSIONAL}>Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <select
              className="input"
              value={filters.isFree ? 'free' : ''}
              onChange={(e) => handleFilterChange('isFree', e.target.value === 'free')}
            >
              <option value="">All Courses</option>
              <option value="free">Free Courses Only</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ category: '', level: '', isFree: false })}
              className="btn btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No courses found</div>
          <p className="text-gray-400">Try adjusting your filters or check back later for new courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {getLevelLabel(course.level)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {course.isFree ? 'FREE' : `$${course.price}`}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{getCategoryLabel(course.category)}</span>
                  <span>{Math.round(course.duration / 60)}h {course.duration % 60}m</span>
                </div>
                
                {course.learningObjectives.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">What you'll learn:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {course.learningObjectives.slice(0, 3).map((objective: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {objective}
                        </li>
                      ))}
                      {course.learningObjectives.length > 3 && (
                        <li className="text-gray-500">
                          +{course.learningObjectives.length - 3} more objectives
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Link
                    to={`/education/courses/${course.id}`}
                    className="btn btn-primary flex-1"
                  >
                    View Details
                  </Link>
                  {isAuthenticated && (
                    <button className="btn btn-secondary">
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;

