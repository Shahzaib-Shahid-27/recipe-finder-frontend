import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginForm } from "../types/auth";
import axios from "axios";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

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
    setLoading(true);

    try {
      await login(form);

      navigate("/hompage");
    } catch (err: unknown) {
      if (axios.isAxiosError<{ message?: string }>(err)) {
        setError(
          err.response?.data?.message ||
            "Invalid email or password."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password.");
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
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#6B6656]">
              Log in to see today's menu.
            </p>
          </div>

          {/* Login Card */}
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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1F3D2E] focus:ring-2 focus:ring-[#1F3D2E]/10"
                />
              </label>

              {/* Password */}
              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#2B2620]">
                    Password
                  </span>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#1F3D2E] transition-colors hover:text-[#E8A33D]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  autoComplete="current-password"
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

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1F3D2E] py-3 text-sm font-semibold text-[#F7F4EE] transition-all duration-200 hover:bg-[#284D3A] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Logging in..."
                  : "Log in"}
              </button>
            </form>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-[#6B6656]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#1F3D2E] transition-colors hover:text-[#E8A33D]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}