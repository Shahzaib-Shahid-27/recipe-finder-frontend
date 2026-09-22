import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:4000/api/v1";

      // Verify email with backend
      const response = await axios.post(
        `${API_URL}/auth/forgot-password`,
        {
          email: email.trim().toLowerCase(),
        }
      );

      console.log(
        "Email verification response:",
        response.data
      );

      // Navigate only if backend successfully verifies email
      navigate(
        `/reset-password?email=${encodeURIComponent(
          email.trim().toLowerCase()
        )}`
      );
    } catch (error) {
      console.log("Email verification error:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        setError(
          message ||
            "This email is not registered. Please check your email address."
        );
      } else {
        setError(
          "Unable to verify email. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F7F4EE] transition-colors duration-300 dark:bg-[#151A17]">

      {/* ================= HEADER ================= */}
      <header
        className="
          border-b
          border-[#E4DFD3]
          bg-white
          px-6
          py-4
          transition-colors
          duration-300
          dark:border-[#38433D]
          dark:bg-[#202923]
        "
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          {/* Logo */}
          <Link
            to="/hompage"
            className="
              font-serif
              text-2xl
              font-semibold
              text-[#1f3d2e]
              dark:text-[#E1E6E2]
            "
          >
            Butcher's Kitchen
            <span className="text-[#E8A33D]">
              Table
            </span>
          </Link>

          {/* Header Buttons */}
          <div className="flex items-center gap-3">

            {/* Dark Mode Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="
                rounded-full
                border
                border-[#E4DFD3]
                bg-[#FDFCF9]
                px-4
                py-2
                text-lg
                transition
                hover:bg-[#F7F4EE]
                dark:border-[#46534B]
                dark:bg-[#171D19]
                dark:hover:bg-[#29342E]
              "
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <section className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center">

            <h1
              className="
                font-serif
                text-3xl
                font-semibold
                text-[#2B2620]
                dark:text-[#E8A33D]
              "
            >
              Forgot password?
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#6B6656]
                dark:text-[#A8B0AA]
              "
            >
              Enter your email address to verify your
              account and reset your password.
            </p>

          </div>

          {/* Card */}
          <div
            className="
              mt-8
              rounded-2xl
              border
              border-[#E4DFD3]
              bg-white
              p-7
              shadow-sm
              transition-colors
              duration-300
              dark:border-[#38433D]
              dark:bg-[#202923]
            "
          >

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <label className="block">

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#2B2620]
                    dark:text-[#E1E6E2]
                  "
                >
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-[#E4DFD3]
                    bg-[#FDFCF9]
                    px-4
                    py-3
                    text-sm
                    text-[#2B2620]
                    outline-none
                    transition

                    placeholder:text-[#9B9688]

                    focus:border-[#1f3d2e]
                    focus:ring-2
                    focus:ring-[#1f3d2e]/10

                    dark:border-[#46534B]
                    dark:bg-[#171D19]
                    dark:text-[#E1E6E2]
                    dark:placeholder:text-[#777F79]

                    dark:focus:border-[#E8A33D]
                    dark:focus:ring-[#E8A33D]/10
                  "
                />

              </label>

              {/* Error */}
              {error && (
                <div
                  className="
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    dark:border-red-900
                    dark:bg-red-950/40
                  "
                >
                  <p
                    className="
                      text-sm
                      text-red-600
                      dark:text-red-400
                    "
                  >
                    {error}
                  </p>
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-full
                  bg-[#E8A33D]
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all

                  hover:bg-[#d88d1d]
                  hover:shadow-md

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  dark:text-black
                  dark:hover:text-white
                "
              >
                {loading
                  ? "Verifying..."
                  : "Verify Email"}
              </button>

            </form>

            {/* Back to Login */}
            <div className="mt-7 text-center">

              <Link
                to="/login"
                className="
                  text-sm
                  font-semibold
                  text-[#1f3d2e]
                  transition-colors
                  hover:text-[#E8A33D]
                  dark:text-[#E8A33D]
                "
              >
                ← Back to login
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className="
          border-t
          border-[#E4DFD3]
          bg-white
          px-6
          py-6
          transition-colors
          duration-300
          dark:border-[#38433D]
          dark:bg-[#202923]
        "
      >
        <div className="mx-auto max-w-6xl text-center">

          <p
            className="
              text-sm
              text-[#6B6656]
              dark:text-[#A8B0AA]
            "
          >
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#1f3d2e] dark:text-[#E8A33D]">
              Butcher's Kitchen
            </span>
            . All rights reserved.
          </p>

        </div>
      </footer>

    </main>
  );
}
