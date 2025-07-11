import React, { useState } from "react";
import { useAuth } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostProjectForm = () => {
  const navigate = useNavigate();
  const { profileData, loading: profileLoading } = useAppContext();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    collaborationType: "",
    techStack: "",
    customTech: "",
    difficulty: "",
    roles: "",
    customRoles: "",
    maxTeamSize: "",
    deadline: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (profileLoading || !profileData?.id) {
      toast.error("User profile is still loading. Please wait a moment.");
      setLoading(false);
      return;
    }

    let token;
    try {
      token = await user.getIdToken();
    } catch (err) {
      toast.error("Authentication error. Please sign in again.");
      setLoading(false);
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      techStack: formData.techStack
        ? formData.techStack.split(",").map((t) => t.trim())
        : [],
      maxTeamSize: parseInt(formData.maxTeamSize) || 1,
      status: formData.status || "Open",
      difficulty: formData.difficulty || "",
      collaborationType: formData.collaborationType,
      rolesNeeded: formData.roles
        ? formData.roles.split(",").map((r) => r.trim())
        : [],
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      visibility:
        formData.collaborationType === "Open to all"
          ? "Open to All"
          : "Invite Only",
      // creatorId REMOVED
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create project");

      toast.success("✅ Project created successfully!");
      if (formData.collaborationType === "Open to all") {
        navigate("/explore-projects");
      } else {
        navigate("/my-projects");
      }
    } catch (err) {
      toast.error("❌ Error creating project: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const sectionClass =
    "space-y-6 bg-gray-950 p-6 rounded-xl border border-gray-800";

  return (
    <div className="min-h-screen px-6 py-12 bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-bold">Post a Project</h1>
          <p className="text-gray-400 mt-1">
            Kickstart your idea and invite collaborators!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
            <div>
              <label className="block mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. CodeMatch"
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                placeholder="Describe the problem and your solution..."
              />
            </div>
          </div>

          {/* Collaboration */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">
              Collaboration Details
            </h2>

            <div>
              <label className="block mb-1">Project Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Ideation</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Collaboration Type</label>
              <select
                name="collaborationType"
                value={formData.collaborationType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Open to all</option>
                <option>Invite only</option>
              </select>
            </div>
          </div>

          {/* Tech Requirements */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">
              Technical Requirements
            </h2>

            <div>
              <label className="block mb-1">Tech Stack Needed</label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                className={inputClass}
                placeholder="React, Node.js..."
              />
            </div>

            <div>
              <label className="block mb-1">Custom Tech Input</label>
              <input
                type="text"
                name="customTech"
                value={formData.customTech}
                onChange={handleChange}
                className={inputClass}
                placeholder="Any other tools?"
              />
            </div>

            <div>
              <label className="block mb-1">Difficulty Level</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* Team Requirements */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Team Requirements</h2>

            <div>
              <label className="block mb-1">Roles Open</label>
              <input
                type="text"
                name="roles"
                value={formData.roles}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Frontend Developer, Designer"
              />
            </div>

            <div>
              <label className="block mb-1">Add Custom Role</label>
              <input
                type="text"
                name="customRoles"
                value={formData.customRoles}
                onChange={handleChange}
                className={inputClass}
                placeholder="Any other role?"
              />
            </div>

            <div>
              <label className="block mb-1">Maximum Team Size</label>
              <input
                type="number"
                name="maxTeamSize"
                value={formData.maxTeamSize}
                onChange={handleChange}
                className={inputClass}
                placeholder="5"
              />
            </div>
          </div>

          {/* Additional */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>

            <div>
              <label className="block mb-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-1">Project Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className={inputClass}
                placeholder="Hackathon, AI, WebApp..."
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-lg hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostProjectForm;
