import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Collaborations() {
  const { collaborations, loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">Loading collaborations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">My Collaborations</h1>
        {(!collaborations || collaborations.length === 0) ? (
          <div className="text-center text-gray-400 text-lg">You are not collaborating on any projects yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborations.map((collab) => (
              <div key={collab.id} className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{collab.title || collab.project?.title || "Untitled Project"}</h2>
                <p className="text-gray-300 mb-2">{collab.description || collab.project?.description || "No description provided."}</p>
                <div className="text-sm text-gray-400 mb-1">Role: {collab.role || "Collaborator"}</div>
                <div className="text-sm text-gray-400">Status: {collab.status || "Active"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 