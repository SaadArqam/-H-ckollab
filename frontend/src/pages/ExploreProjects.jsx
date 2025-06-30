import React, { useEffect, useState } from "react";
import dummyProjects from "../data/dummyProjects";
import {
  MapPin,
  Sparkles,
  Users,
  Send,
  Github,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

export default function ExploreProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const openProjects = dummyProjects.filter(
        (proj) => proj.status === "Open for Collaboration"
      );
      setProjects(openProjects);
      setLoading(false);
    }, 1000); // Simulate loading
  }, []);

  if (loading)
    return (
      <div className="text-center text-slate-300 py-20 text-xl">
        Loading projects...
      </div>
    );

  if (projects.length === 0)
    return (
      <div className="text-center text-slate-400 py-20 text-lg">
        No open projects available.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden px-6 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700/50 mb-8">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 font-semibold text-sm">Find Projects</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Explore</span>{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Browse open-source and collaborative project ideas from developers worldwide. Discover something you want to contribute to!
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-7 hover:border-slate-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1"
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
                  {proj.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-slate-800/80 border border-slate-600/50 text-slate-200 text-xs font-medium rounded-full hover:border-slate-500/50 hover:bg-slate-700/80 transition-all duration-300"
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
                  {proj.rolesNeeded.map((role, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-slate-800/80 border border-slate-600/50 text-slate-300 text-xs font-medium rounded-full hover:border-slate-500/50 hover:bg-slate-700/80 transition-all duration-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => console.log(`Interest shown in: ${proj.title}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 group/btn"
                >
                  <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  Show Interest
                </button>
                <button className="p-3 bg-slate-800/80 border border-slate-600/50 rounded-xl hover:border-slate-500/50 hover:bg-slate-700/80 transition-all duration-300">
                  <Github className="w-4 h-4 text-slate-300 hover:text-white" />
                </button>
                <button className="p-3 bg-slate-800/80 border border-slate-600/50 rounded-xl hover:border-slate-500/50 hover:bg-slate-700/80 transition-all duration-300">
                  <ExternalLink className="w-4 h-4 text-slate-300 hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}