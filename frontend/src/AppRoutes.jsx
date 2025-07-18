import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./layout/Layout";

// Pages
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import ExploreProjects from "./pages/ExploreProjects";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import PostProjectPage from "./pages/PostProjectPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import MyInvites from "./pages/MyInvites"; // ✅ NEW: MyInvites route
import Dashboard from "./pages/Dashboard"; // ✅ NEW: Dashboard route
import Collaborations from "./pages/Collaborations";
import PostHackathon from "./pages/PostHackathon";
import ExploreHackathons from "./pages/ExploreHackathons";

// Auth
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes (outside layout) */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      {/* Wrapped layout routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Landing />
          </Layout>
        }
      />
      <Route
        path="/explore"
        element={
          <Layout>
            <Explore />
          </Layout>
        }
      />
      <Route
        path="/explore-projects"
        element={
          <Layout>
            <ExploreProjects />
          </Layout>
        }
      />
      <Route
        path="/messages"
        element={
          <Layout>
            <Messages />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/create-profile"
        element={
          <Layout>
            <CreateProfile />
          </Layout>
        }
      />
      <Route
        path="/post-project"
        element={
          <Layout>
            <PostProjectPage />
          </Layout>
        }
      />
      <Route
        path="/my-projects"
        element={
          <Layout>
            <MyProjectsPage />
          </Layout>
        }
      />
      <Route
        path="/my-invites"
        element={
          <Layout>
            <MyInvites />
          </Layout>
        }
      />{" "}
      {/* ✅ NEW */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />{" "}
      {/* ✅ NEW: Dashboard route */}
      <Route
        path="/collaborations"
        element={
          <Layout>
            <Collaborations />
          </Layout>
        }
      />
      \
      <Route path="/post-hackathon" element={<PostHackathon />} />
      <Route path="/explore-hackathons" element={<ExploreHackathons />} />
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
