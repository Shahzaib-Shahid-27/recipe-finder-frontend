
import { lazy, Suspense } from "react";
import {BrowserRouter,Routes,Route,Outlet,} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import ScrollToTop from "./components/ScrollToTop";

// Auth Pages
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

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

// Main Layout
// Header + Footer will only appear on protected pages
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

          {/* Scroll to top whenever route changes */}
          <ScrollToTop />

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>

              {/* AUTHENTICATION PAGES */}

              <Route
                path="/"
                element={<LoginPage />}
              />

              <Route
                path="/login"
                element={<LoginPage />}
              />

              <Route
                path="/register"
                element={<RegisterPage />}
              />

              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
              />

              <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
              />


              {/* PROTECTED PAGES - Login Required */}

              <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                  {/* Home */}
                  <Route
                    path="/hompage"
                    element={<HomePage />}
                  />

                  {/* Menu */}
                  <Route
                    path="/MenuPage"
                    element={<MenuPage />}
                  />

                  {/* Categories */}
                  <Route
                    path="/CategoryPage"
                    element={<CategoryPage />}
                  />

                  {/* Meals of Category */}
                  <Route
                    path="/category/:category"
                    element={<CategoryMealsPage />}
                  />

                  {/* All Meals */}
                  <Route
                    path="/MealsPage"
                    element={<MealsPage />}
                  />

                  {/* Meal Ingredients / Details */}
                  <Route
                    path="/ingredients/:id"
                    element={<IngredientsPage />}
                  />

                  {/* Search */}
                  <Route
                    path="/SearchPage"
                    element={<SearchPage />}
                  />

                </Route>

              </Route>

            </Routes>
          </Suspense>

        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
