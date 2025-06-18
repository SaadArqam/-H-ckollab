// Sample data for development and testing
// This would typically come from your backend API

export const sampleDevelopers = [];

export const sampleProjects = [];

// Helper function to simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions for development
export const mockAPI = {
  async fetchDevelopers(filters = {}) {
    await delay(500); // Simulate network delay
    
    // Return empty array - real data should come from backend
    return [];
  },

  async fetchDeveloperById(id) {
    await delay(300);
    
    // Return null for empty state
    return null;
  },

  async fetchProjects(filters = {}) {
    await delay(500);
    
    // Return empty array - real data should come from backend
    return [];
  },

  async fetchProjectById(id) {
    await delay(300);
    
    // Return null for empty state
    return null;
  },

  async createProject(projectData) {
    await delay(800);
    
    // In a real app, this would create the project in the backend
    console.log('Creating project:', projectData);
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      teamSize: 1,
      owner: {
        id: 'current-user',
        firstName: 'Current',
        lastName: 'User'
      },
      teamMembers: [{
        id: 'current-user',
        firstName: 'Current',
        lastName: 'User'
      }]
    };
    
    return newProject;
  },

  async updateProject(projectId, updates) {
    await delay(800);
    
    // In a real app, this would update the project in the backend
    console.log('Updating project:', projectId, updates);
    return { id: projectId, ...updates };
  },

  async deleteProject(projectId) {
    await delay(500);
    
    // In a real app, this would delete the project from the backend
    console.log('Deleting project:', projectId);
    return { success: true };
  },

  async joinProject(projectId, userId) {
    await delay(600);
    
    // In a real app, this would add the user to the project
    console.log('User joining project:', userId, projectId);
    return { success: true };
  },

  async leaveProject(projectId, userId) {
    await delay(600);
    
    // In a real app, this would remove the user from the project
    console.log('User leaving project:', userId, projectId);
    return { success: true };
  }
};
