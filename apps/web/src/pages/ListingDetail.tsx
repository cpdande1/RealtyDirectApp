import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { type Listing } from '@realtydirect/lib';

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchListing(id);
    }
  }, [id]);

  const fetchListing = async (listingId: string) => {
    try {
      const response = await apiService.getListing(listingId);
      setListing(response.data);
    } catch (err: any) {
      setError('Failed to fetch listing details');
      console.error('Error fetching listing:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading listing details...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Listing not found'}</div>
        <button onClick={() => fetchListing(id!)} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => window.history.back()}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Listings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="space-y-4">
            {listing.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${listing.title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Property details */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{listing.title}</h2>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-primary-600">
                ${listing.price.toLocaleString()}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                listing.status === 'ACTIVE' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {listing.status}
              </span>
            </div>

            <div className="text-gray-600 mb-4">
              <p className="text-lg">
                {listing.address.street}<br />
                {listing.address.city}, {listing.address.state} {listing.address.zipCode}
              </p>
            </div>

            {listing.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{listing.description}</p>
              </div>
            )}

            {/* Property features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Square Feet</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Year Built</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact seller */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Seller</h3>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Make an Offer
              </button>
              <button className="btn btn-secondary w-full">
                Schedule Tour
              </button>
              <button className="btn btn-secondary w-full">
                Ask Question
              </button>
            </div>
          </div>

          {/* Seller info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium">
                  S
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Seller</p>
                <p className="text-sm text-gray-600">Property Owner</p>
              </div>
            </div>
          </div>

          {/* Cost calculator */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payment</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal & Interest</span>
                <span className="font-medium">$2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-medium">$417</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span className="font-medium">$125</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total Monthly</span>
                <span>$3,389</span>
              </div>
            </div>
            <button className="btn btn-secondary w-full mt-4">
              Calculate Mortgage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;

