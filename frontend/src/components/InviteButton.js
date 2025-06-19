import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../contexts/AppContext';

const InviteButton = ({ userId, developerName }) => {
  const { user } = useUser();
  const { projects, sendProjectInvitation } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Filter projects where the current user is the owner
  const userOwnedProjects = projects.filter(project => 
    project.owner && project.owner.id === user?.id
  );

  const handleInvite = async () => {
    if (!selectedProject) return;

    setIsLoading(true);
    try {
      await sendProjectInvitation(selectedProject, userId);
      setMessage('Invitation sent successfully!');
      setTimeout(() => {
        setShowModal(false);
        setMessage('');
        setSelectedProject('');
      }, 2000);
    } catch (error) {
      setMessage('Failed to send invitation. Please try again.');
      console.error('Invitation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || userOwnedProjects.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Invite to Project
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Invite {developerName} to Project
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {message ? (
              <div className={`p-4 rounded-lg mb-4 ${
                message.includes('successfully') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select a project
                  </label>
                  <select
                    id="project-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Choose a project...</option>
                    {userOwnedProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProject && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {developerName} will receive an invitation to join this project. 
                      They can accept or decline the invitation.
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInvite}
                    disabled={!selectedProject || isLoading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send Invitation'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InviteButton;
