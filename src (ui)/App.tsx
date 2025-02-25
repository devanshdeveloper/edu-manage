import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { InstitutionsPage } from './pages/institutions/InstitutionsPage';
import { SubscriptionsPage } from './pages/subscriptions/SubscriptionsPage';
import { TeachersPage } from './pages/teachers/TeachersPage';
import { StudentsPage } from './pages/students/StudentsPage';
import { ClassroomsPage } from './pages/classrooms/ClassroomsPage';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { MaterialsPage } from './pages/materials/MaterialsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { TestsPage } from './pages/tests/TestsPage';
import { FeesPage } from './pages/fees/FeesPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Marketing Pages
import { LandingPage } from './pages/marketing/LandingPage';
import { FeaturesPage } from './pages/marketing/FeaturesPage';
import { PricingPage } from './pages/marketing/PricingPage';
import { ContactPage } from './pages/marketing/ContactPage';

// Onboarding Pages
import { OnboardingPage } from './pages/onboarding/OnboardingPage';

function App() {
  return (
    <NextUIProvider>
      <div className="light text-foreground bg-background">
        <AuthProvider>
          <Router>
            <Routes>
              {/* Marketing Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Onboarding Routes */}
              <Route
                path="/onboarding"
                element={<OnboardingPage />      }
              />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/institutions"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <InstitutionsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscriptions"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SubscriptionsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teachers"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TeachersPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <StudentsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/classrooms"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ClassroomsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AttendancePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fees"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <FeesPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/materials"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <MaterialsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tests"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TestsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SettingsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </NextUIProvider>
  );
}

export default App;