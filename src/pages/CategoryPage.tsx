import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

interface Category {
  idCategory?: string;
  strCategory?: string;
  category?: string;
}

interface CategoriesResponse {
  success?: boolean;
  data: Category[] | string[];
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:4000/api/v1";

        const response = await fetch(
          `${API_URL}/meals/categories`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status}`
          );
        }

        const result: CategoriesResponse =
          await response.json();

        const categoryNames = result.data
          .map((item) => {
            if (typeof item === "string") {
              return item;
            }

            return (
              item.strCategory ||
              item.category ||
              ""
            );
          })
          .filter(Boolean);

        setCategories(categoryNames);
      } catch (error) {
        console.error(
          "Failed to fetch categories:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-20">
        <div className="flex items-center justify-center gap-3">
          <Loader2
            size={24}
            className="animate-spin text-[#E8A33D]"
          />

          <p className="text-sm font-medium text-[#6B6656]">
            Loading categories...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#E4DFD3] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <span className="text-xl font-bold text-red-500">
              !
            </span>
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#1f3d2e]">
            Unable to load categories
          </h1>

          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-[#1f3d2e] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#284D3A] hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-10 bg-[#E8A33D]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
              Recipe Finder
            </p>
          </div>

          <h1 className="font-serif text-4xl font-semibold text-[#e8a33d] md:text-5xl">
            Explore Categories
          </h1>

          <p className="mt-3 max-w-2xl text-[#6B6656]">
            Choose a category and discover delicious
            recipes made for every kind of craving.
          </p>
        </div>

        {/* Categories */}
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-[#E4DFD3] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F4EE]">
              <span className="text-2xl">🍽️</span>
            </div>

            <p className="mt-4 text-sm text-[#6B6656]">
              No categories found.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${encodeURIComponent(
                  category
                )}`}
                className="group rounded-2xl border border-[#E4DFD3] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D] hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">

                  {/* Category text */}
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-[#936e40] transition-colors duration-200 group-hover:text-[#e8a33d] dark:">
                      {category}
                    </h2>

                    <p className="mt-1 text-sm text-[#8A8577]">
                      Explore recipes
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F4EE] transition-all duration-300 group-hover:bg-[#E8A33D] ">
                    <ArrowRight
                      size={18}
                      className="text-[#8d8539] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white "
                    />
                  </div>
                </div>

                {/* Gold bottom accent */}
                <div className="mt-5 h-1 w-0 rounded-full bg-[#E8A33D] transition-all duration-300 group-hover:w-12" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}