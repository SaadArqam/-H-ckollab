// src/pages/Landing.jsx
// export default function Landing() {
//   return <div className="text-white text-center mt-10">Landing Page (Home)</div>;
// }

import React from 'react';
import { ArrowRight, Users, FolderOpen, Send, Star, User, MessageSquare, Globe } from 'lucide-react';
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
    } else {
      navigate("/create-profile");
    }
  };

  const handleExploreProjects = () => {
    navigate("/explore-projects");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ fontSize: '1.15rem', zoom: 1.12 }}>
      {/* Beta Badge */}
      <div className="flex justify-center pt-10">
        <div className="flex items-center gap-2 bg-gray-900/50 border border-gray-700 rounded-full px-5 py-2.5 text-base">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-gray-300">Now in Beta</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 pt-24 pb-12 w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-center leading-tight">
          Collaborate. Build. Launch.<br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Hackathons & Projects
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-center">
          H@ckollab helps you find teammates, join or post hackathons and projects, and launch together. <br />
          Real people. Real teams. Real results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleCreateProfile}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:opacity-90 transition"
          >
            <User size={22} /> Create Your Profile
          </button>
          <button
            onClick={handleExploreProjects}
            className="border border-gray-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-gray-900/50 transition-colors text-lg flex items-center gap-3"
          >
            <FolderOpen size={22} /> Explore Projects
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-4 sm:px-8 pb-24 w-full">
        <Feature
          icon={<Users className="text-blue-400" size={28} />}
          title="Verified Profiles"
          desc="Real users, real skills. See what your future teammates can do."
        />
        <Feature
          icon={<FolderOpen className="text-green-400" size={28} />}
          title="Post & Join Projects"
          desc="Start your own project or join others. Find the right fit for your skills."
        />
        <Feature
          icon={<Globe className="text-purple-400" size={28} />}
          title="Hackathon Directory"
          desc="Browse and join real hackathons. Compete, learn, and grow."
        />
        <Feature
          icon={<Send className="text-yellow-400" size={28} />}
          title="Team Invites"
          desc="Invite others or accept invites to build your team."
        />
      </div>

      {/* How It Works Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-14 w-full">
        <h2 className="text-3xl font-bold mb-10 text-center">How it works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">1</div>
            <div className="font-semibold mb-1">Create Your Profile</div>
            <div className="text-gray-400">Sign up and let others know your skills and interests.</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">2</div>
            <div className="font-semibold mb-1">Explore or Post</div>
            <div className="text-gray-400">Browse or post projects and hackathons to join or start a team.</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">3</div>
            <div className="font-semibold mb-1">Build Your Team</div>
            <div className="text-gray-400">Invite others or accept invites to form your team.</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-3">4</div>
            <div className="font-semibold mb-1">Collaborate & Launch</div>
            <div className="text-gray-400">Work together, track progress, and launch your project or hackathon entry!</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center px-4 sm:px-8 pb-20">
        <h2 className="text-4xl font-bold mb-5">Ready to build something amazing?</h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join the next wave of builders, hackers, and creators on H@ckollab.
        </p>
        <button
          onClick={handleCreateProfile}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-3 mx-auto text-xl"
        >
          <ArrowRight size={24} /> Get Started
        </button>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-gradient-to-b from-gray-900/60 to-gray-900/20 border border-gray-800 rounded-2xl p-7 flex flex-col items-start gap-3 hover:border-blue-500/30 transition w-full min-h-[210px]">
      <div className="p-3 rounded-lg bg-white/5 mb-2">{icon}</div>
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
