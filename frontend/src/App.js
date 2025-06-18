import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import { AppProvider } from "./contexts/AppContext";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key. Please add REACT_APP_CLERK_PUBLISHABLE_KEY to your .env.local file");
}

function App() {
  return (
<<<<<<< HEAD
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </AppProvider>
=======
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
>>>>>>> b0109896b291d68809db79810d08b7f1fcc49757
    </ClerkProvider>
  );
}

export default App;
