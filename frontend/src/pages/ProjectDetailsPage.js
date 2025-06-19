import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../contexts/AppContext';
import SkillList from '../components/SkillList';
import DeveloperCard from '../components/DeveloperCard';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const { fetchProjectById, loading, error } = useApp();
  const [project, setProject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await fetchProjectById(id);
        setProject(projectData);
        setIsOwner(user && user.id === projectData.owner?.id);
        
        // Check if user has already applied (this would come from API)
        setHasApplied(projectData.applicants?.some(applicant => applicant.id === user?.id));
      } catch (err) {
        console.error('Failed to load project:', err);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id, user, fetchProjectById]);

  const handleApply = async () => {
    // This would typically make an API call to apply to the project
    console.log('Applying to project:', project.title);
    setHasApplied(true);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-red-400 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading project</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2v-6a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Project not found</h3>
        <p className="text-gray-600">The requested project could not be found.</p>
      </div>
    );
  }

  const {
    title,
    description,
    techStack = [],
    tags = [],
    status,
    maxTeamSize,
    timeline,
    repositoryUrl,
    designUrl,
    requirements,
    isLookingForMembers,
    createdAt,
    owner,
    teamMembers = [],
    applicants = []
  } = project;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                {isOwner && (
                  <Link
                    to={`/projects/${id}/edit`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Edit Project
                  </Link>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                {status && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                    {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                )}
                {isLookingForMembers && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                    Hiring
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {teamMembers.length}{maxTeamSize ? `/${maxTeamSize}` : ''} members
                </span>
                
                {timeline && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeline}
                  </span>
                )}
                
                {createdAt && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Created {formatDate(createdAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwner && user && isLookingForMembers && (
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <button
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={`w-full lg:w-auto px-6 py-3 rounded-lg font-medium transition-colors ${
                    hasApplied
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {hasApplied ? 'Application Sent' : 'Apply to Join'}
                </button>
              </div>
            )}
          </div>

          {/* Owner Info */}
          {owner && (
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <img
                src={owner.imageUrl}
                alt={`${owner.firstName} ${owner.lastName}`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Project Owner: {owner.firstName} {owner.lastName}
                </p>
                <Link
                  to={`/profile/${owner.id}`}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
          </div>

          {/* Requirements */}
          {requirements && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{requirements}</p>
            </div>
          )}

          {/* Team Members */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Team Members ({teamMembers.length})
            </h2>
            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <DeveloperCard key={member.id} developer={member} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No team members yet. Be the first to join!</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tech Stack</h3>
              <SkillList skills={techStack} size="md" />
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(repositoryUrl || designUrl) && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
              <div className="space-y-3">
                {repositoryUrl && (
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>Repository</span>
                  </a>
                )}
                {designUrl && (
                  <a
                    href={designUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v1m0 0h6m-7 0V3a2 2 0 012-2h6a2 2 0 012 2v15a4 4 0 01-4 4H9a4 4 0 01-4-4v-1m6-4h-1v4h1m-1-4h6l-7-7 7 7" />
                    </svg>
                    <span>Design/Mockups</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Team Size</span>
                <span className="font-medium">{teamMembers.length}{maxTeamSize ? `/${maxTeamSize}` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-medium">{applicants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {status?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
