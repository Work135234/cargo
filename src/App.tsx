// // import React from 'react';
// // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // import { NotificationProvider } from './contexts/NotificationContext';
// // import AuthContainer from './components/auth/AuthContainer';
// // import Dashboard from './components/Dashboard';
// // import ErrorBoundary from './components/ErrorBoundary';
// // import { Layout } from './components/Layout';

// // const AppContent: React.FC = () => {
// //   const { isAuthenticated, loading } = useAuth();

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   return isAuthenticated ? <Layout> <Dashboard /></Layout> : <AuthContainer />;
// // };

// // const App: React.FC = () => {
// //   return (
// //     <ErrorBoundary>
// //       <AuthProvider>
// //         <NotificationProvider>
// //           <AppContent />
// //         </NotificationProvider>
// //       </AuthProvider>
// //     </ErrorBoundary>
// //   );
// // };

// // export default App;




// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { NotificationProvider } from './contexts/NotificationContext';
// import AuthContainer from './components/auth/AuthContainer';
// import Dashboard from './components/Dashboard';
// import ErrorBoundary from './components/ErrorBoundary';
// import { Layout } from './components/Layout';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
// };

// const AppContent: React.FC = () => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (

//     <Routes>
//       <Route path="/login" element={!isAuthenticated ? <AuthContainer /> : <Navigate to="/dashboard" replace />} />
//       <Route path="/register" element={!isAuthenticated ? <AuthContainer /> : <Navigate to="/dashboard" replace />} />
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route
//         path="/dashboard/*"
//         element={
//           <ProtectedRoute>
//             <Layout>
//               <Dashboard />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>








import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/Dashboard';
import Deliveries from './components/dispatcher/Deliveries';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ErrorBoundary from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import Tracking from './pages/customer/Tracking';
import Index from './pages/Index';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';
import Reports from './pages/admin/Reports';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrainSchedules from './pages/admin/TrainSchedules';
import AssignTrainSchedule from './pages/admin/AssignTrainSchedule';
import NotificationPermission from './components/NotificationPermission';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh-gradient">
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Authenticating...</h3>
            <p className="text-muted-foreground">Please wait while we verify your credentials</p>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh-gradient">
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary mx-auto"></div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Loading CargoStream</h2>
            <p className="text-muted-foreground">Preparing your logistics platform...</p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="h-1 w-8 bg-primary/30 rounded-full">
              <div className="h-1 bg-primary rounded-full animate-loading"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <AuthContainer /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Redirect /admin to /admin/dashboard for correct login navigation */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/" element={<Layout><Index /></Layout>} />
        {/* Dispatcher My Deliveries route */}
        <Route
          path="/dispatcher/deliveries"
          element={
            <ProtectedRoute>
              <Layout>
                <Deliveries />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <Layout>
                <Tracking />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageBookings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageUsers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/train-schedules"
          element={
            <ProtectedRoute>
              <Layout>
                <TrainSchedules />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assign-train-schedule"
          element={
            <ProtectedRoute>
              <Layout>
                <AssignTrainSchedule />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NotificationPermission />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;