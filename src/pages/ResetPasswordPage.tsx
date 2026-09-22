
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

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
        "http://localhost:8080/api/v1";

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
    <main className="min-h-[calc(100vh-64px)] bg-[#F7F4EE] px-6 py-16">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full">

          {/* Logo */}
          <div className="text-center">
            <Link
              to="/hompage"
              className="font-serif text-3xl font-semibold text-[#1f3d2e]"
            >
              Butcher's
              <span className="ml-2 text-[#E8A33D]">
                kitchen
              </span>
            </Link>

            <h1 className="mt-8 font-serif text-3xl font-semibold text-[#2B2620]">
              Reset password
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6B6656]">
              Your email has been verified. Choose a
              new password for your account.
            </p>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-2xl border border-[#E4DFD3] bg-white p-7 shadow-sm">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  Verified Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                />
              </label>

              {/* New Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
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
                    className="w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 pr-12 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6656] transition-colors hover:text-[#1f3d2e]"
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

                <p className="mt-1.5 text-xs text-[#8A8577]">
                  Use at least 6 characters.
                </p>
              </label>

              {/* Confirm Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
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
                    className="w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 pr-12 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6656] transition-colors hover:text-[#1f3d2e]"
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
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-sm text-green-700">
                    {success}
                  </p>
                </div>
              )}

              {/* Reset Password Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#E8A33D] py-3 text-sm font-semibold text-[#F7F4EE] transition-all hover:bg-[#a06a19] disabled:cursor-not-allowed disabled:opacity-60"
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
                className="text-sm font-semibold text-[#1f3d2e] transition-colors hover:text-[#E8A33D]"
              >
                ← Back to login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}