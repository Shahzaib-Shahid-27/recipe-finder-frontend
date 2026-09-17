import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { RegisterForm } from "../types/auth";
import axios from "axios";

interface RegisterPageForm extends RegisterForm {
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterPageForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#6B6656]">
              Join Butcher's Kitchen and discover delicious
              meals.
            </p>
          </div>

          {/* Register Card */}
          <div className="mt-8 rounded-2xl border border-[#E4DFD3] bg-white p-7 shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
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
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                />
              </label>

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
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                />
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  Password
                </span>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
                />

                <p className="mt-1.5 text-xs text-[#8A8577]">
                  Use at least 6 characters.
                </p>
              </label>

              {/* Confirm Password */}
              <label className="block">
                <span className="text-sm font-medium text-[#2B2620]">
                  Confirm password
                </span>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="mt-2 w-full rounded-lg border border-[#E4DFD3] bg-[#FDFCF9] px-4 py-3 text-sm text-[#2B2620] outline-none transition focus:border-[#1f3d2e] focus:ring-2 focus:ring-[#1f3d2e]/10"
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

              {/* Register */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#e8a33d] py-3 text-sm font-semibold text-[#F7F4EE] dark:text-[#131312] transition-all duration-100 hover:bg-[#ad7522]  hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create account"}
              </button>
            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-[#000000] dark:text-[#F7F4EE]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#070808]  transition-colors  hover:text-[#E8A33D]"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}