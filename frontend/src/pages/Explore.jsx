import { useState, useEffect, useMemo } from 'react';
import UserCard from '../components/UserCard';

export default function Explore() {
  const [selectedTechStack, setSelectedTechStack] = useState('All Tech Stacks');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedAvailability, setSelectedAvailability] = useState('All Availability');
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL || '';
    fetch(`${apiBase}/api/users`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Invalid user data format");
        setAllUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching users:", err.message);
        setAllUsers([]); 
        setLoading(false);
      });
  }, []);
  

  // Map backend user data to card format
  const mappedDevelopers = allUsers.map(user => ({
    id: user.id || user.firebaseUid,
    name: user.name,
    university: [user.branch, user.academicYear].filter(Boolean).join(' | '),
    rating: 4.8, // Placeholder, adjust if you have this data
    description: user.bio || '',
    skills: user.skills ? user.skills.map(s => s.skill?.name).filter(Boolean) : [],
    collaborations: user.projects ? user.projects.length : 0,
    availability: user.availability || 'Open to Collaborate',
    status: 'online', // Placeholder
    level: 'Mid-Level', // Placeholder
    discordOrContact: user.discordOrContact || '',
  }));

  const filteredDevelopers = useMemo(() => {
    return mappedDevelopers.filter(developer => {
      const matchesSearch = searchQuery === '' ||
        developer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        developer.university?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTechStack = selectedTechStack === 'All Tech Stacks' ||
        developer.skills.some(skill => skill.toLowerCase().includes(selectedTechStack.toLowerCase()));

      const matchesLevel = selectedLevel === 'All Levels' || developer.level === selectedLevel;

      const matchesAvailability = selectedAvailability === 'All Availability' ||
        developer.availability === selectedAvailability;

      return matchesSearch && matchesTechStack && matchesLevel && matchesAvailability;
    });
  }, [searchQuery, selectedTechStack, selectedLevel, selectedAvailability, mappedDevelopers]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTechStack('All Tech Stacks');
    setSelectedLevel('All Levels');
    setSelectedAvailability('All Availability');
  };

  const hasActiveFilters = searchQuery || selectedTechStack !== 'All Tech Stacks' ||
    selectedLevel !== 'All Levels' || selectedAvailability !== 'All Availability';

  const borderColors = [
    "hover:border-purple-500/30",
    "hover:border-blue-500/30",
    "hover:border-green-500/30",
    "hover:border-yellow-500/30",
    "hover:border-gray-500/30",
    "hover:border-red-500/30",
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 pb-20">
      <div className="text-center pt-20 pb-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
          Explore <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Users</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Find and filter developers by skills, experience, and availability. Invite them to collaborate!
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <div className="relative w-full md:w-96">
            <div className="flex items-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl px-5 py-3 shadow-lg focus-within:ring-2 focus-within:ring-blue-500/30 transition-all duration-300 backdrop-blur-md">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-gray-400 hover:text-white text-xl font-bold focus:outline-none transition-colors duration-200"
                  tabIndex={-1}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          {/* Filters */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <select
                value={selectedTechStack}
                onChange={e => setSelectedTechStack(e.target.value)}
                className="appearance-none w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl px-4 py-3 text-white shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all duration-300 backdrop-blur-md pr-10"
              >
                <option>All Tech Stacks</option>
                <option>React</option>
                <option>Python</option>
                <option>Node.js</option>
                <option>Go</option>
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Figma</option>
                <option>AWS</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg">
                ▼
              </span>
            </div>
            <div className="relative w-full md:w-40">
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                className="appearance-none w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl px-4 py-3 text-white shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all duration-300 backdrop-blur-md pr-10"
              >
                <option>All Levels</option>
                <option>Junior</option>
                <option>Mid-Level</option>
                <option>Senior</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg">
                ▼
              </span>
            </div>
            <div className="relative w-full md:w-56">
              <select
                value={selectedAvailability}
                onChange={e => setSelectedAvailability(e.target.value)}
                className="appearance-none w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl px-4 py-3 text-white shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all duration-300 backdrop-blur-md pr-10"
              >
                <option>All Availability</option>
                <option>Actively Looking</option>
                <option>Open to Collaborate</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Results Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-slate-300 text-sm font-medium">
              Showing <span className="text-white font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{filteredDevelopers.length}</span> developer{filteredDevelopers.length !== 1 ? 's' : ''}
            </p>
            {hasActiveFilters && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Filters active</span>
              </div>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-all duration-300 hover:bg-slate-800/50 rounded-lg"
            >
              <span>Clear filters</span>
              <span className="text-xs">×</span>
            </button>
          )}
        </div>

        {/* User Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-2 text-center text-gray-400 py-20 text-xl">Loading users...</div>
          ) : filteredDevelopers.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400 py-20 text-xl">No users found.</div>
          ) : (
            filteredDevelopers.map((developer, idx) => (
              <div key={developer.id || developer.name + idx} className={`transition-all group relative overflow-hidden ${borderColors[idx % borderColors.length]}`}>
                <UserCard {...developer} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}