import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      navigate("/login", { replace: true });
      return;
    }

    const handleGoogleLogin = async () => {
      try {
        await loginWithToken(accessToken);

        navigate("/hompage", { replace: true });
      } catch {
        navigate("/login", { replace: true });
      }
    };

    handleGoogleLogin();
  }, [searchParams, loginWithToken, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF8F2]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#1F3D2E]">
          Signing you in...
        </h1>

        <p className="mt-2 text-gray-600">
          Please wait...
        </p>
      </div>
    </div>
  );
}