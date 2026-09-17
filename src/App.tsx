
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Auth Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Main Pages
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CategoryMealsPage from "./pages/CategoryMealsPage";
import MealsPage from "./pages/MealsPage";
import IngredientsPage from "./pages/IngredientsPage";
import SearchPage from "./pages/SearchPage";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";


// ==========================================
// Main Layout
// Header + Footer will only appear here
// ==========================================

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


// ==========================================
// App
// ==========================================

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =================================
              AUTHENTICATION PAGES
              No Header / Footer
          ================================= */}

          <Route path="/" element={<LoginPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />


          {/* =================================
              PROTECTED PAGES
              Login Required
          ================================= */}

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
      </BrowserRouter>
    </AuthProvider>
  );
}
