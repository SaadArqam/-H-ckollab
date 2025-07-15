import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./UserContext";
import FullScreenLoader from "../components/FullScreenLoader";
import { toast } from "react-toastify";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [invites, setInvites] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Helper to check if user/token is valid
  const isTokenValid = (token) => user && user.uid && token;

  // Move init outside useEffect so it can be reused
  const init = async () => {
    if (!user || !user.uid) {
      setLoading(false);
      return;
    }
    try {
      const token = await user.getIdToken();
      if (!token) {
        setLoading(false);
        return;
      }
      console.log("🔥 UID:", user?.uid);
      console.log("🔥 Fetching all user data in parallel...");
      setLoading(true);
      await Promise.all([
        fetchProfile(token),
        fetchUserProjects(token),
        fetchInvites(token),
        fetchCollaborations(token),
      ]);
    } catch (error) {
      console.error("❌ Failed to initialize app data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user || !user.uid) {
      setLoading(false);
      return;
    }
    init();
    // eslint-disable-next-line
  }, [user]);

  // Update fetchProfile, fetchUserProjects, fetchInvites, fetchCollaborations to accept token as param
  const fetchProfile = async (token) => {
    if (!isTokenValid(token)) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/firebase/${user.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 404) {
        setProfileData("notfound");
        return;
      }
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Profile fetch failed with status:", res.status);
        console.error("❌ Response body:", errorText);
        throw new Error("Failed to fetch profile");
      }
      const data = await res.json();
      setProfileData(data);
    } catch (err) {
      console.error("❌ Error in fetchProfile:", err.message);
      setProfileData("notfound");
      toast.error("Failed to fetch profile data.");
    }
  };

  const fetchUserProjects = async (token) => {
    if (!isTokenValid(token)) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${user.uid}/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUserProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setUserProjects([]);
      toast.error("Failed to fetch your projects.");
    }
  };

  const fetchInvites = async (token) => {
    if (!isTokenValid(token)) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/invites/user/${user.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setInvites(Array.isArray(data) ? data : []);
    } catch (err) {
      setInvites([]);
      toast.error("Failed to fetch your invites.");
    }
  };

  const fetchCollaborations = async (token) => {
    if (!isTokenValid(token)) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${user.uid}/collaborations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCollaborations(Array.isArray(data) ? data : []);
    } catch (err) {
      setCollaborations([]);
      toast.error("Failed to fetch your collaborations.");
    }
  };


  const value = {
    profileData,
    userProjects,
    invites,
    collaborations,
    loading,
    refetchAll: init, // ✅ FIXED
    setProfileData,
    setUserProjects,
    setInvites,
    setCollaborations,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
