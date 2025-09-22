import React, { useState, useEffect } from 'react';
import { type SelfRepresentationGuide } from '@realtydirect/lib';
import { apiService } from '../../services/api';

const SelfRepresentation: React.FC = () => {
  const [guides, setGuides] = useState<SelfRepresentationGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchGuides();
  }, [selectedCategory]);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const response = await apiService.getSelfRepresentationGuides(selectedCategory || undefined);
      setGuides(response.data);
    } catch (err: any) {
      setError('Failed to fetch self-representation guides');
      console.error('Error fetching guides:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'buying', label: 'Buying a Property' },
    { value: 'selling', label: 'Selling a Property' },
    { value: 'legal', label: 'Legal Requirements' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'documents', label: 'Documentation' },
    { value: 'financing', label: 'Financing' },
  ];

  const groupedGuides = guides.reduce((acc, guide) => {
    if (!acc[guide.category]) {
      acc[guide.category] = [];
    }
    acc[guide.category].push(guide);
    return acc;
  }, {} as Record<string, SelfRepresentationGuide[]>);

  // Sort guides within each category by step
  Object.keys(groupedGuides).forEach(category => {
    groupedGuides[category].sort((a: SelfRepresentationGuide, b: SelfRepresentationGuide) => a.step - b.step);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading guides...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Self-Representation Guides
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to handle your own real estate transactions and save thousands in commission fees
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Why Represent Yourself?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-sm text-gray-600">
              Avoid paying 2.5-6% commission fees, saving thousands on your transaction
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Full Control</h3>
            <p className="text-sm text-gray-600">
              Make all decisions yourself without relying on an agent's schedule or preferences
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Learn & Grow</h3>
            <p className="text-sm text-gray-600">
              Gain valuable knowledge and skills for future real estate transactions
            </p>
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

      {/* Guides */}
      {Object.keys(groupedGuides).length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No guides found</div>
          <p className="text-gray-400">
            {selectedCategory 
              ? `No guides available for "${selectedCategory}" category.`
              : 'Check back later for new self-representation guides.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedGuides).map(([category, categoryGuides]) => (
            <div key={category} className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              
              <div className="space-y-4">
                {categoryGuides.map((guide: SelfRepresentationGuide) => (
                  <div key={guide.id} className="border-l-4 border-primary-500 pl-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                            Step {guide.step}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {guide.title}
                          </h3>
                        </div>
                        
                        {guide.content && (
                          <div className="text-gray-700 space-y-2">
                            {typeof guide.content === 'string' ? (
                              <p>{guide.content}</p>
                            ) : (
                              <div>
                                {guide.content.description && (
                                  <p className="mb-3">{guide.content.description}</p>
                                )}
                                
                                {guide.content.steps && (
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-gray-900">Steps:</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-sm">
                                      {guide.content.steps.map((step: string, stepIndex: number) => (
                                        <li key={stepIndex}>{step}</li>
                                      ))}
                                    </ol>
                                  </div>
                                )}
                                
                                {guide.content.tips && (
                                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                    <h4 className="font-medium text-yellow-800 mb-2">💡 Tips:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                                      {guide.content.tips.map((tip: string, tipIndex: number) => (
                                        <li key={tipIndex}>{tip}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {guide.content.warnings && (
                                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                                    <h4 className="font-medium text-red-800 mb-2">⚠️ Important:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                                      {guide.content.warnings.map((warning: string, warningIndex: number) => (
                                        <li key={warningIndex}>{warning}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resources */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Requirements</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Understanding purchase agreements</li>
              <li>• Disclosure requirements</li>
              <li>• Title searches and insurance</li>
              <li>• Closing procedures</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cost Savings Calculator</h3>
            <p className="text-gray-700 mb-4">
              Calculate how much you can save by representing yourself in your transaction.
            </p>
            <button className="btn btn-primary">
              Calculate Savings
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
        <p className="text-sm text-yellow-700">
          These guides are for educational purposes only and do not constitute legal advice. 
          Real estate transactions involve significant financial and legal implications. 
          We recommend consulting with qualified professionals, including lawyers and real estate experts, 
          especially for complex transactions or if you're unsure about any aspect of the process.
        </p>
      </div>
    </div>
  );
};

export default SelfRepresentation;

