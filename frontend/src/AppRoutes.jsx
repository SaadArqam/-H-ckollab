// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Import pages
// import Landing from "./pages/Landing";
// import Explore from "./pages/Explore";
// import PostProject from "./pages/PostProject";
// import Messages from "./pages/Messages";
// import Profile from "./pages/Profile";
// import Layout from "./layout/Layout";

// export default function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/post-project" element={<PostProject />} />
//         <Route path="/messages" element={<Messages />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// Pages
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import PostProject from "./pages/PostProject";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
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
          path="/post-project"
          element={
            <Layout>
              <PostProject />
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
      </Routes>
    </Router>
  );
}
