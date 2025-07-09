import { useState, useMemo } from 'react';
import { Star, MapPin, Users, Send, Github, ExternalLink, Search, Filter, Sparkles } from 'lucide-react';

// Enhanced UserCard Component with premium design
function UserCard({ developer }) {

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-7 hover:border-slate-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1"
    >
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Status glow effect */}
      {developer.status === 'online' && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      )}

      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-18 h-18 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-600/50">
                <span className="text-white font-bold text-xl bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
                  {developer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-xl mb-2 truncate group-hover:text-blue-200 transition-colors duration-300">
                {developer.name}
              </h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0 text-slate-500" />
                <span className="truncate font-medium">{developer.university}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${developer.level === 'Senior'
                  ? 'bg-purple-900/40 text-purple-300 border border-purple-800/30'
                  : developer.level === 'Mid-Level'
                    ? 'bg-blue-900/40 text-blue-300 border border-blue-800/30'
                    : 'bg-green-900/40 text-green-300 border border-green-800/30'
                  }`}>
                  <Award className="w-3 h-3 inline mr-1" />
                  {developer.level}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Rating Badge */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 px-4 py-2 rounded-full border border-amber-800/30 backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-400 fill-current drop-shadow-sm" />
            <span className="text-white font-bold text-sm">{developer.rating}</span>
          </div>
        </div>

        {/* Enhanced Description */}
        <div className="mb-6">
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
            {developer.description}
          </p>
        </div>

        {/* Enhanced Skills Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-white text-sm font-bold">Skills</h4>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {developer.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-slate-800/80 to-slate-700/80 text-slate-200 text-xs font-medium rounded-full border border-slate-600/50 hover:border-slate-500/50 hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-300 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
            {developer.skills.length > 4 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-slate-800/60 to-slate-700/60 text-slate-400 text-xs font-medium rounded-full border border-slate-700/50 backdrop-blur-sm">
                +{developer.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Stats Row */}
        <div className="flex items-center justify-between mb-6 p-3 bg-slate-800/40 rounded-xl border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">{developer.collaborations}</span>
            <span className="text-xs text-slate-500">projects</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${developer.availability === 'Actively Looking'
            ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300 border border-green-800/50 shadow-green-900/20'
            : 'bg-gradient-to-r from-yellow-900/50 to-amber-900/50 text-yellow-300 border border-yellow-800/50 shadow-yellow-900/20'
            }`}>
            <div className={`w-2 h-2 rounded-full ${developer.availability === 'Actively Looking' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
              }`}></div>
            {developer.availability}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 group/btn">
            <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            Invite to Collaborate
          </button>
          <button className="p-3 bg-slate-800/80 border border-slate-600/50 rounded-xl hover:border-slate-500/50 hover:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 shadow-lg hover:shadow-slate-900/25">
            <Github className="w-4 h-4 text-slate-300 hover:text-white transition-colors duration-300" />
          </button>
          <button className="p-3 bg-slate-800/80 border border-slate-600/50 rounded-xl hover:border-slate-500/50 hover:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 shadow-lg hover:shadow-slate-900/25">
            <ExternalLink className="w-4 h-4 text-slate-300 hover:text-white transition-colors duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Main Component
export default function Explore() {
  const [selectedTechStack, setSelectedTechStack] = useState('All Tech Stacks');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedAvailability, setSelectedAvailability] = useState('All Availability');
  const [searchQuery, setSearchQuery] = useState('');

  const allDevelopers = [
    {
      name: "Alex Chen",
      university: "MIT",
      rating: 4.9,
      description: "Full-stack developer passionate about AI and web technologies. Love building products that make a difference and solving complex problems with elegant solutions.",
      skills: ["React", "Node.js", "Python", "TypeScript", "MongoDB", "GraphQL", "AWS", "Docker"],
      collaborations: 12,
      availability: "Actively Looking",
      status: "online",
      level: "Senior"
    },
    {
      name: "Sarah Johnson",
      university: "Stanford University",
      rating: 4.8,
      description: "UX/UI Designer who codes! Specializing in design systems and user research. Always looking for innovative projects that push creative boundaries.",
      skills: ["Figma", "React", "CSS", "JavaScript", "Sketch", "Prototyping", "Adobe XD"],
      collaborations: 8,
      availability: "Open to Collaborate",
      status: "away",
      level: "Mid-Level"
    },
    {
      name: "Marcus Rodriguez",
      university: "UC Berkeley",
      rating: 4.9,
      description: "Backend engineer and DevOps enthusiast. Love working with distributed systems and cloud infrastructure to build scalable solutions.",
      skills: ["Go", "Kubernetes", "AWS", "PostgreSQL", "Docker", "Terraform", "Redis"],
      collaborations: 15,
      availability: "Actively Looking",
      status: "online",
      level: "Senior"
    },
    {
      name: "Emily Wang",
      university: "Carnegie Mellon",
      rating: 4.7,
      description: "Machine Learning engineer with a focus on computer vision and NLP. Enjoy working on cutting-edge AI projects that solve real-world problems.",
      skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "Pandas", "Jupyter"],
      collaborations: 10,
      availability: "Open to Collaborate",
      status: "online",
      level: "Mid-Level"
    },
    {
      name: "David Kim",
      university: "Georgia Tech",
      rating: 4.6,
      description: "Mobile developer specializing in cross-platform applications. Love creating smooth, intuitive user experiences that delight users on mobile devices.",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux", "Expo"],
      collaborations: 7,
      availability: "Actively Looking",
      status: "away",
      level: "Junior"
    },
    {
      name: "Priya Patel",
      university: "University of Washington",
      rating: 4.8,
      description: "Data scientist and full-stack developer. Passionate about turning data into actionable insights and building data-driven products that impact millions.",
      skills: ["Python", "R", "JavaScript", "D3.js", "SQL", "Tableau", "Pandas"],
      collaborations: 11,
      availability: "Open to Collaborate",
      status: "online",
      level: "Senior"
    }
  ];

  const filteredDevelopers = useMemo(() => {
    return allDevelopers.filter(developer => {
      const matchesSearch = searchQuery === '' ||
        developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        developer.university.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTechStack = selectedTechStack === 'All Tech Stacks' ||
        developer.skills.some(skill => skill.toLowerCase().includes(selectedTechStack.toLowerCase()));

      const matchesLevel = selectedLevel === 'All Levels' || developer.level === selectedLevel;

      const matchesAvailability = selectedAvailability === 'All Availability' ||
        developer.availability === selectedAvailability;

      return matchesSearch && matchesTechStack && matchesLevel && matchesAvailability;
    });
  }, [searchQuery, selectedTechStack, selectedLevel, selectedAvailability, allDevelopers]);

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
              <Search className="text-blue-400 mr-3 w-5 h-5" />
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
                <Filter className="w-4 h-4" />
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
          {filteredDevelopers.map((developer, idx) => (
            <div
              key={developer.name}
              className={`bg-gradient-to-b from-gray-900/60 to-gray-900/30 border border-gray-700 rounded-2xl p-8 shadow-lg transition-all group relative overflow-hidden ${borderColors[idx % borderColors.length]}`}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-18 h-18 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-700/50">
                        <span className="text-white font-bold text-xl bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
                          {developer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-xl mb-2 truncate group-hover:text-blue-400 transition-colors duration-300">
                        {developer.name}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-slate-500" />
                        <span className="truncate font-medium">{developer.university}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${developer.level === 'Senior'
                          ? 'bg-purple-900/40 text-purple-300 border border-purple-800/30'
                          : developer.level === 'Mid-Level'
                            ? 'bg-blue-900/40 text-blue-300 border border-blue-800/30'
                            : 'bg-green-900/40 text-green-300 border border-green-800/30'
                          }`}>
                          <Award className="w-3 h-3 inline mr-1" />
                          {developer.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 px-4 py-2 rounded-full border border-amber-800/30 backdrop-blur-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-current drop-shadow-sm" />
                    <span className="text-white font-bold text-sm">{developer.rating}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
                    {developer.description}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-white text-sm font-bold">Skills</h4>
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-slate-200 text-xs font-medium rounded-full border border-gray-600/50 hover:border-blue-400/50 hover:from-gray-700/80 hover:to-gray-600/80 transition-all duration-300 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {developer.skills.length > 4 && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-gray-800/60 to-gray-700/60 text-gray-400 text-xs font-medium rounded-full border border-gray-700/50 backdrop-blur-sm">
                        +{developer.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6 p-3 bg-gray-800/40 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">{developer.collaborations}</span>
                    <span className="text-xs text-slate-500">projects</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${developer.availability === 'Actively Looking'
                    ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300 border border-green-800/50 shadow-green-900/20'
                    : 'bg-gradient-to-r from-yellow-900/50 to-amber-900/50 text-yellow-300 border border-yellow-800/50 shadow-yellow-900/20'
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${developer.availability === 'Actively Looking' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                      }`}></div>
                    {developer.availability}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 group/btn">
                    <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                    Invite to Collaborate
                  </button>
                  <button className="p-3 bg-gray-800/80 border border-gray-600/50 rounded-xl hover:border-blue-400/50 hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25">
                    <Github className="w-4 h-4 text-gray-300 hover:text-white transition-colors duration-300" />
                  </button>
                  <button className="p-3 bg-gray-800/80 border border-gray-600/50 rounded-xl hover:border-blue-400/50 hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25">
                    <ExternalLink className="w-4 h-4 text-gray-300 hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              </div>
              {/* Card Hover Effect */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-2 group-hover:ring-blue-500/40 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}