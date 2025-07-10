import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext"; // or wherever your Firebase auth context is

export default function InviteModal({ isOpen, onClose, receiverId, receiverName }) {
  const { user } = useAuth();
  const senderId = user?.uid; // For Firebase Auth

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`/api/projects/mine?userId=${senderId}`);
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    if (isOpen && senderId) {
      fetchProjects();
    }
  }, [isOpen, senderId]);

  const handleSendInvite = async () => {
    if (!selectedProjectId || !role) {
      setMessage("Please select a project and enter a role.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/invites", {
        senderId,
        receiverId,
        projectId: selectedProjectId,
        role,
      });

      setMessage("✅ Invite sent successfully!");
    } catch (err) {
      console.error("Error sending invite:", err);
      setMessage("❌ Failed to send invite.");
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

        {/* Select Project */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
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
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Feedback message */}
        {message && <p className="text-sm text-center mb-3">{message}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300"
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
      </div>
    </div>
  );
}