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
    hackathonLink: "",
    date: "",
    deadline: "",
    duration: "",
    registrationFee: "Free",
    feeAmount: "",
    eventMode: "",
    rounds: "",
    location: "",
    organizer: "",
    tags: "",
    isLookingForTeam: false,
    techStack: "",
    roles: "",
    maxTeamSize: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Required field validation
    if (!formData.title || !formData.description || !formData.hackathonLink || !formData.eventMode || !formData.techStack || !formData.roles || !formData.maxTeamSize) {
      toast.error("Please fill all required fields: Title, Description, URL, Mode, Team details.");
      setLoading(false);
      return;
    }
    if (formData.registrationFee === "Paid" && !formData.feeAmount) {
      toast.error("Please enter the fee amount for paid registration.");
      setLoading(false);
      return;
    }

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
      hackathonLink: formData.hackathonLink,
      hackathonDate: formData.date ? new Date(formData.date) : null,
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      duration: formData.duration,
      registrationFee: formData.registrationFee === "Paid" ? formData.feeAmount : "Free",
      eventMode: formData.eventMode,
      rounds: formData.rounds,
      location: formData.location,
      organizer: formData.organizer,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      isLookingForTeam: formData.isLookingForTeam,
      techStack: formData.techStack
        ? formData.techStack.split(",").map((t) => t.trim())
        : [],
      rolesNeeded: formData.roles
        ? formData.roles.split(",").map((r) => r.trim())
        : [],
      maxTeamSize: parseInt(formData.maxTeamSize) || 1,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/hackathons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

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
              Share your hackathon or build a team for one!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className={sectionClass}>
              <h2 className="text-2xl font-semibold mb-4">Hackathon Details</h2>

              <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="Hackathon Title" />
              <textarea name="description" value={formData.description} onChange={handleChange} className={inputClass} placeholder="Hackathon Description" rows={3} />
              <input type="text" name="theme" value={formData.theme} onChange={handleChange} className={inputClass} placeholder="Theme (e.g. AI, Web3)" />
              <input type="url" name="hackathonLink" value={formData.hackathonLink} onChange={handleChange} className={inputClass} placeholder="Hackathon Website URL" required />
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className={inputClass} placeholder="Duration (e.g. 36 hours)" />
              <label className="block text-sm font-medium text-gray-400 mb-1 mt-2">Registration Fee <span className="text-red-500">*</span></label>
              <select name="registrationFee" value={formData.registrationFee} onChange={handleChange} className={inputClass} required>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
              {formData.registrationFee === "Paid" && (
                <input type="text" name="feeAmount" value={formData.feeAmount} onChange={handleChange} className={inputClass} placeholder="Enter fee amount (e.g. ₹100)" required />
              )}
              <input type="text" name="rounds" value={formData.rounds} onChange={handleChange} className={inputClass} placeholder="Rounds / Phases (optional)" />
              <select name="eventMode" value={formData.eventMode} onChange={handleChange} className={inputClass} required>
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Location (e.g. Delhi or Online)" />
              <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} className={inputClass} placeholder="Organizer Name" />
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className={inputClass} placeholder="Tags (comma separated)" />
            </div>

            <div className={sectionClass}>
              <h2 className="text-2xl font-semibold mb-4">Team Building Details</h2>
              <p className="text-gray-400 mb-2">Every hackathon post is for team-building. Specify your desired tech stack, roles, and team size below.</p>
              <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} className={inputClass} placeholder="Tech Stack (comma separated)" required />
              <input type="text" name="roles" value={formData.roles} onChange={handleChange} className={inputClass} placeholder="Roles Needed (comma separated)" required />
              <input type="number" name="maxTeamSize" value={formData.maxTeamSize} onChange={handleChange} className={inputClass} placeholder="Max Team Size" required />
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-lg hover:opacity-90" disabled={loading}>
              {loading ? "Posting..." : "Post Hackathon"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostHackathon;
