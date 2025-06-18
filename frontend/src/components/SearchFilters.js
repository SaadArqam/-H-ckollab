import React, { useState, useEffect } from 'react';

const SearchFilters = ({ onChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: '',
    techStack: [],
    experience: '',
    availability: '',
    location: '',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Common tech stacks with categories
  const techStackCategories = {
    'Frontend': ['React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'PHP', 'Laravel', 'Go', 'Rust'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Firebase'],
    'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
    'Other': ['GraphQL', 'REST APIs', 'Git', 'Machine Learning', 'AI', 'Blockchain']
  };

  const experienceLevels = [
    { value: 'junior', label: 'Junior (0-2 years)', icon: '🌱' },
    { value: 'mid', label: 'Mid-level (2-5 years)', icon: '🚀' },
    { value: 'senior', label: 'Senior (5+ years)', icon: '⭐' },
    { value: 'lead', label: 'Tech Lead/Architect', icon: '👑' }
  ];

  const availabilityOptions = [
    { value: 'full-time', label: 'Full-time', icon: '💼' },
    { value: 'part-time', label: 'Part-time', icon: '⏰' },
    { value: 'freelance', label: 'Freelance', icon: '✨' },
    { value: 'contract', label: 'Contract', icon: '📋' },
    { value: 'open', label: 'Open to opportunities', icon: '🎯' }
  ];

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechStackToggle = (tech) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      techStack: [],
      experience: '',
      availability: '',
      location: ''
    };
    setFilters(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    return count + (value ? 1 : 0);
  }, 0);

  return (
    <div className="card-modern p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark-900">Search Filters</h3>
            <p className="text-sm text-secondary-600">
              {activeFiltersCount > 0 
                ? `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active`
                : 'Find the perfect developers for your project'
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-icon md:hidden"
        >
          <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Search Bar */}
        <div>
          <label htmlFor="search" className="block text-sm font-semibold text-dark-800 mb-3">
            Search Developers
          </label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="search"
              type="text"
              value={filters.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              placeholder="Search by name, bio, or skills..."
              className="input-search"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Experience Level */}
          <div>
            <label className="block text-sm font-semibold text-dark-800 mb-3">
              Experience Level
            </label>
            <div className="space-y-2">
              {experienceLevels.map(level => (
                <label
                  key={level.value}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    filters.experience === level.value
                      ? 'bg-primary-50 border-primary-300 text-primary-700 shadow-soft'
                      : 'bg-white border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={level.value}
                    checked={filters.experience === level.value}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-lg mr-3">{level.icon}</span>
                  <span className="text-sm font-medium">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold text-dark-800 mb-3">
              Availability
            </label>
            <div className="space-y-2">
              {availabilityOptions.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    filters.availability === option.value
                      ? 'bg-accent-50 border-accent-300 text-accent-700 shadow-soft'
                      : 'bg-white border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={filters.availability === option.value}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-lg mr-3">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-dark-800 mb-3">
              Location
            </label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                id="location"
                type="text"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country, or Remote"
                className="input-modern pl-12"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-semibold text-dark-800 mb-3">
            Tech Stack
            {filters.techStack.length > 0 && (
              <span className="ml-2 badge bg-primary-100 text-primary-800">
                {filters.techStack.length} selected
              </span>
            )}
          </label>
          
          <div className="space-y-4">
            {Object.entries(techStackCategories).map(([category, techs]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-secondary-600 uppercase tracking-wide mb-2 flex items-center">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mr-2"></div>
                  {category}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {techs.map(tech => (
                    <label
                      key={tech}
                      className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        filters.techStack.includes(tech)
                          ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-300 text-primary-700 shadow-soft'
                          : 'bg-white border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={filters.techStack.includes(tech)}
                        onChange={() => handleTechStackToggle(tech)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center transition-all ${
                        filters.techStack.includes(tech)
                          ? 'bg-primary-600 border-primary-600 scale-110'
                          : 'border-secondary-300'
                      }`}>
                        {filters.techStack.includes(tech) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-medium truncate">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-secondary-200">
          <div className="text-sm text-secondary-600">
            {activeFiltersCount > 0 ? (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>{activeFiltersCount}</strong> filter{activeFiltersCount > 1 ? 's' : ''} applied
                </span>
              </div>
            ) : (
              <span>No filters applied</span>
            )}
          </div>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="btn-ghost text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
