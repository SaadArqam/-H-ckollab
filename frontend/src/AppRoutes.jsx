import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/create-project" 
        element={
          <ProtectedRoute>
            <CreateProjectPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Add more protected routes as needed */}
      {/* <Route path="/projects/:id/edit" element={<ProtectedRoute><EditProjectPage /></ProtectedRoute>} /> */}
      {/* <Route path="/my-projects" element={<ProtectedRoute><MyProjectsPage /></ProtectedRoute>} /> */}
      {/* <Route path="/profile/setup" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} /> */}
    </Routes>
  );
}

export default AppRoutes;
