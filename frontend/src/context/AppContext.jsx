
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

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
  const { user } = useUser(); // 👈 Clerk user object

  useEffect(() => {
    if (!user) return;

    console.log("🧪 Clerk User object:", user);
    const fetchProfile = async () => {
      try {
        if (user?.id) {
          const res = await fetch(`http://localhost:4000/api/users/clerk/${user.id}`);
          if (!res.ok) throw new Error('User not found');
          const data = await res.json();
          console.log("✅ Loaded profileData:", data);
          setProfileData(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const value = {
    profileData,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
