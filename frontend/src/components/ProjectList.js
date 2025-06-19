import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, isOwnProfile }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isOwnProfile ? 'No projects yet' : 'No projects found'}
        </h3>
        <p className="text-gray-600 mb-6">
          {isOwnProfile 
            ? 'Ready to start your first project? Create one now!'
            : 'This developer hasn\'t created any projects yet.'
          }
        </p>
        {isOwnProfile && (
          <Link 
            to="/create-project" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Your First Project
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Show more link if there are many projects */}
      {projects.length > 6 && (
        <div className="text-center pt-4">
          <Link 
            to={isOwnProfile ? "/my-projects" : `/projects?owner=${projects[0]?.owner?.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Projects ({projects.length}) →
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
