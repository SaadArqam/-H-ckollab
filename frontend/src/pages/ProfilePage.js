import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../contexts/AppContext';
import ProfileDetails from '../components/ProfileDetails';
import ProjectList from '../components/ProjectList';
import InviteButton from '../components/InviteButton';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const { fetchDeveloperById, loading, error } = useApp();
  const [profile, setProfile] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchDeveloperById(id);
        setProfile(profileData);
        setIsOwnProfile(user && user.id === id);
        
        // Also fetch user's projects
        // This would typically be a separate API call
        if (profileData.projects) {
          setUserProjects(profileData.projects);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    if (id) {
      loadProfile();
    }
  }, [id, user, fetchDeveloperById]);

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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading profile</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Profile not found</h3>
        <p className="text-gray-600">The requested user profile could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <ProfileDetails profile={profile} isOwnProfile={isOwnProfile} />
        
        {/* Action buttons for non-own profiles */}
        {!isOwnProfile && (
          <div className="px-6 pb-6">
            <div className="flex space-x-4">
              <InviteButton userId={id} developerName={`${profile.firstName} ${profile.lastName}`} />
              <button
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => {
                  // This would typically open a messaging modal
                  console.log('Send message to', profile.firstName);
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isOwnProfile ? 'My Projects' : `${profile.firstName}'s Projects`}
          </h2>
        </div>
        
        <div className="p-6">
          <ProjectList projects={userProjects} isOwnProfile={isOwnProfile} />
        </div>
      </div>

      {/* Collaborations Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isOwnProfile ? 'My Collaborations' : 'Collaborations'}
          </h2>
        </div>
        
        <div className="p-6">
          {/* This would show projects the user is collaborating on but doesn't own */}
          <div className="text-center py-8 text-gray-500">
            <p>Collaboration history coming soon...</p>
          </div>
        </div>
      </div>

      {/* Skills & Endorsements Section (if own profile) */}
      {isOwnProfile && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Skills & Endorsements</h2>
          </div>
          
          <div className="p-6">
            <div className="text-center py-8 text-gray-500">
              <p>Skills endorsement system coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
