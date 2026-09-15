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
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function getInitialDarkMode() {
  const saved = localStorage.getItem("harvesttable-theme");
  const dark =
    saved === "dark" ||
    (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", dark);
  return dark;
}

const links = [
  { to: "/MenuPage", label: "Menu" },
  { to: "/MealsPage", label: "Meals" },
  { to: "/CategoryPage", label: "Categories" },
  { to: "/SearchPage", label: "Search" },
];

export default function Header() {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const closeMenu = () => setMobileOpen(false);

  const toggleTheme = () => {
    const dark = !darkMode;
    setDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("harvesttable-theme", dark ? "dark" : "light");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "text-[#E8A33D]"
        : "text-white hover:text-[#E8A33D] dark:text-[#F4F1E8]"
    }`;

  const buttonClass =
"inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1F3D2E] shadow-sm dark:border-[#30382F] dark:bg-[#2E2A1E]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/hompage"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8A33D] text-white shadow-sm"
            >
              <ChefHat size={25} />
            </motion.div>

            <div>
              <h1 className="font-serif text-xl font-bold leading-none text-white sm:text-2xl">
                Butcher's Kitchen
              </h1>
              <p className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 sm:block">
                Recipes & Flavors
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <NavLink to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Link
            to="/SearchPage"
            aria-label="Search"
            className="hidden rounded-full p-2.5 text-white transition-all duration-200 ease-in
            bg-white 
             hover:bg-[black] hover:text-[#1F3D2E] sm:flex"
          >
            <Search size={20} />
          </Link>

          {/* Auth */}
          <div className="hidden items-center gap-2 lg:flex">
            {!isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className={`${buttonClass} border border-white/20 bg-white text-[#1F3D2E] hover:bg-[black]
                     hover:text-white`}
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className={`${buttonClass} border border-white/20 bg-white text-[#1F3D2E] hover:bg-[black]
                     hover:text-white`}>
                    <UserPlus size={16} />
                    Sign Up
                  </Link>
                </motion.div>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className={`${buttonClass} bg-white text-[#1F3D2E] hover:bg-red-500 hover:text-white`}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            )}
          </div>

          {/* Theme */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1F3D2E] shadow-sm dark:bg-[#1C241E] dark:text-[#F4F1E8]"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </motion.button>

          {/* Mobile Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1F3D2E] md:hidden dark:bg-[#1C241E] dark:text-[#F4F1E8]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#F7F4EE] dark:border-[#30382F] dark:bg-[#121914] md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#E8A33D]/10 text-[#E8A33D]"
                        : "text-[#1F3D2E] hover:bg-[#E8A33D]/10 dark:text-[#F4F1E8]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {!isAuthenticated ? (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#E4DFD3] pt-3 ">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`${buttonClass} border-[#E4DFD3] bg-white text-[#1F3D2E] dark:hover:text-black dark:bg-[white] transition-all duration-200 ease-in-out`}
                  >
                    <LogIn size={16} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={`${buttonClass} border-[#E4DFD3] bg-white text-[#1F3D2E] dark:hover:text-black dark:bg-[white] transition-all duration-200 ease-in-out`}
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className={`${buttonClass} mt-2 w-full border border-red-300 text-red-600 
                  cursor-pointer
                    `}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}