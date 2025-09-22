import React from 'react';
import { Link } from 'react-router-dom';

const EducationHub: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Real Estate Education Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master real estate transactions and become your own agent with our comprehensive 
          educational resources, RECO-approved courses, and self-representation guides.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Link
          to="/education/courses"
          className="card p-6 hover:shadow-lg transition-shadow text-center"
        >
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Courses</h3>
          <p className="text-gray-600 text-sm">
            RECO-approved courses and professional development
          </p>
        </Link>

        <Link
          to="/education/reco-resources"
          className="card p-6 hover:shadow-lg transition-shadow text-center"
        >
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">RECO Resources</h3>
          <p className="text-gray-600 text-sm">
            Official documents, forms, and regulatory information
          </p>
        </Link>

        <Link
          to="/education/self-representation"
          className="card p-6 hover:shadow-lg transition-shadow text-center"
        >
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Representation</h3>
          <p className="text-gray-600 text-sm">
            Step-by-step guides to represent yourself in transactions
          </p>
        </Link>

        <Link
          to="/education/reco-resources"
          className="card p-6 hover:shadow-lg transition-shadow text-center"
        >
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">RECO Resources</h3>
          <p className="text-gray-600 text-sm">
            Official documents, forms, and regulatory information
          </p>
        </Link>

        <Link
          to="/education/licensing"
          className="card p-6 hover:shadow-lg transition-shadow text-center"
        >
          <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Licensing Info</h3>
          <p className="text-gray-600 text-sm">
            Requirements and process to become a licensed agent
          </p>
        </Link>
      </div>

      {/* Featured Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECO Licensing Overview */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Become a Licensed Real Estate Agent
          </h2>
          <p className="text-gray-600 mb-4">
            Ready to take your real estate knowledge to the next level? Learn about the 
            requirements and process to become a licensed real estate agent in Ontario.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Complete RECO-approved courses</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Pass licensing examinations</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Obtain insurance and registration</span>
            </div>
          </div>
          
          <Link
            to="/education/licensing"
            className="btn btn-primary"
          >
            Learn More
          </Link>
        </div>

        {/* Self-Representation Guide */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Represent Yourself in Real Estate
          </h2>
          <p className="text-gray-600 mb-4">
            Save thousands in commission fees by learning how to handle your own 
            real estate transactions with our comprehensive self-representation guides.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Step-by-step transaction guides</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Legal document templates</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Negotiation strategies</span>
            </div>
          </div>
          
          <Link
            to="/education/self-representation"
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose RealtyDirect Education?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">RECO Approved</h3>
            <p className="text-sm text-gray-600">
              All courses meet RECO standards and requirements for professional development
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Self-Paced Learning</h3>
            <p className="text-sm text-gray-600">
              Learn at your own pace with flexible online courses and materials
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Practical Skills</h3>
            <p className="text-sm text-gray-600">
              Gain real-world skills that you can apply immediately to save money
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;
