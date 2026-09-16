import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setEmail(e.target.value);
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:8080/api/v1";

      await axios.post(
        `${API_URL}/auth/forgot-password`,
        {
          email,
        }
      );

      // Email verified successfully.
      // Go to reset password page and pass email.
      navigate(
        `/reset-password?email=${encodeURIComponent(email)}`
      );
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        setError(
          err.response?.data?.message ||
            "Unable to verify email."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to verify email.");
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
              Harvest
              <span className="text-[#E8A33D]">
                Table
              </span>
            </Link>

            <h1 className="mt-8 font-serif text-3xl font-semibold text-[#2B2620]">
              Forgot password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6B6656]">
              Enter your email address to verify your
              account and reset your password.
            </p>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-2xl border border-[#E4DFD3] bg-white p-7 shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                />
              </label>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1f3d2e] py-3 text-sm font-semibold text-[#F7F4EE] transition-all hover:bg-[#284D3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Verifying..."
                  : "Verify Email"}
              </button>
            </form>

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