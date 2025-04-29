import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Global CSS
// import Header from "../header/Header";
import Sidebar from "../sideBar/Sidebar";
import MobileNav from "../sideBar/MobileNav";
import EnrollMember from "./DashBoard/EnrollMember";
import Dashboard from "./DashBoard/Dashboard";
import Header from "../header/Header";
import RegisterOwner from "./DashBoard/RegisterOwner";
import LoginForm from "./DashBoard/login";
import { ErrorBoundary } from "./DashBoard/GymMemberList";
import ProtectedRoute from "./DashBoard/ProtectedRoute";
import Exercise from "./DashBoard/Exercise";
import Goal from "./DashBoard/Goal";
import Settings from "./DashBoard/Settings";
import Information from "./DashBoard/Information";
import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkInitialAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/check-auth", {
          withCredentials: true
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    
    checkInitialAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar - Hidden on mobile */}
            {isAuthenticated && (
              <div className="hidden md:block lg:block h-screen sticky top-0">
                <Sidebar onLogout={handleLogout} />
              </div>
            )}
            
            {/* Main Content */}
            <div className="flex-1">
              {isAuthenticated && <Header onLogout={handleLogout} />}
              <div className="pb-16 md:pb-0"> {/* Add padding bottom for mobile nav */}
                <Routes>
                  <Route path="/register" element={<RegisterOwner />} />
                  <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/enroll"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                        <EnrollMember />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/exercise"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                        <Exercise />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/goal"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                        <Goal />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/information"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                        <Information />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>

          {/* Mobile Navigation - Only visible on mobile */}
          {isAuthenticated && <MobileNav onLogout={handleLogout} />}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
