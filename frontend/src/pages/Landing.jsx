// src/pages/Landing.jsx
// export default function Landing() {
//   return <div className="text-white text-center mt-10">Landing Page (Home)</div>;
// }

import React from 'react';
import { ArrowRight, Users, Target, FolderOpen, MessageSquare, Github, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Beta Badge */}
      <div className="flex justify-center pt-10">
        <div className="flex items-center gap-2 bg-gray-900/50 border border-gray-700 rounded-full px-5 py-2.5 text-base">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-gray-300">Now in Beta</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center px-6 pt-20 pb-40">
        <h1 className="text-7xl md:text-8xl lg:text-8xl font-bold mb-10 leading-tight">
          Find Your Perfect<br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Hackathon Teammates
          </span>
        </h1>
        
        <p className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          Connect with talented developers, designers, and innovators. Build 
          amazing projects together and turn your ideas into reality.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-white text-black px-10 py-5 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 text-lg">
            Get Started <ArrowRight size={24} />
          </button>
          <button className="border border-gray-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-gray-900/50 transition-colors text-lg">
            Explore Developers
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 pb-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Everything you need to build together
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            From finding teammates to managing projects, H@ckollab has all the tools you need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Rich Profiles */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-10 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="text-purple-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold">Rich Profiles</h3>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed">
              Showcase your skills, GitHub projects, and availability. 
              Let others know what you bring to the table.
            </p>
          </div>

          {/* Smart Matching */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Target className="text-blue-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold">Smart Matching</h3>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed">
              Find teammates with complementary skills. Filter by tech stack, 
              experience level, and availability.
            </p>
          </div>

          {/* Project Management */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-10 hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <FolderOpen className="text-green-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold">Project Management</h3>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed">
              Post projects, invite collaborators, and track your team's progress 
              from idea to deployment.
            </p>
          </div>

          {/* Team Communication */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-10 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <MessageSquare className="text-yellow-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold">Team Communication</h3>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed">
              Built-in messaging to coordinate with your team and 
              discuss project details in real-time.
            </p>
          </div>

          {/* GitHub Integration */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-10 hover:border-gray-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-500/10 rounded-lg">
                <Github className="text-gray-300" size={28} />
              </div>
              <h3 className="text-3xl font-bold">GitHub Integration</h3>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed">
              Connect your GitHub profile to showcase your work and 
              collaborate on code seamlessly.
            </p>
          </div>

          {/* Recognition System */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-700 rounded-2xl p-10 hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Star className="text-red-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold">Recognition System</h3>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed">
              Earn badges and build your reputation as a reliable 
              collaborator in the community.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center px-6 pb-32">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          Ready to build something amazing?
        </h2>
        <p className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
          Join thousands of developers already collaborating on H@ckollab.
        </p>
        
        {/* Redirect button updated here */}
        <button
          onClick={() => navigate("/create-profile")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-6 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-3 mx-auto text-xl"
        >
          Create Your Profile <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
