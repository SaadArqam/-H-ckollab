import React, { createContext, useContext, useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(false);

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const saveProfile = (data) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(data));
      setProfileData(data);
      setLoading(false);
    }, 1000);
  };

  const clearProfile = () => {
    localStorage.removeItem("userProfile");
    setProfileData(null);
  };

  const value = {
    profileData,
    saveProfile,
    clearProfile,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
