import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

interface LicensingInfo {
  overview: string;
  requirements: Array<{
    title: string;
    description: string;
    duration?: string;
    provider?: string;
    format?: string;
    passingGrade?: string;
    validity?: string;
    minimum?: string;
  }>;
  costs: Array<{
    item: string;
    cost: string;
  }>;
  timeline: string;
}

interface ContinuingEducationInfo {
  overview: string;
  requirements: Array<{
    title: string;
    hours?: number;
    description: string;
    topics?: string[];
  }>;
  reporting: string;
  penalties: string;
}

const Licensing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [licensingInfo, setLicensingInfo] = useState<LicensingInfo | null>(null);
  const [continuingEducation, setContinuingEducation] = useState<ContinuingEducationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLicensingInfo();
  }, []);

  const fetchLicensingInfo = async () => {
    try {
      const [licensingResponse, continuingResponse] = await Promise.all([
        apiService.getLicensingRequirements(),
        apiService.getContinuingEducation(),
      ]);
      
      setLicensingInfo(licensingResponse.data);
      setContinuingEducation(continuingResponse.data);
    } catch (err: any) {
      setError('Failed to fetch licensing information');
      console.error('Error fetching licensing info:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading licensing information...</div>
      </div>
    );
  }

  if (error || !licensingInfo || !continuingEducation) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Failed to load licensing information'}</div>
        <button onClick={fetchLicensingInfo} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RECO Licensing Requirements
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about becoming a licensed real estate agent in Ontario
        </p>
      </div>

      {/* Overview */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          {licensingInfo.overview}
        </p>
      </div>

      {/* Requirements */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Licensing Requirements</h2>
        <div className="space-y-6">
          {licensingInfo.requirements.map((requirement, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {requirement.title}
              </h3>
              <p className="text-gray-700 mb-2">{requirement.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                {requirement.duration && (
                  <div>
                    <span className="font-medium">Duration:</span> {requirement.duration}
                  </div>
                )}
                {requirement.provider && (
                  <div>
                    <span className="font-medium">Provider:</span> {requirement.provider}
                  </div>
                )}
                {requirement.format && (
                  <div>
                    <span className="font-medium">Format:</span> {requirement.format}
                  </div>
                )}
                {requirement.passingGrade && (
                  <div>
                    <span className="font-medium">Passing Grade:</span> {requirement.passingGrade}
                  </div>
                )}
                {requirement.validity && (
                  <div>
                    <span className="font-medium">Validity:</span> {requirement.validity}
                  </div>
                )}
                {requirement.minimum && (
                  <div>
                    <span className="font-medium">Minimum:</span> {requirement.minimum}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Estimated Costs</h2>
          <div className="space-y-4">
            {licensingInfo.costs.map((cost, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">{cost.item}</span>
                <span className="font-semibold text-gray-900">{cost.cost}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 border-t-2 border-primary-200 font-bold text-lg">
              <span>Total Estimated Cost</span>
              <span className="text-primary-600">
                ${licensingInfo.costs.reduce((sum, cost) => {
                  const amount = parseFloat(cost.cost.replace(/[$,]/g, '').split('-')[0]);
                  return sum + (isNaN(amount) ? 0 : amount);
                }, 0).toLocaleString()}+
              </span>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h2>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{licensingInfo.timeline}</p>
            <p className="text-gray-600">
              Complete timeline from start to licensed agent
            </p>
          </div>
        </div>
      </div>

      {/* Continuing Education */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Continuing Education Requirements</h2>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {continuingEducation.overview}
          </p>
        </div>

        <div className="space-y-6">
          {continuingEducation.requirements.map((req, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {req.title}
              </h3>
              <p className="text-gray-700 mb-2">{req.description}</p>
              
              {req.hours && (
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Hours Required:</span> {req.hours}
                </div>
              )}
              
              {req.topics && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Topics:</span>
                  <ul className="list-disc list-inside mt-1">
                    {req.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Reporting:</strong> {continuingEducation.reporting}</p>
            <p><strong>Penalties:</strong> {continuingEducation.penalties}</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-600 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-primary-100 mb-6">
          Browse our RECO-approved courses and begin your path to becoming a licensed real estate agent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/education/courses"
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Browse Courses
          </a>
          <a
            href="https://www.reco.on.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
          >
            Visit RECO Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Licensing;

