import React from "react";
import { Routes, Route } from "react-router-dom";

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
      <Route path="/" element={<Layout><Landing /></Layout>} />
      <Route path="/explore" element={<Layout><Explore /></Layout>} />
      <Route path="/explore-projects" element={<Layout><ExploreProjects /></Layout>} />
      <Route path="/messages" element={<Layout><Messages /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/create-profile" element={<Layout><CreateProfile /></Layout>} />
      <Route path="/post-project" element={<Layout><PostProjectPage /></Layout>} />
      <Route path="/my-projects" element={<Layout><MyProjectsPage /></Layout>} />
      <Route path="/my-invites" element={<Layout><MyInvites /></Layout>} /> {/* ✅ NEW */}
    </Routes>
  );
}