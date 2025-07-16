import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import axios from "axios";

export default function Navbar() {
  const { isSignedIn, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingInvites, setPendingInvites] = useState(0);
  const [acceptedSentInvites, setAcceptedSentInvites] = useState([]); // New: accepted invites sent by user
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Fetch pending invites (receiver)
  useEffect(() => {
    let interval;
    const fetchPending = async () => {
      if (!user) return setPendingInvites(0);
      try {
        const token = await user.getIdToken();
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/invites/user/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const invites = res.data || [];
        setPendingInvites(invites.filter((i) => i.status === "pending").length);
      } catch {
        setPendingInvites(0);
      }
    };
    fetchPending();
    interval = setInterval(fetchPending, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [user]);

  // Fetch accepted sent invites (sender notifications)
  useEffect(() => {
    let interval;
    const fetchAcceptedSent = async () => {
      if (!user) return setAcceptedSentInvites([]);
      try {
        const token = await user.getIdToken();
        // Get sender's DB id
        const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/firebase/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dbUser = userRes.data;
        if (!dbUser?.id) return setAcceptedSentInvites([]);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/invites/sent/${dbUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const invites = res.data || [];
        // Only show accepted invites that are not yet seen (for demo, show all accepted)
        setAcceptedSentInvites(invites.filter((i) => i.status === "accepted"));
      } catch {
        setAcceptedSentInvites([]);
      }
    };
    fetchAcceptedSent();
    interval = setInterval(fetchAcceptedSent, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight flex items-center gap-1">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-white">H</span>
            <span className="text-indigo-500 font-extrabold">@</span>
            <span className="text-white">ck</span>
            <span className="text-indigo-500 font-extrabold">ollab</span>
          </Link>
        </div>
      
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-400 hover:text-white transition">
            Landing
          </Link>
          <Link
            to="/explore"
            className="text-gray-400 hover:text-white transition"
          >
            Explore
          </Link>
          <Link
            to="/explore-projects"
            className="text-gray-400 hover:text-white transition"
          >
            Explore Projects
          </Link>
          <Link
            to="/my-projects"
            className="text-gray-400 hover:text-white transition"
          >
            My Projects
          </Link>
          <Link
            to="/post-project"
            className="text-gray-400 hover:text-white transition"
          >
            Post Project
          </Link>
          <Link
            to="/messages"
            className="text-gray-400 hover:text-white transition"
          >
            Messages
          </Link>
          <Link
            to="/profile"
            className="text-gray-400 hover:text-white transition"
          >
            Profile
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-400 hover:text-white transition"
          >
            Dashboard
          </Link>
          {isSignedIn && (
            <button
              className="relative focus:outline-none ml-2"
              onClick={() => navigate("/my-invites")}
              aria-label="View Invites"
            >
              <FaBell className="text-xl text-gray-300 hover:text-yellow-400 transition" />
              {pendingInvites > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 py-0.5 text-xs font-bold">
                  {pendingInvites}
                </span>
              )}
            </button>
          )}

          {/* Auth Buttons */}
          {isSignedIn ? (
            <div className="ml-2 flex items-center gap-2">
              <span className="text-gray-300 text-sm">{user?.email}</span>
              <button
                onClick={() => signOut(auth)}
                className="px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-500 transition text-sm font-semibold ml-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <Link to="/sign-in">
                <button className="px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition text-sm font-semibold">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="px-4 py-1.5 rounded-md border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 transition text-sm font-medium">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-6 pb-4 pt-2 animate-fade-in-down z-50">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Landing
            </Link>
            <Link
              to="/explore"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/explore-projects"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Projects
            </Link>
            <Link
              to="/my-projects"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Projects
            </Link>
            <Link
              to="/post-project"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Post Project
            </Link>
            <Link
              to="/messages"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              to="/profile"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {/* Auth Buttons */}
            {isSignedIn ? (
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-gray-300 text-sm">{user?.email}</span>
                <button
                  onClick={() => {
                    signOut(auth);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-500 transition text-sm font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition text-sm font-semibold">
                    Sign In
                  </button>
                </Link>
                <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-1.5 rounded-md border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 transition text-sm font-medium">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
