import { createContext, useContext } from "react";
import { useUser } from "@clerk/clerk-react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <UserContext.Provider value={{ user, isSignedIn, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
