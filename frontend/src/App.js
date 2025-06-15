import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const clerkFrontendApi = "your-clerk-frontend-api"; // Replace with your actual Clerk frontend API

function App() {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
