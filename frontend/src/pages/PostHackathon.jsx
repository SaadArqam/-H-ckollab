import React, { useState } from "react";
import { useAuth } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const PostHackathon = () => {
  const navigate = useNavigate();
  const { profileData, loading: profileLoading } = useAppContext();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    theme: "",
    date: "",
    deadline: "",
    location: "",
    techStack: "",
    roles: "",
    maxTeamSize: "",
    collaborationType: "",
    organizer: "",
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
      theme: formData.theme,
      hackathonDate: formData.date ? new Date(formData.date) : null,
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      location: formData.location,
      organizer: formData.organizer,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      techStack: formData.techStack
        ? formData.techStack.split(",").map((t) => t.trim())
        : [],
      rolesNeeded: formData.roles
        ? formData.roles.split(",").map((r) => r.trim())
        : [],
      maxTeamSize: parseInt(formData.maxTeamSize) || 1,
      collaborationType: formData.collaborationType,
      visibility:
        formData.collaborationType === "Open to all"
          ? "Open to All"
          : "Invite Only",
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/hackathons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to create hackathon");

      toast.success("✅ Hackathon posted successfully!");
      navigate("/explore-hackathons");
    } catch (err) {
      toast.error("❌ Error posting hackathon: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const sectionClass =
    "space-y-6 bg-gray-950 p-6 rounded-xl border border-gray-800";

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-12 bg-black text-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <h1 className="text-4xl font-bold">Post a Hackathon</h1>
            <p className="text-gray-400 mt-1">
              Organize or start a hackathon collab team!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Info */}
            <div className={sectionClass}>
              <h2 className="text-2xl font-semibold mb-4">Hackathon Details</h2>

              <div>
                <label className="block mb-1">Hackathon Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. DevJam 2025"
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
                  placeholder="What is this hackathon about?"
                />
              </div>

              <div>
                <label className="block mb-1">Theme</label>
                <input
                  type="text"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="AI, Web3, Fintech etc."
                />
              </div>
            </div>

            {/* Schedule & Organizer */}
            <div className={sectionClass}>
              <h2 className="text-2xl font-semibold mb-4">
                Schedule & Organizer
              </h2>

              <div>
                <label className="block mb-1">Hackathon Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-1">Deadline to Join</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-1">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your name or organization"
                />
              </div>

              <div>
                <label className="block mb-1">Location (optional)</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Online / Delhi / Bangalore etc."
                />
              </div>
            </div>

            {/* Requirements */}
            <div className={sectionClass}>
              <h2 className="text-2xl font-semibold mb-4">Collaboration</h2>

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

              <div>
                <label className="block mb-1">Tech Stack</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. React, Firebase, GPT-4"
                />
              </div>

              <div>
                <label className="block mb-1">Roles Needed</label>
                <input
                  type="text"
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Frontend, Backend, Designer..."
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
                  placeholder="e.g. 5"
                />
              </div>

              <div>
                <label className="block mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Hackathon, AI, Web, Team, DevJam"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-lg hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Hackathon"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostHackathon;
