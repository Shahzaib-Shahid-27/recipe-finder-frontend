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

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get email from:
  // /reset-password?email=user@example.com
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleEmailChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setEmail(e.target.value);
  }

  function handleCurrentPasswordChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setCurrentPassword(e.target.value);
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

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters long."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
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
          email,
          currentPassword,
          newPassword,
        }
      );

      setSuccess(
        "Your password has been reset successfully. Redirecting to login..."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
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
              className="font-serif text-3xl font-semibold text-[#1F3D2E]"
            >
              Harvest
              <span className="text-[#E8A33D]">
                Table
              </span>
            </Link>

            <h1 className="mt-8 font-serif text-3xl font-semibold text-[#2B2620]">
              Reset password
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6B6656]">
              Enter your current password and choose a
              new password.
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
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1F3D2E] focus:ring-2 focus:ring-[#1F3D2E]/10"
                />
              </label>

              {/* Current Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  Current password
                </span>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1F3D2E] focus:ring-2 focus:ring-[#1F3D2E]/10"
                />
              </label>

              {/* New Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  New password
                </span>

                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1F3D2E] focus:ring-2 focus:ring-[#1F3D2E]/10"
                />
              </label>

              {/* Confirm Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  Confirm new password
                </span>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1F3D2E] focus:ring-2 focus:ring-[#1F3D2E]/10"
                />
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

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1F3D2E] py-3 text-sm font-semibold text-[#F7F4EE] transition-all hover:bg-[#284D3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>
            </form>

            <div className="mt-7 text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-[#1F3D2E] transition-colors hover:text-[#E8A33D]"
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