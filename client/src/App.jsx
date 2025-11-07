import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Jobs from "./pages/Jobs.jsx";
import Companies from "./pages/Companies.jsx";
import Network from "./pages/Network.jsx";
import Events from "./pages/Events.jsx";
import Messages from "./pages/Messages.jsx";
import Profile from "./pages/Profile.jsx";
import Company from "./pages/Company.jsx";
import AuthLogin from "./pages/AuthLogin.jsx";
import AuthRegister from "./pages/AuthRegister.jsx";
import Onboarding from "./pages/Onboarding.jsx";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/feed" element={
              <ProtectedRoute><Feed/></ProtectedRoute>
            } />
            <Route path="/onboarding" element={
              <ProtectedRoute><Onboarding/></ProtectedRoute>
            } />
            <Route path="/punet" element={<Jobs/>} />
            <Route path="/kompani" element={<Companies/>} />
            <Route path="/company/:id" element={<Company/>} />
            <Route path="/rrjeti" element={<Network/>} />
            <Route path="/ngjarje" element={<Events/>} />
            <Route path="/messages" element={
              <ProtectedRoute><Messages/></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile/></ProtectedRoute>
            } />
            <Route path="/login" element={<AuthLogin/>} />
            <Route path="/register" element={<AuthRegister/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}
