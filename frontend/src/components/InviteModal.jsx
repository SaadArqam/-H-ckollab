// InviteModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { toast } from "react-toastify";

export default function InviteModal({ isOpen, onClose, selectedUserId, receiverName }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingProjects, setFetchingProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setFetchingProjects(true);
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/mine`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(res.data || []);
      } catch (err) {
        toast.error("Failed to fetch your projects.");
        setProjects([]);
      } finally {
        setFetchingProjects(false);
      }
    };

    if (isOpen && user) fetchProjects();
  }, [isOpen, user]);

  const handleSendInvite = async () => {
    if (!selectedProjectId || !role) {
      toast.error("Please select a project and enter a role.");
      return;
    }
    setLoading(true);
    try {
      const token = await user.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/invites`,
        {
          projectId: selectedProjectId,
          receiverId: selectedUserId, // ✅ This is the DB user id!
          role,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Invite sent successfully!");
      onClose();
    } catch (err) {
      if (err.response?.data?.error?.includes("unique")) {
        toast.error("You have already invited this user to this project.");
      } else {
        toast.error("❌ Failed to send invite.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Invite <span className="text-blue-600">{receiverName}</span>
        </h2>
        {fetchingProjects ? (
          <div className="text-center text-gray-500 py-6">Loading your projects...</div>
        ) : (
          <>
            {/* Select Project */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose Project --</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            {/* Enter Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Invite"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}