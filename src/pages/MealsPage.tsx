import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Loader2,
} from "lucide-react";

import type { Meal, RawMeal } from "../types/meal";

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const limit = 6;

  useEffect(() => {
    const getMeals = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:4000/api/v1";

        const url = `${API_URL}/meals?page=${page}&limit=${limit}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status}`
          );
        }

        const result: RawMeal = await response.json();

        setMeals(result.data || []);
      } catch (error) {
        console.error("Failed to fetch meals:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    getMeals();
  }, [page]);

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-12 text-[#2B2620]">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#E8A33D]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
              Recipe Finder
            </p>

            <div className="h-px w-10 bg-[#E8A33D]" />
          </div>

          <h1 className="font-serif text-4xl font-semibold text-[#3d381f] dark:text-[#726a40] md:text-5xl">
            All Meals
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[#6B6656]">
            Explore delicious meals from different cuisines
            and discover your next favorite recipe.
          </p>
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="flex min-h-87.5 items-center justify-center">
            <div className="text-center">
              <Loader2
                size={42}
                className="mx-auto animate-spin text-[#3d3a1f]"
              />

              <p className="mt-4 font-medium text-[#726c57]">
                Loading delicious meals...
              </p>
            </div>
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="text-lg font-semibold text-red-700">
              Unable to load meals
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-[#1f3d2e] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#284D3A]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* =========================
            MEALS
        ========================== */}

        {!loading && !error && (
          <>
            {meals.length === 0 ? (
              <div className="rounded-3xl border border-[#E4DFD3] bg-white p-12 text-center shadow-sm">
                <ChefHat
                  size={42}
                  className="mx-auto text-[#C9CBB8]"
                />

                <h2 className="mt-4 font-serif text-2xl font-semibold text-[#4e4923]">
                  No meals found
                </h2>

                <p className="mt-2 text-[#6B6656]">
                  There are no meals available on this page.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {meals.map((meal) => (
                  <Link
                    key={meal.idMeal}
                    to={`/ingredients/${meal.idMeal}`}
                    className="group overflow-hidden rounded-3xl border border-[#E4DFD3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D] hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="aspect-4/3 overflow-hidden bg-[#C9CBB8]">
                      {meal.strMealThumb ? (
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#6B6656]">
                          <ChefHat size={40} />
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

                      <h2 className="mt-2 line-clamp-2 font-serif text-xl font-semibold text-[#E8A33D]">
                        {meal.strMeal}
                      </h2>

                      <p className="mt-2 text-sm text-[#6B6656]">
                        {meal.strCountry ||
                          meal.strArea ||
                          "International cuisine"}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-[#E4DFD3] pt-4">
                        <span className="text-sm font-semibold text-[#8a8453]">
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
            )}

            {/* =========================
                PAGINATION
            ========================== */}

            <div className="mt-12 flex items-center justify-center gap-3">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((current) => current - 1)
                }
                className="inline-flex items-center gap-2 rounded-full border border-[#D8D3C7] bg-white px-5 py-2.5 text-sm font-semibold text-[#3d381f] dark:text-[#e8a33d] transition hover:border-[#E8A33D] hover:bg-[#F7F4EE] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              <span className="rounded-full bg-[#E8A33D] border-[#D8D3C7]  px-5 py-2.5 text-sm font-semibold text-white">
                Page {page}
              </span>

              <button
                disabled={meals.length < limit}
                onClick={() =>
                  setPage((current) => current + 1)
                }
                className="inline-flex items-center gap-2 rounded-full border border-[#D8D3C7] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f3d2e] transition hover:border-[#E8A33D] hover:bg-[#F7F4EE] disabled:cursor-not-allowed disabled:opacity-40 dark:text-[#e8a33d] "
              >
                Next
                <ChevronRight size={17} />
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}