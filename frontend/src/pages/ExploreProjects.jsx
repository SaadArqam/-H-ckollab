import React, { useEffect, useState, useCallback } from "react";
import { Sparkles, Users, Send, Github, ExternalLink } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/UserContext";
import { toast } from "react-toastify";

export default function ExploreProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    tech: "",
    tags: "",
    difficulty: "",
  });
  const [interestedProjects, setInterestedProjects] = useState([]);

  const { profileData } = useAppContext();
  const { user } = useAuth();

  // Fetch all open projects
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.tech) params.append("tech", filters.tech);
      if (filters.tags) params.append("tags", filters.tags);
      if (filters.difficulty) params.append("difficulty", filters.difficulty);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects?${params.toString()}`);
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error(data.error || "Unexpected response from server");
      }
      const openProjects = data.filter((p) => p.visibility === "Open to All");
      setProjects(openProjects);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      setProjects([]);
      // Optionally show a toast or error message to the user
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch projects user has already shown interest in
  const fetchUserInterests = useCallback(async () => {
    if (!profileData?.id) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/interests/user/${profileData.id}`);
      if (!res.ok) return;
      const data = await res.json();
      // Backend returns array of project objects, extract project IDs
      setInterestedProjects(data.map((project) => project.id));
    } catch (err) {
      // Silent fail
    }
  }, [profileData]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchUserInterests();
  }, [fetchUserInterests]);

  const handleShowInterest = async (projectId) => {
    if (!profileData?.id) {
      toast.error("Please complete your profile first.");
      return;
    }
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/interests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: profileData.id,
          projectId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Interest sent successfully!");
        setInterestedProjects((prev) => [...prev, projectId]);
      } else {
        toast.error(data.error || "❌ Failed to show interest");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const inputClass =
    "bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded-lg w-full";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      {/* Filters */}
      <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          className={inputClass}
          placeholder="Tech Stack (e.g. React)"
          value={filters.tech}
          onChange={(e) => setFilters({ ...filters, tech: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Tags (e.g. AI)"
          value={filters.tags}
          onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
        />
        <select
          className={inputClass}
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
        >
          <option value="">All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black">Explore Projects</h1>
        <p className="text-slate-400 mt-2">
          Join real ideas, contribute, and collaborate
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-300 text-lg">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-slate-400 text-md">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-2xl p-7 hover:border-slate-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-xl font-bold truncate group-hover:text-blue-200 transition-colors duration-300">
                    {proj.title}
                  </h2>
                  <span className="text-sm text-blue-400 border border-blue-700/50 px-2 py-0.5 rounded-full bg-blue-900/40">
                    {proj.status}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-300" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-800/80 border border-slate-600/50 text-slate-200 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-300" /> Roles Needed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.rolesNeeded?.map((role, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-800/80 border border-slate-600/50 text-slate-300 text-xs font-medium rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleShowInterest(proj.id)}
                    disabled={interestedProjects.includes(proj.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow-lg ${
                      interestedProjects.includes(proj.id)
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:opacity-90"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    {interestedProjects.includes(proj.id)
                      ? "Interest Sent"
                      : "Show Interest"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
