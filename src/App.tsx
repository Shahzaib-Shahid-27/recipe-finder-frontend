import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import CategoryPage from "./pages/CategoryPage";
import CategoryMealsPage from "./pages/CategoryMealsPage";
import MealsPage from "./pages/MealsPage";
import IngredientsPage from "./pages/IngredientsPage";

import SearchPage from "./pages/SearchPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">

          {/* Header */}
          <Header />

            {/* Pages */}
            <main className="flex-1">
              <Routes>

                {/* AUTHENTICATION */}
                <Route path="/" element={<RegisterPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />}/>

                {/* HOME */}
                <Route  path="/hompage" element={<HomePage />} />

                {/* MENU */}
                <Route path="/MenuPage" element={<MenuPage />} />

                {/* ALL CATEGORIES */}
                <Route path="/CategoryPage" element={<CategoryPage />}/>

                {/* MEALS OF A CATEGORY */}
                <Route path="/category/:category" element={<CategoryMealsPage />}/>

                {/* ALL MEALS */}
                <Route path="/MealsPage" element={<MealsPage />}/>

                {/*  MEAL DETAILS / INGREDIENTS */}
                <Route path="/ingredients/:id" element={<IngredientsPage />}/>

                {/* SEARCH */}
                <Route path="/SearchPage" element={<SearchPage />}/>
              </Routes>
            </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}