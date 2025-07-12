import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexWithAuth from "./pages/IndexWithAuth";
import Discover from "./pages/Discover";
import MatchesWithAuth from "./pages/MatchesWithAuth";
import HowItWorks from "./pages/HowItWorks";
import SuccessStories from "./pages/SuccessStories";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ContentModeration from "./pages/admin/ContentModeration";
import { AdminAuthProvider } from "./hooks/useAdminAuth";
import { AuthProvider } from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user: currentUser, onLogin, onRegister, onLogout } = useAuth();

  return (
    <AdminAuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexWithAuth />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<MatchesWithAuth />} />
          <Route
            path="/how-it-works"
            element={
              <HowItWorks
                currentUser={currentUser}
                onLogin={onLogin}
                onRegister={onRegister}
                onLogout={onLogout}
              />
            }
          />
          <Route
            path="/success-stories"
            element={
              <SuccessStories
                currentUser={currentUser}
                onLogin={onLogin}
                onRegister={onRegister}
                onLogout={onLogout}
              />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="moderation" element={<ContentModeration />} />
            <Route
              path="swaps"
              element={
                <div className="p-8">
                  <h1 className="text-2xl">Swap Monitoring - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="communications"
              element={
                <div className="p-8">
                  <h1 className="text-2xl">Communications - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="reports"
              element={
                <div className="p-8">
                  <h1 className="text-2xl">
                    Reports & Analytics - Coming Soon
                  </h1>
                </div>
              }
            />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;