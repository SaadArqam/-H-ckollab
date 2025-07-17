// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/UserContext";
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";

export default function Profile() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { profileData, loading, profileNotFound } = useAppContext();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/sign-in");
    } else if (!loading && (profileNotFound || !profileData)) {
      navigate("/create-profile");
    }
  }, [isSignedIn, profileData, loading, profileNotFound, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null; // Will redirect to create-profile
  }

  // Debug logging
  console.log('Profile data:', profileData);
  console.log('Featured projects:', profileData.featuredProjects);

  // Helper function to split skills into array
  const splitSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
  };

  // Helper function to get all skills as array
  const getAllSkills = () => {
    // Check if skills are in the new format (from backend)
    if (profileData.skills && Array.isArray(profileData.skills)) {
      return profileData.skills.map(skillRelation => skillRelation.skill.name);
    }
    
    // Fallback to old format (from form fields)
    const skills = [
      ...splitSkills(profileData.frontendSkills),
      ...splitSkills(profileData.backendSkills),
      ...splitSkills(profileData.dbSkills),
      ...splitSkills(profileData.customSkills),
    ];
    return [...new Set(skills)]; // Remove duplicates
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
          <p className="text-gray-400 text-lg">{profileData.bio}</p>
          {profileData.availability && (
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium mt-3 ${
                profileData.availability === "Available for work"
                  ? "bg-green-900 text-green-300"
                  : profileData.availability === "Open to Collaborate"
                  ? "bg-blue-900 text-blue-300"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {profileData.availability}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info & Skills */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Information */}
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Academic Info</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Year:</span>
                  <p className="text-white">{profileData.academicYear}</p>
                </div>
                <div>
                  <span className="text-gray-400">Branch:</span>
                  <p className="text-white">{profileData.branch}</p>
                </div>
              </div>
            </div>

            {/* Tech Stacks */}
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Tech Stacks</h2>
              <div className="flex flex-wrap gap-2">
                {getAllSkills().map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Concepts & Interests */}
            {profileData.interests && (
              <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
                <h2 className="text-2xl font-semibold mb-4">
                  Concepts & Interests
                </h2>
                <p className="text-gray-300">{profileData.interests}</p>
              </div>
            )}

            {/* Social Links */}
            {(profileData.githubUrl || profileData.portfolioUrl || profileData.discordOrContact) && (
              <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
                <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
                <div className="flex flex-col gap-3">
                  {profileData.githubUrl && (
                    <a
                      href={profileData.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FaGithub className="text-xl" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {profileData.portfolioUrl && profileData.portfolioUrl.toLowerCase().includes("linkedin") && (
                    <a
                      href={profileData.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaLinkedin className="text-xl" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profileData.portfolioUrl && !profileData.portfolioUrl.toLowerCase().includes("linkedin") && (
                    <a
                      href={profileData.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FaLink className="text-xl" />
                      <span>Portfolio</span>
                    </a>
                  )}
                  {profileData.discordOrContact && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg">
                      <span className="font-semibold">Contact:</span>
                      {profileData.discordOrContact.startsWith("http") ? (
                        <a href={profileData.discordOrContact} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{profileData.discordOrContact}</a>
                      ) : (
                        <span className="break-all">{profileData.discordOrContact}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Featured Projects */}
          <div className="lg:col-span-2">
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
              {profileData.featuredProjects && Array.isArray(profileData.featuredProjects) && profileData.featuredProjects.length > 0 ? (
                <div className="space-y-6">
                  {profileData.featuredProjects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 p-6 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.tech && (
                        <div className="mb-3">
                          <span className="text-gray-400 text-sm">
                            Tech Used:
                          </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {splitSkills(project.tech).map(
                              (tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No projects added yet. Create your first project!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/create-profile")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
