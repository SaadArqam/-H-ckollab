import React,{useState} from 'react'


const UserProfileForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        github: "",
        links: "",
        skills: "",
        available: false,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }
    
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.github.startsWith("http"))
            newErrors.github = "GitHub link must be a valid URL";
        return newErrors;
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        const res = await fetch("http://localhost:4000/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("Profile Created:", data);
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    };
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>GitHub Link</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.github && <p className="text-red-500">{errors.github}</p>}
            </div>
            <div>
              <label>Other Links</label>
              <input
                type="url"
                name="links"
                value={formData.links}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Available?</label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create Profile
            </button>
          </form>
        );
    }

export default UserProfileForm