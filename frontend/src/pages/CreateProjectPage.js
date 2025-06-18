import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../contexts/AppContext';
import ProjectForm from '../components/ProjectForm';
import ProtectedRoute from '../components/ProtectedRoute';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { createProject } = useApp();

  const handleProjectCreate = async (projectData) => {
    try {
      const newProject = await createProject({
        ...projectData,
        ownerId: user.id
      });
      
      // Redirect to the newly created project
      navigate(`/projects/${newProject.id}`);
      return newProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Project</h1>
          <p className="text-lg text-gray-600">
            Start your next big idea and find the perfect team to bring it to life.
          </p>
        </div>

        {/* Project Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <ProjectForm onSubmit={handleProjectCreate} />
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 Tips for a Successful Project
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Write a clear, compelling description that explains what you're building and why</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be specific about the technologies and skills you need</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Set realistic timelines and expectations for team members</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include links to mockups, repositories, or design documents if available</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be clear about time commitment and availability requirements</span>
            </li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateProjectPage;
