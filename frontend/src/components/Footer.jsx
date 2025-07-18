import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gradient-to-b from-gray-950/80 to-gray-900/80 px-6 py-10 mt-20 backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
        <div className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 select-none" style={{letterSpacing: '0.01em'}}>H</span>
          <span className="text-white font-semibold text-2xl tracking-tight" style={{letterSpacing: '0.01em'}}>collab</span>
        </div>
        <p className="text-gray-400 text-base max-w-xl">
          H@ckollab is your platform to discover, connect, and collaborate with talented minds for hackathons and projects. Build, innovate, and grow together.
        </p>
        <div className="text-gray-500 text-xs pt-2">
          © 2024 H@ckollab. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 