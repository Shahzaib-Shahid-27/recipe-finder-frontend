import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
}

export default function CategoryMealsPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError("");
        setMeals([]);

        if (!category) {
          throw new Error("Category is missing from the URL.");
        }

        const API_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:8080/api/v1";

        const url =
          `${API_URL}/meals/category/` +
          encodeURIComponent(category);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        const mealData = result.data || result;

        if (!Array.isArray(mealData)) {
          throw new Error(
            "Invalid meals data received from server."
          );
        }

        setMeals(mealData);
      } catch (error) {
        console.error(
          "Failed to fetch category meals:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load meals."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#C9CBB8] border-t-[#1f3d2e]" />

          <p className="mt-5 text-sm font-medium text-[#6B6656]">
            Loading {category} meals...
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
            <span className="text-2xl">!</span>
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#e8a33d]">
            Unable to load meals
          </h1>

          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-7 rounded-full bg-[#e8a33d] px-6 py-3 text-sm font-semibold text-[#e8a33d] transition-all duration-200 hover:bg-[#e8a33d] hover:shadow-md"
          >
            ← Back to Categories
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

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e8a33d] hover:text-[#ae7c31] transition-colors cursor-pointer"
        >
          <span className="text-2xl">←</span> Back to Categories
        </button>

        {/* Heading */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-10 bg-[#E8A33D]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
              Category
            </p>
          </div>

          <h1 className="font-serif text-4xl font-semibold text-[#e8a33d] md:text-5xl">
            {category} Meals
          </h1>

          <p className="mt-3 max-w-2xl text-[#6B6656]">
            Explore delicious{" "}
            <span className="font-medium text-[#e8a33d]">
              {category?.toLowerCase()}
            </span>{" "}
            recipes and discover your next favorite meal.
          </p>
        </div>

        {/* No meals */}
        {meals.length === 0 ? (
          <div className="rounded-2xl border border-[#E4DFD3] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F4EE]">
              <span className="text-2xl">🍽️</span>
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#e8a33d]">
              No meals found
            </h2>

            <p className="mt-2 text-sm text-[#817a65]">
              There are no meals available in this category.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 rounded-full bg-[#e8a33d] px-6 py-3 text-sm font-semibold text-white transition-all duration-150 ease-in cursor-pointer hover:bg-[#b9812e]"
            >
              Browse Categories
            </button>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-[#6B6656]">
                <span className="font-semibold text-[#e8a33d]">
                  {meals.length}
                </span>{" "}
                delicious meals
              </p>
            </div>

            {/* Meals */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {meals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to={`/ingredients/${meal.idMeal}`}
                  className="group overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D] hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#C9CBB8]">
                    {meal.strMealThumb ? (
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#6B6656]">
                        No image
                      </div>
                    )}

                    {/* Gold overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h2 className="font-serif text-lg font-semibold text-[#2B2620] transition-colors group-hover:text-[#E8A33D]">
                      {meal.strMeal}
                    </h2>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#6B6656]">
                        Explore recipe
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F4EE] text-[#1f3d2e] transition-all duration-300 group-hover:bg-[#E8A33D] group-hover:text-white dark:text-[#E8A33D] ">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}