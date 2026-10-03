import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleCallbackPage() {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const ran = useRef(false); // avoids double run in React StrictMode

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const token = new URLSearchParams(window.location.hash.slice(1)).get("token");

    if (!token) {
      navigate("/login?error=google", { replace: true });
      return;
    }

    loginWithToken(token)
      .then(() => navigate("/hompage", { replace: true }))
      .catch(() => navigate("/login?error=google", { replace: true }));
  }, [loginWithToken, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Signing you in...</p>
    </div>
  );
}