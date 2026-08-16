import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import { seedDatabase } from './services/firestore';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './admin/components/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminBanners } from './admin/pages/AdminBanners';
import { AdminApplications } from './admin/pages/AdminApplications';
import { AdminProjects } from './admin/pages/AdminProjects';
import { AdminServices } from './admin/pages/AdminServices';
import { AdminAbout } from './admin/pages/AdminAbout';
import { AdminMessages } from './admin/pages/AdminMessages';
import { AdminMedia } from './admin/pages/AdminMedia';
import { AdminSettings } from './admin/pages/AdminSettings';

export default function App() {
  useEffect(() => {
    // Seed initial data if Firestore collections are empty
    seedDatabase().catch((err) => {
      console.warn('Initial seeding note:', err);
    });
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Website Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/applications" element={<ApplicationsPage />} />
                  <Route path="/applications/:id" element={<ApplicationDetailPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Route>

                {/* Admin Authentication */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Dashboard & Management CMS */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="banners" element={<AdminBanners />} />
                  <Route path="applications" element={<AdminApplications />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="about" element={<AdminAbout />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="media" element={<AdminMedia />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
