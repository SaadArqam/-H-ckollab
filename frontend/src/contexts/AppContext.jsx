import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { mockAPI } from '../data/sampleData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API base URL - adjust based on your backend setup
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA !== 'false'; // Default to true for development

  // Generic API call helper
  const apiCall = async (endpoint, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if user is authenticated
          ...(user && { 'Authorization': `Bearer ${await user.getToken()}` }),
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Project-related functions
  const fetchProjects = async (filters = {}) => {
    try {
      let data;
      if (USE_MOCK_DATA) {
        data = await mockAPI.fetchProjects(filters);
      } else {
        const queryString = new URLSearchParams(filters).toString();
        data = await apiCall(`/projects${queryString ? `?${queryString}` : ''}`);
      }
      setProjects(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      return [];
    }
  };

  const createProject = async (projectData) => {
    try {
      let data;
      if (USE_MOCK_DATA) {
        data = await mockAPI.createProject(projectData);
      } else {
        data = await apiCall('/projects', {
          method: 'POST',
          body: JSON.stringify(projectData),
        });
      }
      setProjects(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Failed to create project:', err);
      throw err;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      let data;
      if (USE_MOCK_DATA) {
        // Mock update - find and update in the sample data
        data = { ...projectData, id: projectId };
      } else {
        data = await apiCall(`/projects/${projectId}`, {
          method: 'PUT',
          body: JSON.stringify(projectData),
        });
      }
      setProjects(prev => prev.map(p => p.id === projectId ? data : p));
      return data;
    } catch (err) {
      console.error('Failed to update project:', err);
      throw err;
    }
  };

  // Developer-related functions
  const fetchDevelopers = async (filters = {}) => {
    try {
      let data;
      if (USE_MOCK_DATA) {
        data = await mockAPI.fetchDevelopers(filters);
      } else {
        const queryString = new URLSearchParams(filters).toString();
        data = await apiCall(`/users${queryString ? `?${queryString}` : ''}`);
      }
      setDevelopers(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch developers:', err);
      return [];
    }
  };

  const fetchDeveloperById = async (id) => {
    try {
      if (USE_MOCK_DATA) {
        return await mockAPI.fetchDeveloperById(id);
      } else {
        return await apiCall(`/users/${id}`);
      }
    } catch (err) {
      console.error('Failed to fetch developer:', err);
      throw err;
    }
  };

  const fetchProjectById = async (id) => {
    try {
      if (USE_MOCK_DATA) {
        return await mockAPI.fetchProjectById(id);
      } else {
        return await apiCall(`/projects/${id}`);
      }
    } catch (err) {
      console.error('Failed to fetch project:', err);
      throw err;
    }
  };

  // Invitation functions
  const sendProjectInvitation = async (projectId, userId) => {
    try {
      if (USE_MOCK_DATA) {
        // Mock invitation
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: 'Invitation sent successfully' };
      } else {
        return await apiCall('/invitations', {
          method: 'POST',
          body: JSON.stringify({ projectId, userId }),
        });
      }
    } catch (err) {
      console.error('Failed to send invitation:', err);
      throw err;
    }
  };

  const respondToInvitation = async (invitationId, response) => {
    try {
      if (USE_MOCK_DATA) {
        // Mock invitation response
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true, message: 'Response recorded successfully' };
      } else {
        return await apiCall(`/invitations/${invitationId}/respond`, {
          method: 'POST',
          body: JSON.stringify({ response }),
        });
      }
    } catch (err) {
      console.error('Failed to respond to invitation:', err);
      throw err;
    }
  };

  // Initialize data when user loads (only if using real API)
  useEffect(() => {
    if (isLoaded && !USE_MOCK_DATA) {
      fetchProjects();
      fetchDevelopers();
    }
    // Intentionally excluding fetchProjects and fetchDevelopers from deps
    // as they are stable functions that don't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user, USE_MOCK_DATA]);

  const value = {
    // State
    user,
    isLoaded,
    projects,
    developers,
    loading,
    error,
    
    // Project functions
    fetchProjects,
    createProject,
    updateProject,
    fetchProjectById,
    
    // Developer functions
    fetchDevelopers,
    fetchDeveloperById,
    
    // Invitation functions
    sendProjectInvitation,
    respondToInvitation,
    
    // Utilities
    apiCall,
    setError,
    
    // Development helpers
    USE_MOCK_DATA,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
