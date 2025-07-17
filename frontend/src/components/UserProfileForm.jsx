import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const skillCategories = {
  Frontend: [
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],
  Backend: [
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Ruby",
    "PHP",
    "C#",
    ".NET",
    "Express.js",
    "Django",
    "Flask",
  ],
  Mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"],
  Database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Supabase"],
};

const UserProfileForm = () => {
  const { user } = useAuth();
  const { profileData, refetchAll } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    availability: "",
    academicYear: "",
    branch: "",
    skills: [],
    interests: "",
    github: "",
    otherLinks: "",
    projects: [{ title: "", tech: "", link: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = profileData && profileData !== "notfound";

  useEffect(() => {
    if (isEditing) {
      const selectedSkills = profileData.skills?.map((s) => s.skill.name) || [];
      setFormData({
        name: profileData.name || "",
        bio: profileData.bio || "",
        availability: profileData.availability || "",
        academicYear: profileData.academicYear || "",
        branch: profileData.branch || "",
        skills: selectedSkills,
        interests: profileData.interests || "",
        github: profileData.githubUrl || "",
        otherLinks: profileData.portfolioUrl || "",
        projects: profileData.featuredProjects || [
          { title: "", tech: "", link: "" },
        ],
        discordOrContact: profileData.discordOrContact || "",
      });
    }
  }, [profileData, isEditing]);

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index, e) => {
    const updated = [...formData.projects];
    updated[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", tech: "", link: "" }],
    }));
  };

  const apiBase = process.env.REACT_APP_API_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const skillsPayload = formData.skills.map((skill) => ({
      skillId: skill,
      level: "Advanced",
    }));

    const payload = {
      firebaseUid: user?.uid,
      name: formData.name,
      email: user?.email,
      bio: formData.bio,
      githubUrl: formData.github,
      portfolioUrl: formData.otherLinks,
      availability: formData.availability || "Available",
      skills: skillsPayload,
      academicYear: formData.academicYear,
      branch: formData.branch,
      interests: formData.interests,
      featuredProjects: formData.projects, // Ensure this is always sent as an array
      discordOrContact: formData.discordOrContact,
    };

    try {
      const token = await user?.getIdToken();
      const url = isEditing
        ? `${apiBase}/api/users/firebase/${user?.uid}`
        : `${apiBase}/api/users`;
      const res = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      await refetchAll();
      setLoading(false);
      toast.success(isEditing ? "Profile updated!" : "Profile created!");
      navigate("/profile");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to save profile");
      toast.error(err.message || "Failed to save profile");
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const sectionClass =
    "space-y-6 bg-gray-950 p-6 rounded-xl border border-gray-800";

  return (
    <div className="min-h-screen px-6 py-12 bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {error && <ErrorMessage message={error} />}
          {loading && <Loader loading={loading} />}

          {/* Basic Info */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Full Name"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={inputClass}
              placeholder="Short bio"
              rows={3}
            />
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Availability</option>
              <option>Available for work</option>
              <option>Open to Collaborate</option>
              <option>Not available</option>
            </select>
          </div>

          {/* Academic */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">
              Academic Information
            </h2>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className={inputClass}
              placeholder="Academic Year"
            />
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={inputClass}
              placeholder="Branch"
            />
          </div>

          {/* Skills */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Your Skills</h2>
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  {skills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full border ${
                        formData.skills.includes(skill)
                          ? "bg-white text-black"
                          : "bg-black text-white border-gray-700"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interests */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">
              Concepts & Interests
            </h2>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. AI, UI/UX, DevOps..."
            />
          </div>

          {/* Social */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className={inputClass}
              placeholder="GitHub URL"
            />
            <input
              type="url"
              name="otherLinks"
              value={formData.otherLinks}
              onChange={handleChange}
              className={inputClass}
              placeholder="LinkedIn / Portfolio URL"
            />
            <input
              type="text"
              name="discordOrContact"
              value={formData.discordOrContact || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. discordUser#1234 or https://t.me/username"
            />
            <p className="text-xs text-gray-400 mt-1">This will help teammates contact you after collaboration is accepted.</p>
          </div>

          {/* Projects */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
            {formData.projects.map((proj, idx) => (
              <div
                key={idx}
                className="space-y-4 border border-gray-700 p-4 rounded-lg bg-gray-900"
              >
                <input
                  type="text"
                  name="title"
                  value={proj.title}
                  onChange={(e) => handleProjectChange(idx, e)}
                  className={inputClass}
                  placeholder="Project Title"
                />
                <input
                  type="text"
                  name="tech"
                  value={proj.tech}
                  onChange={(e) => handleProjectChange(idx, e)}
                  className={inputClass}
                  placeholder="Tech Used"
                />
                <input
                  type="url"
                  name="link"
                  value={proj.link}
                  onChange={(e) => handleProjectChange(idx, e)}
                  className={inputClass}
                  placeholder="Project Link"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="text-blue-400 text-sm mt-3 hover:underline"
            >
              + Add another project
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isEditing ? "Updating..." : "Saving..."}
              </div>
            ) : isEditing ? (
              "Update Profile"
            ) : (
              "Create Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
