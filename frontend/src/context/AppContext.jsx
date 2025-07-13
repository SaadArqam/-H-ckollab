import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./UserContext";

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
  const { user } = useAuth(); // 👈 Firebase user object

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const token = await user.getIdToken();

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
        const errorText = await res.text(); // Handle HTML error responses
        console.error("❌ Profile fetch failed with status:", res.status);
        console.error("❌ Response body:", errorText);
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      setProfileData(data);
    } catch (err) {
      console.error("❌ Error in fetchProfile:", err.message);
      setProfileData("notfound");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProjects = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${user.uid}/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUserProjects(data);
      }
    } catch (err) {
      console.error("❌ Error fetching user projects:", err);
    }
  };

  const fetchInvites = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/invites/user/${user.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setInvites(data);
      }
    } catch (err) {
      console.error("❌ Error in fetchInvites:", err.message);
    }
  };

  const fetchCollaborations = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${user.uid}/collaborations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setCollaborations(data);
      }
    } catch (err) {
      console.error("❌ Error fetching collaborations:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserProjects();
    fetchInvites();
    fetchCollaborations();
    // eslint-disable-next-line
  }, [user]);

  const value = {
    profileData,
    userProjects,
    invites,
    collaborations,
    loading,
    refetchProfile: fetchProfile,
    fetchUserProjects,
    fetchInvites,
    fetchCollaborations,
    profileNotFound: profileData === "notfound",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
