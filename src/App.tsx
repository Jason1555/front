import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { ClubDashboard } from './pages/ClubDashboard';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/Shared/ProtectedRoute';
import { FestivalForm } from './components/Organizer/FestivalForm';
import { ApplicationForm } from './components/Club/ApplicationForm';
import { Layout } from './components/Layout';

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Редирект с главной страницы */}
        <Route
          path="/"
          element={
            user ? (
              user.role === 'organizer' ? (
                <Navigate to="/organizer/festivals" replace />
              ) : (
                <Navigate to="/club/profile" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Маршруты организатора */}
        <Route
          path="/organizer"
          element={
            <ProtectedRoute requiredRole="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/festivals"
          element={
            <ProtectedRoute requiredRole="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/festivals/create"
          element={
            <ProtectedRoute requiredRole="organizer">
              <Layout>
                <FestivalForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/applications"
          element={
            <ProtectedRoute requiredRole="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Маршруты клуба */}
        <Route
          path="/club"
          element={
            <ProtectedRoute requiredRole="club">
              <ClubDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club/profile"
          element={
            <ProtectedRoute requiredRole="club">
              <ClubDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club/festivals"
          element={
            <ProtectedRoute requiredRole="club">
              <ClubDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club/festivals/:festivalId/apply"
          element={
            <ProtectedRoute requiredRole="club">
              <Layout>
                <ApplicationForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/club/applications"
          element={
            <ProtectedRoute requiredRole="club">
              <ClubDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 страница */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
