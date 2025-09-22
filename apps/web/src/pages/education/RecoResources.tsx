import React, { useState, useEffect } from 'react';
import { RecoResource, ResourceType } from '@realtydirect/lib';
import { apiService } from '../../services/api';

const RecoResources: React.FC = () => {
  const [resources, setResources] = useState<RecoResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchResources();
  }, [selectedCategory]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await apiService.getRecoResources(selectedCategory || undefined);
      setResources(response.data);
    } catch (err: any) {
      setError('Failed to fetch RECO resources');
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'licensing', label: 'Licensing' },
    { value: 'forms', label: 'Forms & Documents' },
    { value: 'regulations', label: 'Regulations' },
    { value: 'guidelines', label: 'Guidelines' },
    { value: 'consumer-protection', label: 'Consumer Protection' },
    { value: 'education', label: 'Education' },
  ];

  const getResourceTypeIcon = (type: ResourceType) => {
    const icons = {
      [ResourceType.DOCUMENT]: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      [ResourceType.VIDEO]: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      [ResourceType.ARTICLE]: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      [ResourceType.FORM]: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      [ResourceType.GUIDE]: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      [ResourceType.WEBINAR]: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[type] || icons[ResourceType.DOCUMENT];
  };

  const getResourceTypeColor = (type: ResourceType) => {
    const colors = {
      [ResourceType.DOCUMENT]: 'bg-blue-100 text-blue-800',
      [ResourceType.VIDEO]: 'bg-red-100 text-red-800',
      [ResourceType.ARTICLE]: 'bg-green-100 text-green-800',
      [ResourceType.FORM]: 'bg-yellow-100 text-yellow-800',
      [ResourceType.GUIDE]: 'bg-purple-100 text-purple-800',
      [ResourceType.WEBINAR]: 'bg-indigo-100 text-indigo-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading RECO resources...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">RECO Resources</h1>
        <p className="mt-2 text-gray-600">
          Official documents, forms, and regulatory information from the Real Estate Council of Ontario
        </p>
      </div>

      {/* RECO Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-blue-900">About RECO</h3>
            <p className="text-blue-800 mt-1">
              The Real Estate Council of Ontario (RECO) is the provincial regulator for real estate 
              salespersons, brokers, and brokerages in Ontario. RECO protects consumers and supports 
              a fair, safe, and informed marketplace.
            </p>
            <a
              href="https://www.reco.on.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium"
            >
              Visit Official RECO Website →
            </a>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Resources Grid */}
      {resources.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No resources found</div>
          <p className="text-gray-400">
            {selectedCategory 
              ? `No resources available for "${selectedCategory}" category.`
              : 'Check back later for new RECO resources.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(resource.type)}`}>
                    {getResourceTypeIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type.toLowerCase()}</span>
                  </div>
                  {resource.isOfficial && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Official
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                
                {resource.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">
                    {resource.category.replace(/-/g, ' ')}
                  </span>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                  >
                    View Resource
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Essential Forms</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="https://www.reco.on.ca/en/forms" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  • Registration Forms
                </a>
              </li>
              <li>
                <a href="https://www.reco.on.ca/en/forms" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  • Disclosure Forms
                </a>
              </li>
              <li>
                <a href="https://www.reco.on.ca/en/forms" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  • Complaint Forms
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Consumer Protection</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="https://www.reco.on.ca/en/consumer-protection" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  • Consumer Rights
                </a>
              </li>
              <li>
                <a href="https://www.reco.on.ca/en/consumer-protection" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  • Complaint Process
                </a>
              </li>
              <li>
                <a href="https://www.reco.on.ca/en/consumer-protection" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  • Compensation Fund
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
        <p className="text-sm text-yellow-700">
          These resources are provided for convenience and educational purposes. For the most current 
          and official information, always refer to the official RECO website and contact RECO directly 
          for specific questions about regulations and requirements.
        </p>
      </div>
    </div>
  );
};

export default RecoResources;

