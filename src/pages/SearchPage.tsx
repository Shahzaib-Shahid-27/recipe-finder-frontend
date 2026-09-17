import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Loader2,
  Search,
  ChefHat,
} from "lucide-react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strCountry: string | null;
  strArea: string | null;
  strMealThumb: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      setMeals([]);
      setSearched(false);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setError("");

      const API_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:8080/api/v1";

      const response = await fetch(
        `${API_URL}/meals/search?q=${encodeURIComponent(
          query.trim()
        )}&page=1&limit=10`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      const result = await response.json();

      setMeals(result.data || []);
    } catch (error) {
      console.error("Search failed:", error);

      setMeals([]);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to search meals."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-12 text-[#E8A33D]">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            SEARCH HEADER
        ========================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#E8A33D]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
              Find Your Meal
            </p>

            <div className="h-px w-10 bg-[#E8A33D]" />
          </div>

          <h1 className="font-serif text-4xl font-semibold text-[#E8A33D] md:text-5xl">
            Search Recipes
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-[#6B6656]">
            Search through delicious recipes and discover
            something new to cook today.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2  text-[#8A8577] "
              />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search chicken, pasta, rice..."
                className="w-full rounded-full border border-[#D8D3C7] bg-white py-3.5 pl-11 pr-5 text-black outline-none transition placeholder:text-[#9A9588] focus:border-[#E8A33D] focus:ring-2 focus:ring-[#E8A33D]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8A33D] px-7 py-3.5 font-semibold text-white transition  disabled:cursor-not-allowed disabled:opacity-60 b cursor-pointer hover:bg-[#b17822]"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search
                </>
              )}
            </button>
          </form>
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="flex min-h-75 items-center justify-center">
            <div className="text-center">
              <Loader2
                size={40}
                className="mx-auto animate-spin text-[#E8A33D]"
              />

              <p className="mt-4 text-sm text-[#6B6656]">
                Searching for delicious meals...
              </p>
            </div>
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">
              Search failed
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* =========================
            NO RESULTS
        ========================== */}

        {!loading &&
          !error &&
          searched &&
          meals.length === 0 && (
            <div className="mt-12 rounded-3xl border border-[#E4DFD3] bg-white p-12 text-center shadow-sm">
              <Search
                size={42}
                className="mx-auto text-[#C9CBB8]"
              />

              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#E8A33D]">
                No meals found
              </h2>

              <p className="mt-2 text-[#6B6656]">
                Try searching for something else.
              </p>
            </div>
          )}

        {/* =========================
            RESULTS
        ========================== */}

        {!loading && !error && meals.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <p className="text-sm font-medium text-[#6B6656]">
                Search results for
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#E8A33D]">
                &quot;{query}&quot;
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {meals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to={`/ingredients/${meal.idMeal}`}
                  className="group overflow-hidden rounded-3xl border border-[#E4DFD3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D] hover:shadow-lg"
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
                        <ChefHat size={42} />
                      </div>
                    )}
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    {meal.strCategory && (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#E8A33D]">
                        {meal.strCategory}
                      </p>
                    )}

                    <h3 className="mt-2 line-clamp-2 font-serif text-xl font-semibold text-[#E8A33D]">
                      {meal.strMeal}
                    </h3>

                    <p className="mt-2 text-sm text-[#6B6656]">
                      {meal.strCountry ||
                        meal.strArea ||
                        "International cuisine"}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E4DFD3] pt-4">
                      <span className="text-sm font-semibold text-[#E8A33D]">
                        View Recipe
                      </span>

                      <ArrowRight
                        size={18}
                        className="text-[#E8A33D] transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}