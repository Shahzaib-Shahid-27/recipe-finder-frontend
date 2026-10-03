import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import ScrollToTop from "./components/ScrollToTop";

// Auth Pages
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const GoogleCallbackPage = lazy(() => import("./pages/GoogleCallbackPage"));

// Main Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));

import CategoryPage from "./pages/CategoryPage";
import CategoryMealsPage from "./pages/CategoryMealsPage";
import MealsPage from "./pages/MealsPage";

const IngredientsPage = lazy(() => import("./pages/IngredientsPage"));

import SearchPage from "./pages/SearchPage";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import GoogleSuccessPage from "./pages/GoogleSuccessPage";
// Header + Footer only appear on protected pages
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* AUTHENTICATION PAGES */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/google-success"element={<GoogleSuccessPage />}/>
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Google OAuth callback (must be public) */}
              <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />

              {/* PROTECTED PAGES - Login Required */}
              <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/hompage" element={<HomePage />} />
                    <Route path="/MenuPage" element={<MenuPage />} />
                    <Route path="/CategoryPage" element={<CategoryPage />} />
                    <Route path="/category/:category" element={<CategoryMealsPage />} />
                    <Route path="/MealsPage" element={<MealsPage />} />
                    <Route path="/ingredients/:id" element={<IngredientsPage />} />
                    <Route path="/SearchPage" element={<SearchPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                  </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}