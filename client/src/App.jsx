import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Providers
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { NotificationsProvider } from "./contexts/NotificationsContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ApplicationsProvider } from "./contexts/ApplicationsContext.jsx";
import { JobsProvider } from "./contexts/JobsContext.jsx";
import { MessagesProvider } from "./contexts/MessagesContext.jsx";

// Layout
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Companies from "./pages/Companies.jsx";
import Company from "./pages/Company.jsx";
import Network from "./pages/Network.jsx";
import Events from "./pages/Events.jsx";
import Messages from "./pages/Messages.jsx";
import Profile from "./pages/Profile.jsx";
import Applications from "./pages/Applications.jsx";
import AuthLogin from "./pages/AuthLogin.jsx";
import AuthRegister from "./pages/AuthRegister.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import NewJob from "./pages/NewJob.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";
import Following from "./pages/Following.jsx"; // ➕ faqe e re

// Routes helper (nëse e përdor)
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <ToastProvider>
      <NotificationsProvider>
        <AuthProvider>
          <ApplicationsProvider>
            <JobsProvider>
              <MessagesProvider>
                <Router>
                  <Navbar />
                  <Routes>
                    {/* Publike */}
                    <Route path="/" element={<Home />} />
                    <Route path="/punet" element={<Jobs />} />
                    <Route path="/punet/:id" element={<JobDetails />} />
                    <Route path="/te-ruajturat" element={<SavedJobs />} />
                    <Route path="/kompani" element={<Companies />} />
                    <Route path="/company/:id" element={<Company />} />
                    <Route path="/rrjeti" element={<Network />} />
                    <Route path="/ngjarje" element={<Events />} />
                    <Route path="/ndjekjet" element={<Following />} /> {/* ➕ rruga e re */}
                    <Route path="/login" element={<AuthLogin />} />
                    <Route path="/register" element={<AuthRegister />} />

                    {/* Vetëm kompani (shembull) */}
                    <Route
                      path="/punet/shto"
                      element={
                        <ProtectedRoute>
                          <NewJob />
                        </ProtectedRoute>
                      }
                    />

                    {/* Të mbrojtura */}
                    <Route
                      path="/feed"
                      element={
                        <ProtectedRoute>
                          <Feed />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/messages"
                      element={
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/applications"
                      element={
                        <ProtectedRoute>
                          <Applications />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/onboarding"
                      element={
                        <ProtectedRoute>
                          <Onboarding />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                  <Footer />
                </Router>
              </MessagesProvider>
            </JobsProvider>
          </ApplicationsProvider>
        </AuthProvider>
      </NotificationsProvider>
    </ToastProvider>
  );
}
