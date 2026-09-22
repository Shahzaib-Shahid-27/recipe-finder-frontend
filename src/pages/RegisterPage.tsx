import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { RegisterForm } from "../types/auth";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface RegisterPageForm extends RegisterForm {
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [form, setForm] = useState<RegisterPageForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/hompage");
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        setError(
          err.response?.data?.message ||
            "Unable to create your account."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to create your account.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F7F4EE] transition-colors duration-300 dark:bg-[#151A17]">

      {/* Header */}
      <header className="border-b border-[#E4DFD3] bg-white px-6 py-4 transition-colors duration-300 dark:border-[#38433D] dark:bg-[#202923]">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/hompage"
            className="font-serif text-2xl font-semibold text-[#1f3d2e] dark:text-[#E1E6E2]"
          >
            Butcher's
            <span className="ml-2 text-[#E8A33D]">
              Kitchen
            </span>
          </Link>

          {/* Header Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="rounded-full border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-2 text-lg transition hover:bg-[#F7F4EE] dark:border-[#46534B] dark:bg-[#171D19] dark:hover:bg-[#29342E]"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>


          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Logo / Heading */}
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold text-[#2B2620] dark:text-[#E8A33D]">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#6B6656] dark:text-[#A8B0AA]">
              Join Butcher's Kitchen and discover
              delicious meals.
            </p>
          </div>

          {/* Register Card */}
          <div className="mt-8 rounded-2xl border border-[#E4DFD3] bg-white p-7 shadow-sm transition-colors duration-300 dark:border-[#38433D] dark:bg-[#202923]">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620] dark:text-[#E1E6E2]">
                  Full name
                </span>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition placeholder:text-[#8A8577] focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10 dark:border-[#46534B] dark:bg-[#171D19] dark:text-[#E1E6E2] dark:placeholder:text-[#7F8982] dark:focus:border-[#E8A33D] dark:focus:ring-[#E8A33D]/10"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620] dark:text-[#E1E6E2]">
                  Email
                </span>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition placeholder:text-[#8A8577] focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10 dark:border-[#46534B] dark:bg-[#171D19] dark:text-[#E1E6E2] dark:placeholder:text-[#7F8982] dark:focus:border-[#E8A33D] dark:focus:ring-[#E8A33D]/10"
                />
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620] dark:text-[#E1E6E2]">
                  Password
                </span>

                <div className="relative mt-2">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 pr-12 text-sm text-[#2B2620] outline-none transition placeholder:text-[#8A8577] focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10 dark:border-[#46534B] dark:bg-[#171D19] dark:text-[#E1E6E2] dark:placeholder:text-[#7F8982] dark:focus:border-[#E8A33D] dark:focus:ring-[#E8A33D]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6656] hover:text-[#1f3d2e] dark:text-[#A8B0AA] dark:hover:text-[#E8A33D]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-[#8A8577] dark:text-[#7F8982]">
                  Use at least 6 characters.
                </p>
              </label>

              {/* Confirm Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620] dark:text-[#E1E6E2]">
                  Confirm password
                </span>

                <div className="relative mt-2">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 pr-12 text-sm text-[#2B2620] outline-none transition placeholder:text-[#8A8577] focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10 dark:border-[#46534B] dark:bg-[#171D19] dark:text-[#E1E6E2] dark:placeholder:text-[#7F8982] dark:focus:border-[#E8A33D] dark:focus:ring-[#E8A33D]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6656] hover:text-[#1f3d2e] dark:text-[#A8B0AA] dark:hover:text-[#E8A33D]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/30">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#E8A33D] py-3 text-sm font-semibold text-white transition-all duration-100 hover:bg-[#d88d1d] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:text-black dark:hover:text-white"
              >
                {loading
                  ? "Creating account..."
                  : "Create account"}
              </button>
            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-[#6B6656] dark:text-[#A8B0AA]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#1f3d2e] transition-colors hover:text-[#E8A33D] dark:text-[#E8A33D]"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4DFD3] bg-white px-6 py-6 transition-colors duration-300 dark:border-[#38433D] dark:bg-[#202923]">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-[#6B6656] dark:text-[#A8B0AA]">
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
