import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AppProvider } from "./context/AppContext";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("clerk key required ");
console.log("Publishable Key:", PUBLISHABLE_KEY);

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ClerkProvider>
  );
}

export default App;
