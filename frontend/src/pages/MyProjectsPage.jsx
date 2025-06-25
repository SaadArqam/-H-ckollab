import React from "react";
import { Edit, Eye, Users } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Hackathon Helper",
    description: "A tool to help teams organize for hackathons.",
    status: "In Progress",
    inviteStatus: "Pending",
  },
  {
    id: 2,
    name: "Project Collab",
    description: "A platform for students to find project partners.",
    status: "Completed",
    inviteStatus: "Accepted",
  },
  {
    id: 3,
    name: "Idea Board",
    description: "A collaborative whiteboard for brainstorming and ideation.",
    status: "In Progress",
    inviteStatus: "Pending",
  },
  {
    id: 4,
    name: "DevConnect",
    description: "A networking app for developers to connect and share portfolios.",
    status: "Completed",
    inviteStatus: "Accepted",
  },
  {
    id: 5,
    name: "Bug Tracker",
    description: "A simple bug tracking tool for small teams and hackathons.",
    status: "In Progress",
    inviteStatus: "Pending",
  },
  {
    id: 6,
    name: "Open Source Hub",
    description: "A hub for discovering and contributing to open source projects.",
    status: "Completed",
    inviteStatus: "Accepted",
  },
];

export default function MyProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 pb-20">
      {/* Heading */}
      <div className="text-center pt-20 pb-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
          My <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Projects</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          View and manage your hackathon and collaboration projects. Track status, invites, and more.
        </p>
      </div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-8 shadow-lg hover:border-blue-500/50 transition-all group relative overflow-hidden"
          >
            {/* Project Title */}
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold group-hover:text-blue-400 transition-colors">
                {project.name}
              </h2>
            </div>
            {/* Description */}
            <p className="text-gray-300 text-lg mb-6">{project.description}</p>
            {/* Status & Invite */}
            <div className="flex flex-wrap gap-6 items-center mb-6">
              <div>
                <span className="text-gray-400 text-sm">Status:</span>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${project.status === "Completed" ? "bg-green-700/30 text-green-400" : "bg-blue-700/30 text-blue-400"}`}>
                  {project.status}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Invite Status:</span>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold
                  ${project.inviteStatus === "Accepted"
                    ? "bg-green-700/30 text-green-400"
                    : project.inviteStatus === "Pending"
                    ? "bg-yellow-700/30 text-yellow-400"
                    : "bg-gray-700/30 text-gray-300"}
                `}>
                  {project.inviteStatus}
                </span>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors text-lg shadow">
                <Eye size={20} /> View
              </button>
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-gray-600 text-white font-semibold hover:border-blue-500 hover:text-blue-400 transition-colors text-lg">
                <Edit size={20} /> Edit
              </button>
            </div>
            {/* Card Hover Effect */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-2 group-hover:ring-blue-500/40 transition-all"></div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-12 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6">
          <div className="text-3xl font-bold">H@ckollab</div>
          <div className="text-xl text-gray-400">© 2024 H@ckollab. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
} 