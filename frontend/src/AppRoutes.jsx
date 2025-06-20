import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import PostProject from "./pages/PostProject";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

