import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChefHat,
  Menu,
  Moon,
  Search,
  Sun,
  X,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function getInitialDarkMode(): boolean {
  const savedTheme = localStorage.getItem("harvesttable-theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    return true;
  }

  if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
    return false;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (prefersDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return prefersDark;
}

export default function Header() {
  const [darkMode, setDarkMode] = useState<boolean>(
    getInitialDarkMode
  );

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState<boolean>(false);

  const { isAuthenticated, logout } = useAuth();

  // =========================
  // Dark / Light Mode
  // =========================
  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("harvesttable-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("harvesttable-theme", "light");
    }
  };

  // =========================
  // Close Mobile Menu
  // =========================
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  // =========================
  // Navigation Styling
  // =========================
  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? "text-[#E8A33D]"
        : "text-[#1F3D2E] hover:text-[#E8A33D] dark:text-[#F4F1E8]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4DFD3] bg-[#F7F4EE] transition-colors duration-300 dark:border-[#30382F] dark:bg-[#121914]">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =========================
            LOGO
        ========================== */}
        <Link
          to="/hompage"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8A33D] text-white shadow-sm">
            <ChefHat size={25} strokeWidth={2} />
          </div>

          <div>
            <h1 className="font-serif text-xl font-bold leading-none text-[#1F3D2E] transition-colors duration-300 dark:text-[#F4F1E8] sm:text-2xl">
              Butcher's Kitchen
            </h1>

            <p className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[#6B6656] dark:text-[#B8B5A8] sm:block">
              Recipes & Flavors
            </p>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav className="hidden items-center gap-1 md:flex">

          <NavLink
            to="/MenuPage"
            className={navLinkClass}
          >
            Menu
          </NavLink>

          <NavLink
            to="/MealsPage"
            className={navLinkClass}
          >
            Meals
          </NavLink>

          <NavLink
            to="/CategoryPage"
            className={navLinkClass}
          >
            Categories
          </NavLink>

          <NavLink
            to="/SearchPage"
            className={navLinkClass}
          >
            Search
          </NavLink>

        </nav>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-2">

          {/* Search */}
          <Link
            to="/SearchPage"
            aria-label="Search"
            className="hidden rounded-full p-2.5 text-[#1F3D2E] transition-colors hover:bg-[#E8A33D]/10 hover:text-[#E8A33D] dark:text-[#F4F1E8] sm:flex"
          >
            <Search size={20} />
          </Link>

          {/* =========================
              LOGIN / SIGN UP
          ========================== */}
          {!isAuthenticated && (
            <div className="hidden items-center gap-2 lg:flex">

              {/* Login */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-[#1F3D2E]/20 bg-white px-4 py-2 text-sm font-semibold text-[#1F3D2E] shadow-sm transition-all duration-200 hover:border-[#E8A33D] hover:bg-[#E8A33D] hover:text-white dark:border-[#30382F] dark:bg-[#1C241E] dark:text-[#F4F1E8] dark:hover:border-[#E8A33D] dark:hover:bg-[#E8A33D] dark:hover:text-white"
              >
                <LogIn size={16} />
                Login
              </Link>

              {/* Sign Up */}
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#1F3D2E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#E8A33D] dark:bg-[#E8A33D] dark:text-[#1F3D2E] dark:hover:bg-[#F0B65A]"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>

            </div>
          )}

          {/* =========================
              LOGOUT
          ========================== */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-full border border-[#1F3D2E]/20 bg-white px-4 py-2 text-sm font-semibold text-[#1F3D2E] shadow-sm transition-all duration-200 hover:border-red-400 hover:bg-red-500 hover:text-white dark:border-[#30382F] dark:bg-[#1C241E] dark:text-[#F4F1E8] dark:hover:border-red-400 dark:hover:bg-red-500 dark:hover:text-white lg:flex"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          {/* =========================
              DARK / LIGHT BUTTON
          ========================== */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DFD3] bg-white text-[#1F3D2E] shadow-sm transition-all duration-300 hover:border-[#E8A33D] hover:text-[#E8A33D] dark:border-[#30382F] dark:bg-[#1C241E] dark:text-[#F4F1E8]"
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((previous) => !previous)
            }
            aria-label={
              mobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DFD3] bg-white text-[#1F3D2E] transition-colors hover:border-[#E8A33D] hover:text-[#E8A33D] dark:border-[#30382F] dark:bg-[#1C241E] dark:text-[#F4F1E8] md:hidden"
          >
            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E4DFD3] bg-[#F7F4EE] px-4 pb-5 pt-3 transition-colors duration-300 dark:border-[#30382F] dark:bg-[#121914] md:hidden">

          <nav className="mx-auto flex max-w-7xl flex-col gap-1">

            {/* Menu */}
            <NavLink
              to="/MenuPage"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#E8A33D]/10 text-[#E8A33D]"
                    : "text-[#1F3D2E] hover:bg-[#E8A33D]/10 hover:text-[#E8A33D] dark:text-[#F4F1E8]"
                }`
              }
            >
              Menu
            </NavLink>

            {/* Meals */}
            <NavLink
              to="/MealsPage"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#E8A33D]/10 text-[#E8A33D]"
                    : "text-[#1F3D2E] hover:bg-[#E8A33D]/10 hover:text-[#E8A33D] dark:text-[#F4F1E8]"
                }`
              }
            >
              Meals
            </NavLink>

            {/* Categories */}
            <NavLink
              to="/CategoryPage"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#E8A33D]/10 text-[#E8A33D]"
                    : "text-[#1F3D2E] hover:bg-[#E8A33D]/10 hover:text-[#E8A33D] dark:text-[#F4F1E8]"
                }`
              }
            >
              Categories
            </NavLink>

            {/* Search */}
            <NavLink
              to="/SearchPage"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#E8A33D]/10 text-[#E8A33D]"
                    : "text-[#1F3D2E] hover:bg-[#E8A33D]/10 hover:text-[#E8A33D] dark:text-[#F4F1E8]"
                }`
              }
            >
              <span className="flex items-center gap-2">
                <Search size={17} />
                Search
              </span>
            </NavLink>

            {/* =========================
                MOBILE AUTH
            ========================== */}

            {!isAuthenticated && (
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#E4DFD3] pt-3 dark:border-[#30382F]">

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#1F3D2E]/20 bg-white px-4 py-3 text-sm font-semibold text-[#1F3D2E] transition-all hover:border-[#E8A33D] hover:bg-[#E8A33D] hover:text-white dark:border-[#30382F] dark:bg-[#1C241E] dark:text-[#F4F1E8] dark:hover:bg-[#E8A33D] dark:hover:text-white"
                >
                  <LogIn size={16} />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#1F3D2E] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#E8A33D] dark:bg-[#E8A33D] dark:text-[#1F3D2E]"
                >
                  <UserPlus size={16} />
                  Sign Up
                </Link>

              </div>
            )}

            {/* Mobile Logout */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-500 hover:text-white dark:border-red-900 dark:bg-[#1C241E] dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
              >
                <LogOut size={17} />
                Logout
              </button>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}