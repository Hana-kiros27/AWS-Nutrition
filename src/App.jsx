import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import MealPlanPage from './pages/MealPlanPage';
// import confirmSignUp from './pages/ConfirmSignupPage';
import ConfirmSignupPage from './pages/ConfirmSignupPage';
import MealTrackerPage from './pages/MealTrackerPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />

          <main className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/confirm-signup" element={<ConfirmSignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                }
              />

     <Route
                path="/meal-plans"
                element={
                  <ProtectedRoute>
                    <MealPlanPage />
                  </ProtectedRoute>
                }
              />

               <Route
                path="/meal-tracker"
                element={
                  <ProtectedRoute>
                    <MealTrackerPage />
                  </ProtectedRoute>
                }
              />
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
