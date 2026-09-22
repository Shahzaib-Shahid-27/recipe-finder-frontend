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

        if (!category) {
          throw new Error("Category is missing.");
        }

        const API_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:4000/api/v1";

        const response = await fetch(
          `${API_URL}/meals/category/${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        const data = result.data || result;

        if (!Array.isArray(data)) {
          throw new Error("Invalid meals data.");
        }

        setMeals(data);
      } catch (error) {
        console.error("Failed to load meals:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load meals."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-20">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#C9CBB8] border-t-[#1F3D2E]" />

          <p className="mt-5 text-sm text-[#6B6656]">
            Loading {category} meals...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-[#E8A33D]">
            Unable to load meals
          </h1>

          <p className="mt-3 text-sm text-red-600">{error}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-7 rounded-full bg-[#E8A33D] px-6 py-3 font-semibold text-white hover:bg-[#B9812E]"
          >
            ← Back to Categories
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-semibold text-[#E8A33D] hover:text-[#AE7C31]"
        >
          ← Back to Categories
        </button>

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
            Category
          </p>

          <h1 className="mt-2 text-4xl font-semibold text-[#E8A33D]">
            {category} Meals
          </h1>

          <p className="mt-3 text-[#6B6656]">
            Explore delicious {category?.toLowerCase()} recipes and discover
            your next favorite meal.
          </p>
        </div>

        {/* No meals */}
        {meals.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-4xl">🍽️</div>

            <h2 className="mt-5 text-2xl font-semibold text-[#E8A33D]">
              No meals found
            </h2>

            <p className="mt-2 text-sm text-[#817A65]">
              There are no meals available in this category.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 rounded-full bg-[#E8A33D] px-6 py-3 font-semibold text-white hover:bg-[#B9812E]"
            >
              Browse Categories
            </button>
          </div>
        ) : (
          <>
            {/* Count */}
            <p className="mb-5 text-sm text-[#6B6656]">
              <span className="font-semibold text-[#E8A33D]">
                {meals.length}
              </span>{" "}
              delicious meals
            </p>

            {/* Meals */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {meals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to={`/ingredients/${meal.idMeal}`}
                  className="group overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#E8A33D] hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-[#C9CBB8]">
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
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h2 className="font-serif text-lg font-semibold text-[#2B2620] group-hover:text-[#E8A33D]">
                      {meal.strMeal}
                    </h2>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-[#6B6656]">
                        Explore recipe
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F4EE] text-[#1F3D2E] group-hover:bg-[#E8A33D] group-hover:text-white">
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