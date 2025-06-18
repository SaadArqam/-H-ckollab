import React, { useState } from 'react';
import SkillList from './SkillList';

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    tags: [],
    maxTeamSize: 5,
    timeline: '',
    status: 'planning',
    isLookingForMembers: true,
    repositoryUrl: '',
    designUrl: '',
    requirements: '',
    ...initialData
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Available tech stacks (same as in SearchFilters)
  const availableTechStacks = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
    'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'PHP', 'Laravel',
    'C#', '.NET', 'Ruby', 'Rails', 'Go', 'Rust', 'Swift', 'Kotlin',
    'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'SQL', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Git', 'GraphQL', 'REST APIs', 'Machine Learning', 'AI', 'Blockchain'
  ];

  const projectStatuses = [
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTechStackToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange('tags', tagsArray);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (formData.description.trim().length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }

    if (formData.techStack.length === 0) {
      newErrors.techStack = 'Please select at least one technology';
    }

    if (formData.maxTeamSize < 1 || formData.maxTeamSize > 20) {
      newErrors.maxTeamSize = 'Team size should be between 1 and 20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to create project. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Project Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter your project title..."
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your project, its goals, and what you hope to achieve..."
          rows={6}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.description ? (
            <p className="text-sm text-red-600">{errors.description}</p>
          ) : (
            <p className="text-sm text-gray-500">
              {formData.description.length}/500 characters
            </p>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Technology Stack * ({formData.techStack.length} selected)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {availableTechStacks.map(tech => (
            <label
              key={tech}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.techStack.includes(tech)
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.techStack.includes(tech)}
                onChange={() => handleTechStackToggle(tech)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                  formData.techStack.includes(tech)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300'
                }`}>
                  {formData.techStack.includes(tech) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{tech}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.techStack && <p className="mt-2 text-sm text-red-600">{errors.techStack}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Max Team Size */}
        <div>
          <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Team Size
          </label>
          <input
            id="maxTeamSize"
            type="number"
            min="1"
            max="20"
            value={formData.maxTeamSize}
            onChange={(e) => handleInputChange('maxTeamSize', parseInt(e.target.value))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.maxTeamSize ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.maxTeamSize && <p className="mt-1 text-sm text-red-600">{errors.maxTeamSize}</p>}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Project Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {projectStatuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
          Expected Timeline
        </label>
        <input
          id="timeline"
          type="text"
          value={formData.timeline}
          onChange={(e) => handleInputChange('timeline', e.target.value)}
          placeholder="e.g., 3 months, 6 weeks, ongoing..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          value={formData.tags.join(', ')}
          onChange={handleTagsChange}
          placeholder="e.g., web development, mobile app, open source..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {formData.tags.length > 0 && (
          <div className="mt-2">
            <SkillList skills={formData.tags} size="sm" />
          </div>
        )}
      </div>

      {/* Repository URL */}
      <div>
        <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Repository URL (optional)
        </label>
        <input
          id="repositoryUrl"
          type="url"
          value={formData.repositoryUrl}
          onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
          placeholder="https://github.com/username/repository"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Design URL */}
      <div>
        <label htmlFor="designUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Design/Mockup URL (optional)
        </label>
        <input
          id="designUrl"
          type="url"
          value={formData.designUrl}
          onChange={(e) => handleInputChange('designUrl', e.target.value)}
          placeholder="https://figma.com/... or other design tool link"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Requirements */}
      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Requirements
        </label>
        <textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => handleInputChange('requirements', e.target.value)}
          placeholder="Specific skills needed, time commitment, experience level..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Looking for Members */}
      <div className="flex items-center">
        <input
          id="isLookingForMembers"
          type="checkbox"
          checked={formData.isLookingForMembers}
          onChange={(e) => handleInputChange('isLookingForMembers', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isLookingForMembers" className="ml-2 block text-sm text-gray-900">
          I'm actively looking for team members
        </label>
      </div>

      {/* Submit Button */}
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
