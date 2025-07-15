import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./UserContext";
import FullScreenLoader from "../components/FullScreenLoader";

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

  // Move init outside useEffect
  const refetchAll = async () => {
    if (!user || !user.uid) return;
    const token = await user.getIdToken();
    if (!token) return;
    await Promise.all([
      fetchProfile(token),
      fetchUserProjects(token),
      fetchInvites(token),
      fetchCollaborations(token),
    ]);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await refetchAll();
      setLoading(false);
    };
    load();
    // eslint-disable-next-line
  }, [user]);

  // Update fetchProfile, fetchUserProjects, fetchInvites, fetchCollaborations to accept token as param
  const fetchProfile = async (token) => {
    if (!user || !user.uid || !token) return;
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
    }
  };

  const fetchUserProjects = async (token) => {
    if (!user || !user.uid || !token) return;
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
    }
  };

  const fetchInvites = async (token) => {
    if (!user || !user.uid || !token) return;
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
    }
  };

  const fetchCollaborations = async (token) => {
    if (!user || !user.uid || !token) return;
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
    }
  };


  const value = {
    profileData,
    userProjects,
    invites,
    collaborations,
    loading,
    refetchAll, // ✅ working now
    setProfileData,
    setUserProjects,
    setInvites,
    setCollaborations,
  };

  // Immediate return of loader to prevent white screen flash
  if (loading) {
    return <FullScreenLoader message="Loading your dashboard..." />;
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
