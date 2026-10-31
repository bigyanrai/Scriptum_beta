import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import BlogLandingPage from "./Pages/Blog/BlogLandingPage";
import BlogPostView from "./Pages/Blog/BlogPostView";
import PostByTags from "./Pages/Blog/PostByTags";
import SearchPosts from "./Pages/Blog/SearchPosts";

import AdminLogin from "./Pages/Admin/AdminLogin";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import BlogPost from "./Pages/Admin/BlogPost";
import BlogPostEditor from "./Pages/Admin/BlogPostEditor";
import Comments from "./Pages/Admin/Comments";
import Members from "./Pages/Admin/Members";
import AdminSearchResults from "./Pages/Admin/AdminSearchResults";

import UserProvider from "./context/userContext";

import ResetPassword from "./components/Auth/AdminResetPassword";
import ResetPasswordMember from "./components/Auth/ResetPasswordMember";
import BackToTop from "./components/BackToTop";

import Explore from "./Pages/Blog/Explore";
import ExploreCollection from "./Pages/Blog/ExploreCollection";
import TrendingPage from "./Pages/Blog/TrendingPage";
import SavedPostsPage from "./Pages/Blog/SavedPostPage";

import NotFound from "./Pages/NotFound";
import MyPosts from "./Pages/User/MyPosts";
import MemberPostEditor from "./Pages/User/MemberPostEditor";

import ActivityPage from "./Pages/User/ActivityPage";
import NotificationsPage from "./Pages/User/Notification";
import { NotificationProvider } from "./context/notificationContext";

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <div>
          <Router>
            <Routes>
              {/* ================= PUBLIC ROUTES ================= */}

              <Route path="/" element={<BlogLandingPage />} />

              {/* Blog post route */}
              <Route path="/:slug" element={<BlogPostView />} />

              <Route path="/tags/:tagName" element={<PostByTags />} />

              <Route path="/search" element={<SearchPosts />} />

              <Route path="/explore" element={<Explore />} />

              <Route
                path="/explore/:clusterId"
                element={<ExploreCollection />}
              />

              <Route path="/trending" element={<TrendingPage />} />

              <Route path="/saved-posts" element={<SavedPostsPage />} />

              {/* ================= AUTH ROUTES ================= */}

              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              <Route
                path="/reset-password-member/:token"
                element={<ResetPasswordMember />}
              />

              <Route path="/admin-login" element={<AdminLogin />} />

              {/* ================= ADMIN ROUTES ================= */}

              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />

                <Route path="/admin/posts" element={<BlogPost />} />

                <Route path="/admin/create" element={<BlogPostEditor />} />

                <Route path="/admin/search" element={<AdminSearchResults />} />

                <Route
                  path="/admin/edit/:postSlug"
                  element={<BlogPostEditor isEdit={true} />}
                />

                <Route path="/admin/comments" element={<Comments />} />

                <Route path="/admin/members" element={<Members />} />
              </Route>

              {/* ================= MEMBER ROUTES ================= */}

              <Route path="/posts" element={<MyPosts />} />

              <Route path="/posts/create" element={<MemberPostEditor />} />

              <Route
                path="/posts/edit/:postId"
                element={<MemberPostEditor isEdit={true} />}
              />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* ================= GLOBAL 404 ================= */}

              <Route path="*" element={<NotFound />} />
            </Routes>

            <BackToTop />
          </Router>

          {/* ================= TOASTER ================= */}

          <Toaster
            position="top-right"
            gutter={12}
            reverseOrder={false}
            toastOptions={{
              duration: 3500,

              style: {
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: 500,
                boxShadow:
                  "0 10px 30px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.05)",
              },

              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#ffffff",
                },
              },

              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },

              loading: {
                iconTheme: {
                  primary: "#3b82f6",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </div>
      </NotificationProvider>
    </UserProvider>
  );
};

export default App;
