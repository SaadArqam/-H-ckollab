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
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // 👈 Firebase user object

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const token = await user.getIdToken();

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/firebase/${user.uid}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

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

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [user]);

  const value = {
    profileData,
    loading,
    refetchProfile: fetchProfile,
    profileNotFound: profileData === "notfound",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
