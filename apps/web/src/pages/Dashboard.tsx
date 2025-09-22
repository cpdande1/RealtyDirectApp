import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '@realtydirect/lib';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const isSeller = user?.role === Role.SELLER;
  const isBuyer = user?.role === Role.BUYER;
  const isLender = user?.role === Role.LENDER;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user?.name}! Here's what's happening with your real estate activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Active Listings</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500 mt-1">Properties you're selling</p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Saved Properties</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500 mt-1">Properties you're interested in</p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Active Transactions</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500 mt-1">Ongoing deals</p>
        </div>
      </div>

      {/* Role-specific content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isSeller && (
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Seller Tools</h3>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Create New Listing
              </button>
              <button className="btn btn-secondary w-full">
                View My Listings
              </button>
              <button className="btn btn-secondary w-full">
                Market Analysis
              </button>
            </div>
          </div>
        )}

        {isBuyer && (
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Buyer Tools</h3>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Browse Properties
              </button>
              <button className="btn btn-secondary w-full">
                Mortgage Calculator
              </button>
              <button className="btn btn-secondary w-full">
                Saved Properties
              </button>
            </div>
          </div>
        )}

        {isLender && (
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lender Tools</h3>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Loan Applications
              </button>
              <button className="btn btn-secondary w-full">
                Pre-approvals
              </button>
              <button className="btn btn-secondary w-full">
                Rate Calculator
              </button>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Welcome to RealtyDirect!</p>
                <p className="text-xs text-gray-500">Account created successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
