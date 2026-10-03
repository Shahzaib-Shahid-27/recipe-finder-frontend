import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function GoogleSuccessPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    console.log("Google success page loaded");
    console.log("Token exists:", !!token);
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF8F2]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1F3D2E]">
          Google Login Successful
        </h1>

        <p className="mt-3 text-gray-600">
          Google authentication completed.
        </p>
      </div>
    </div>
  );
}