import React, { useState, useEffect } from "react";
import { Edit, Eye, Users, X } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/UserContext"; // <-- Import Firebase Auth context

const borderColors = [
  "hover:border-purple-500/30",
  "hover:border-blue-500/30",
  "hover:border-green-500/30",
  "hover:border-yellow-500/30",
  "hover:border-gray-500/30",
  "hover:border-red-500/30",
];

const inviteStatusColors = {
  Accepted: "bg-green-700/30 text-green-400",
  Pending: "bg-yellow-700/30 text-yellow-400",
  Declined: "bg-red-700/30 text-red-400",
  Expired: "bg-gray-600/30 text-gray-300",
};

export default function MyProjectsPage() {
  const { profileData } = useAppContext();
  const { user } = useAuth(); // <-- Get Firebase user

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewProject, setViewProject] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [editInviteStatus, setEditInviteStatus] = useState("");
  // Add local state for editable fields
  const [editFields, setEditFields] = useState({
    title: "",
    description: "",
    techStack: "",
    rolesNeeded: "",
    maxTeamSize: 1,
    deadline: ""
  });
  const [inviteProject, setInviteProject] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [projectInvites, setProjectInvites] = useState([]);
  const [invitesLoading, setInvitesLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Fetched projects:", data);
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleView = async (project) => {
    setViewProject(project);
    setInvitesLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/invites/project/${project.id}`);
      setProjectInvites(res.data || []);
    } catch {
      setProjectInvites([]);
    } finally {
      setInvitesLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setEditInviteStatus(project.inviteStatus || "Pending");
    setEditFields({
      title: project.title || "",
      description: project.description || "",
      techStack: (project.techStack || []).join(", "),
      rolesNeeded: (project.rolesNeeded || []).join(", "),
      maxTeamSize: project.maxTeamSize || 1,
      deadline: project.deadline ? project.deadline.split("T")[0] : ""
    });
  };

  const handleFieldChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  const closeModal = () => {
    setViewProject(null);
    setEditProject(null);
    setInviteProject(null);
    setSelectedUsers([]);
  };

  const handleInviteStatusChange = (e) => setEditInviteStatus(e.target.value);

  const handleSave = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${editProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editFields.title,
          description: editFields.description,
          techStack: editFields.techStack.split(",").map(s => s.trim()).filter(Boolean),
          rolesNeeded: editFields.rolesNeeded.split(",").map(s => s.trim()).filter(Boolean),
          maxTeamSize: Number(editFields.maxTeamSize),
          deadline: editFields.deadline ? new Date(editFields.deadline) : null,
          inviteStatus: editInviteStatus
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      toast.success("Project updated successfully!");
      closeModal();
    } catch (err) {
      console.error("Failed to update project:", err);
      toast.error("Project update failed!");
    }
  };

  const openInviteModal = async (project) => {
    setInviteProject(project);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`);
      const users = await res.json();
      setAllUsers(users.filter((u) => u.clerkId !== profileData?.clerkId));
    } catch {
      setAllUsers([]);
    }
  };

  const sendInvites = async () => {
    if (!inviteProject || selectedUsers.length === 0) return;
    try {
      const userIds = allUsers
        .filter((u) => selectedUsers.includes(u.clerkId))
        .map((u) => u.id);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${inviteProject.id}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds }),
      });

      if (!res.ok) throw new Error("Failed to send invites");

      toast.success("Invitations sent!");
      closeModal();
    } catch (err) {
      toast.error("Failed to send invites");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pb-20">
      <div className="text-center pt-20 pb-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
          My{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          View and manage your hackathon and collaboration projects. Track
          status, invites, and more.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-xl">
          Loading projects...
        </div>
      ) : Array.isArray(projects) && projects.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          No projects posted yet.
        </div>
      ) : Array.isArray(projects) ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-xl p-5 shadow-md transition-all group relative overflow-hidden ${
                borderColors[idx % borderColors.length]
              }`}
              style={{ minHeight: '220px' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-blue-400" size={28} />
                <h2 className="text-3xl font-bold group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-6 items-center mb-6">
                <div>
                  <span className="text-gray-400 text-sm">Status:</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === "Completed"
                        ? "bg-green-700/30 text-green-400"
                        : "bg-blue-700/30 text-blue-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Invite Status:</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      inviteStatusColors[project.inviteStatus] ||
                      "bg-gray-700/30 text-gray-300"
                    }`}
                  >
                    {project.inviteStatus || "Pending"}
                  </span>
                </div>
                {/* Team size info */}
                <div>
                  <span className="text-gray-400 text-sm">Team:</span>
                  <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-gray-800/60 text-white">
                    {(project.collaborators?.length || 0) + 1}/{project.maxTeamSize} members joined
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleView(project)}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors text-lg shadow"
                >
                  <Eye size={20} /> View
                </button>
                <button
                  onClick={() => handleEdit(project)}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl border border-gray-600 text-white font-semibold hover:border-blue-500 hover:text-blue-400 transition-colors text-lg"
                >
                  <Edit size={20} /> Edit
                </button>
                {/* Archive button if team is full and not already archived */}
                {project.collaborators &&
                  project.collaborators.length + 1 >= project.maxTeamSize &&
                  project.status !== "Archived" && (
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${project.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "Archived" }),
                          });
                          if (!res.ok) throw new Error("Failed to archive project");
                          setProjects((prev) =>
                            prev.map((p) =>
                              p.id === project.id ? { ...p, status: "Archived" } : p
                            )
                          );
                          toast.success("Project archived!");
                        } catch (err) {
                          toast.error("Failed to archive project");
                        }
                      }}
                      className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 border border-gray-500"
                    >
                      Archive Project
                    </button>
                  )}
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-2 group-hover:ring-blue-500/40 transition-all"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-red-400 text-xl">
          Failed to load projects.
        </div>
      )}

      {/* View Modal */}
      {viewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-10 max-w-2xl w-full shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
            >
              <X size={28} />
            </button>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              {viewProject.title}
            </h2>
            <div className="space-y-3 text-lg text-gray-300">
              <div>
                <strong>Description:</strong> {viewProject.description}
              </div>
              <div>
                <strong>Status:</strong> {viewProject.status}
              </div>
              <div>
                <strong>Invite Status:</strong>{" "}
                {viewProject.inviteStatus}
              </div>
              {/* Pending Invites Section */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Pending Invites</h3>
                {invitesLoading ? (
                  <div className="text-gray-400">Loading invites...</div>
                ) : projectInvites.length === 0 ? (
                  <div className="text-gray-400">No pending invites for this project.</div>
                ) : (
                  <div className="space-y-2">
                    {projectInvites.map((invite) => (
                      <div key={invite.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2">
                        <div>
                          <span className="font-semibold text-white">{invite.receiver?.name || invite.receiver?.email}</span>
                          <span className="ml-2 text-gray-400 text-sm">({invite.role})</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invite.status === "accepted"
                            ? "bg-green-700/30 text-green-400"
                            : invite.status === "declined"
                            ? "bg-red-700/30 text-red-400"
                            : "bg-yellow-700/30 text-yellow-400"
                        }`}>
                          {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Edit Project
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-lg text-gray-400">Title</label>
              <input
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                value={editFields.title}
                onChange={e => handleFieldChange("title", e.target.value)}
              />
              <label className="block mb-2 text-lg text-gray-400">Description</label>
              <textarea
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                value={editFields.description}
                onChange={e => handleFieldChange("description", e.target.value)}
              />
              <label className="block mb-2 text-lg text-gray-400">Tech Stack (comma separated)</label>
              <input
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                value={editFields.techStack}
                onChange={e => handleFieldChange("techStack", e.target.value)}
              />
              <label className="block mb-2 text-lg text-gray-400">Roles Needed (comma separated)</label>
              <input
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                value={editFields.rolesNeeded}
                onChange={e => handleFieldChange("rolesNeeded", e.target.value)}
              />
              <label className="block mb-2 text-lg text-gray-400">Max Team Size</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                value={editFields.maxTeamSize}
                onChange={e => handleFieldChange("maxTeamSize", e.target.value)}
                min={1}
              />
              <label className="block mb-2 text-lg text-gray-400">Deadline</label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                value={editFields.deadline}
                onChange={e => handleFieldChange("deadline", e.target.value)}
              />
              <label className="block mb-2 text-lg text-gray-400">Invite Status</label>
              <select
                value={editInviteStatus}
                onChange={handleInviteStatusChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4"
              >
                <option>Pending</option>
                <option>Accepted</option>
                <option>Declined</option>
                <option>Expired</option>
              </select>
            </div>
            <button
              onClick={handleSave}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-base hover:opacity-90 mb-2"
            >
              Save
            </button>
            {/* Manual Archive/Unarchive Toggle */}
            <button
              onClick={async () => {
                try {
                  const status = editProject.status === "Archived" ? "Open" : "Archived";
                  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${editProject.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                  });
                  if (!res.ok) throw new Error();
                  setProjects((prev) =>
                    prev.map((p) => (p.id === editProject.id ? { ...p, status } : p))
                  );
                  toast.success(`Project ${status === "Archived" ? "archived" : "unarchived"}!`);
                  closeModal();
                } catch {
                  toast.error("Failed to change project status");
                }
              }}
              className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 border border-gray-500 mb-2"
            >
              {editProject.status === "Archived" ? "Unarchive" : "Archive"}
            </button>
            {/* Delete Project Button */}
            <button
              onClick={async () => {
                if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
                try {
                  const token = await user.getIdToken();
                  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${editProject.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  if (!res.ok) throw new Error();
                  setProjects((prev) => prev.filter((p) => p.id !== editProject.id));
                  toast.success("Project deleted!");
                  closeModal();
                } catch {
                  toast.error("Failed to delete project");
                }
              }}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 border border-red-700"
            >
              Delete Project
            </button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {inviteProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white p-8 rounded-xl max-w-md w-full text-black">
            <h2 className="text-2xl font-bold mb-4">Invite Collaborators</h2>
            <label className="block mb-2">Select users to invite:</label>
            <select
              multiple
              value={selectedUsers}
              onChange={(e) =>
                setSelectedUsers(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="w-full border rounded p-2"
            >
              {allUsers.map((u) => (
                <option key={u.id} value={u.clerkId}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-4">
              <button
                onClick={sendInvites}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send Invites
              </button>
              <button
                onClick={() => setInviteProject(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}