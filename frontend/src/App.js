import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const clerkFrontendApi = "your-clerk-frontend-api"; // Replace with your actual Clerk frontend API

function App() {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;
