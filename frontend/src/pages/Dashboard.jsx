import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const Dashboard = () => {
  const {
    profileData,
    refetchProfile,
    userProjects,
    fetchUserProjects,
    invites,
    collaborations,
  } = useAppContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await refetchProfile();
      await fetchUserProjects();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-32 w-full rounded-xl bg-gray-800 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 w-full rounded-xl bg-gray-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-40 w-full rounded-xl bg-gray-800 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Profile Summary */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {profileData?.name || "Your Name"}
            </h2>
            <p className="text-sm text-gray-400">
              {profileData?.availability || "Availability not set"}
            </p>
            <p className="mt-2 text-gray-300 max-w-md">
              {profileData?.bio || "No bio added."}
            </p>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Full Profile
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          onClick={() => navigate("/my-projects")}
          className="cursor-pointer hover:shadow-lg transition bg-gray-900 border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">My Projects</h3>
              <p className="text-sm text-gray-400">
                View and manage your projects
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("/my-invites")}
          className="cursor-pointer hover:shadow-lg transition bg-gray-900 border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">My Invites</h3>
              <p className="text-sm text-gray-400">
                See who invited you to collaborate
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("/collaborations")}
          className="cursor-pointer hover:shadow-lg transition bg-gray-900 border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">My Collaborations</h3>
              <p className="text-sm text-gray-400">
                Projects you're collaborating on
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-purple-400">
              {userProjects?.length || 0}
            </p>
            <p className="text-gray-400">Total Projects Posted</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">
              {collaborations?.length || 0}
            </p>
            <p className="text-gray-400">Total Collaborations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">
              {invites?.length || 0}
            </p>
            <p className="text-gray-400">Pending Invites</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
