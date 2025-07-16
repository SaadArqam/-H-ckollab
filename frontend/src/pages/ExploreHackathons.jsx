import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function ExploreHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState("All Tech Stacks");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL || "";
    axios
      .get(`${apiBase}/api/hackathons`)
      .then((res) => {
        setHackathons(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setHackathons([]);
        setLoading(false);
      });
  }, []);

  // Map hackathon data for display
  const mappedHackathons = hackathons.map((h) => ({
    id: h.id,
    title: h.title,
    description: h.description,
    techStack: h.techStack || [],
    eventDate: h.eventDate,
    participants: h.participants ? h.participants.length : 0,
    createdBy: h.createdBy,
  }));

  // Filter logic
  const filteredHackathons = useMemo(() => {
    return mappedHackathons.filter((hackathon) => {
      const matchesSearch =
        searchQuery === "" ||
        hackathon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        hackathon.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesTechStack =
        selectedTechStack === "All Tech Stacks" ||
        hackathon.techStack.some((tech) =>
          tech.toLowerCase().includes(selectedTechStack.toLowerCase())
        );
      return matchesSearch && matchesTechStack;
    });
  }, [searchQuery, selectedTechStack, mappedHackathons]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTechStack("All Tech Stacks");
  };

  const hasActiveFilters =
    searchQuery || selectedTechStack !== "All Tech Stacks";

  const borderColors = [
    "hover:border-purple-500/30",
    "hover:border-blue-500/30",
    "hover:border-green-500/30",
    "hover:border-yellow-500/30",
    "hover:border-gray-500/30",
    "hover:border-red-500/30",
  ];

  // Unique tech stacks for filter dropdown
  const allTechStacks = Array.from(
    new Set(hackathons.flatMap((h) => h.techStack || []))
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 pb-20">
        <div className="text-center pt-20 pb-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Hackathons
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Find and filter hackathons by tech stack, date, and more. Join and
            collaborate with others!
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative w-full md:w-96">
              <div className="flex items-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl px-5 py-3 shadow-lg focus-within:ring-2 focus-within:ring-blue-500/30 transition-all duration-300 backdrop-blur-md">
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            {/* Tech Stack Filter */}
            <div className="relative w-full md:w-48">
              <select
                value={selectedTechStack}
                onChange={(e) => setSelectedTechStack(e.target.value)}
                className="appearance-none w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl px-4 py-3 text-white shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all duration-300 backdrop-blur-md pr-10"
              >
                <option>All Tech Stacks</option>
                {allTechStacks.map((tech) => (
                  <option key={tech}>{tech}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg">
                ▼
              </span>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-slate-300 text-sm font-medium">
                Showing{" "}
                <span className="text-white font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {filteredHackathons.length}
                </span>{" "}
                hackathon{filteredHackathons.length !== 1 ? "s" : ""}
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

          {/* Hackathon Cards Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 text-center text-gray-400 py-20 text-xl">
                Loading hackathons...
              </div>
            ) : filteredHackathons.length === 0 ? (
              <div className="col-span-2 text-center text-gray-400 py-20 text-xl">
                No hackathons found.
              </div>
            ) : (
              filteredHackathons.map((hackathon, idx) => (
                <div
                  key={hackathon.id || hackathon.title + idx}
                  className={`transition-all group relative overflow-hidden ${
                    borderColors[idx % borderColors.length]
                  } border rounded-2xl bg-gray-900/80 p-6 shadow-lg`}
                >
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {hackathon.title}
                  </h2>
                  <p className="text-gray-300 mb-2 line-clamp-3">
                    {hackathon.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {hackathon.techStack && hackathon.techStack.length > 0 ? (
                      hackathon.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        No tech stack listed
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-400 mb-2">
                    <span>
                      <strong>Date:</strong>{" "}
                      {hackathon.eventDate
                        ? new Date(hackathon.eventDate).toLocaleDateString()
                        : "TBA"}
                    </span>
                    <span>
                      <strong>Participants:</strong> {hackathon.participants}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created by: {hackathon.createdBy}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
