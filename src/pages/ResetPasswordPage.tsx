import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { darkMode, toggleDarkMode } = useTheme();

  // Get email from:
  // /reset-password?email=user@example.com
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleEmailChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setEmail(e.target.value);
  }

  function handleNewPasswordChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setNewPassword(e.target.value);
  }

  function handleConfirmPasswordChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setConfirmPassword(e.target.value);
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check email
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    // Check new password
    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    // Password length
    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters long."
      );
      return;
    }

    // Confirm password
    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    // Check passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:4000/api/v1";

      await axios.post(
        `${API_URL}/auth/reset-password`,
        {
          email: email.trim().toLowerCase(),
          newPassword,
        }
      );

      setSuccess(
        "Your password has been reset successfully. Redirecting to login..."
      );

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      console.log(err);

      if (
        axios.isAxiosError<{ message?: string }>(err)
      ) {
        setError(
          err.response?.data?.message ||
            "Unable to reset password."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to reset password.");
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
            Butcher's
            <span className="ml-2 text-[#E8A33D]">
              Kitchen
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
              Reset password
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
              Your email has been verified. Choose a
              new password for your account.
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
                  Verified Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
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

              {/* New Password */}
              <label className="block">

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#2B2620]
                    dark:text-[#E1E6E2]
                  "
                >
                  New password
                </span>

                <div className="relative mt-2">

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    required
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[#E4DFD3]
                      bg-[#FDFCF9]
                      px-4
                      py-3
                      pr-12
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

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (current) => !current
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#6B6656]
                      transition-colors
                      hover:text-[#1f3d2e]
                      dark:text-[#A8B0AA]
                      dark:hover:text-[#E8A33D]
                    "
                    aria-label={
                      showNewPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                <p
                  className="
                    mt-1.5
                    text-xs
                    text-[#8A8577]
                    dark:text-[#7F8982]
                  "
                >
                  Use at least 6 characters.
                </p>

              </label>

              {/* Confirm Password */}
              <label className="block">

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#2B2620]
                    dark:text-[#E1E6E2]
                  "
                >
                  Confirm new password
                </span>

                <div className="relative mt-2">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={
                      handleConfirmPasswordChange
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    required
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[#E4DFD3]
                      bg-[#FDFCF9]
                      px-4
                      py-3
                      pr-12
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

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#6B6656]
                      transition-colors
                      hover:text-[#1f3d2e]
                      dark:text-[#A8B0AA]
                      dark:hover:text-[#E8A33D]
                    "
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

              {/* Success */}
              {success && (
                <div
                  className="
                    rounded-lg
                    border
                    border-green-200
                    bg-green-50
                    px-4
                    py-3
                    dark:border-green-900
                    dark:bg-green-950/40
                  "
                >
                  <p
                    className="
                      text-sm
                      text-green-700
                      dark:text-green-400
                    "
                  >
                    {success}
                  </p>
                </div>
              )}

              {/* Reset Password Button */}
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
                  ? "Resetting..."
                  : "Reset Password"}
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

            <span
              className="
                font-semibold
                text-[#1f3d2e]
                dark:text-[#E8A33D]
              "
            >
             Butcher's Kitchen
            </span>

            . All rights reserved.
          </p>

        </div>
      </footer>

    </main>
  );
}