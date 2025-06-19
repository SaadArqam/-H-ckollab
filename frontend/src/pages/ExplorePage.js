import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import SearchFilters from '../components/SearchFilters';
import DeveloperList from '../components/DeveloperList';

const ExplorePage = () => {
  const { fetchDevelopers, loading, error } = useApp();
  const [filters, setFilters] = useState({});
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);

  useEffect(() => {
    const loadDevelopers = async () => {
      try {
        const data = await fetchDevelopers(filters);
        setFilteredDevelopers(data || []);
      } catch (err) {
        console.error('Failed to load developers:', err);
      }
    };

    loadDevelopers();
  }, [filters, fetchDevelopers]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Developers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover talented developers ready to collaborate on your next project. 
          Filter by skills, experience, and availability to find the perfect match.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filter Developers</h2>
          {Object.keys(filters).length > 0 && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
        <SearchFilters onChange={handleFilterChange} initialFilters={filters} />
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredDevelopers.length} Developer{filteredDevelopers.length !== 1 ? 's' : ''} Found
            </h2>
            {Object.keys(filters).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => 
                  value && (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {key}: {Array.isArray(value) ? value.join(', ') : value}
                      <button
                        onClick={() => handleFilterChange({ ...filters, [key]: '' })}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading developers</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Developers List */}
        {!loading && !error && (
          <DeveloperList developers={filteredDevelopers} />
        )}

        {/* Empty State */}
        {!loading && !error && filteredDevelopers.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No developers found</h3>
            <p className="text-gray-600 mb-6">
              {Object.keys(filters).length > 0
                ? 'Try adjusting your filters to see more results.'
                : 'No developers have joined the platform yet.'}
            </p>
            {Object.keys(filters).length > 0 && (
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
