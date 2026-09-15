import { useEffect, useState } from "react";

import MealCard from "../components/MealCard";
import { mealsService } from "../services/mealsService";

import type { Meal } from "../types/meal";

export default function MenuPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    mealsService
      .getAllMeals()
      .then((data) => {
        if (isMounted) {
          setMeals(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load meals:", error);

        if (isMounted) {
          setError(
            "Couldn't load the menu right now. Please try again later."
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <main>
        {/* =========================
            HEADER
        ========================== */}

        <section className="mx-auto max-w-7xl px-6 pb-8 pt-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-10 bg-[#E8A33D]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
              Butcher's Kitchen
            </p>
          </div>

          <h1 className="font-serif text-4xl font-semibold text-[#1F3D2E] md:text-5xl">
            Today&apos;s Menu
          </h1>

          <p className="mt-3 max-w-2xl text-[#6B6656]">
            Seasonal recipes, delicious flavors, and meals
            ready when you are.
          </p>
        </section>

        {/* =========================
            MEALS
        ========================== */}

        <section className="mx-auto max-w-7xl px-6 pb-20">

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl border border-[#E4DFD3] bg-white p-8 text-center">
              <p className="text-sm text-[#6B6656]">
                Loading meals...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            meals.length === 0 && (
              <div className="rounded-2xl border border-[#E4DFD3] bg-white p-10 text-center">
                <p className="text-sm text-[#6B6656]">
                  No meals on the menu yet. Check back soon.
                </p>
              </div>
            )}

          {/* Meals */}
          {!loading && !error && meals.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}