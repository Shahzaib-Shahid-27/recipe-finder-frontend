import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  ExternalLink,
  MapPin,
  Play,
} from "lucide-react";

import type { Meal } from "../types/meal";

export default function IngredientsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        if (!id) throw new Error("Meal ID is missing.");

        const API_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:8080/api/v1";

        const response = await fetch(`${API_URL}/meals/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        const data = result.data || result;

        if (!data?.idMeal) {
          throw new Error("Meal not found.");
        }

        setMeal(data);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "Unable to load meal."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F4EE]">
        <p className="text-[#E8A33D]">Loading meal...</p>
      </main>
    );
  }

  if (error || !meal) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F4EE] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#E8A33D]">
            Meal not found
          </h1>

          <p className="mt-3 text-[#6B6656]">
            {error || "Unable to load this meal."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E8A33D] px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const mealFields = meal as unknown as Record<string, string | null | undefined>;

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = mealFields[`strIngredient${i + 1}`];
    const measure = mealFields[`strMeasure${i + 1}`];

    if (!ingredient?.trim()) return null;

    return {
      ingredient: ingredient.trim(),
      measure: measure?.trim() || "As required",
    };
  }).filter(Boolean) as {
    ingredient: string;
    measure: string;
  }[];

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 font-semibold text-[#E8A33D]"
        >
          <ArrowLeft size={17} />
          Back to Recipes
        </button>

        {/* Meal */}
        <div className="grid gap-10 lg:grid-cols-2">

          <img
            src={meal.strMealThumb || ""}
            alt={meal.strMeal}
            className="w-full rounded-3xl object-cover"
          />

          <div className="flex flex-col justify-center">

            <p className="text-sm font-bold uppercase text-[#E8A33D]">
              {meal.strCategory}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#E8A33D] md:text-5xl">
              {meal.strMeal}
            </h1>

            <p className="mt-5 leading-7 text-[#6B6656]">
              Discover everything you need to prepare this delicious recipe.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {meal.strCountry && (
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#6B6656]">
                  <MapPin size={15} className="text-[#E8A33D]" />
                  {meal.strCountry}
                </span>
              )}

              {meal.strArea && (
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#6B6656]">
                  <ChefHat size={15} className="text-[#E8A33D]" />
                  {meal.strArea}
                </span>
              )}
            </div>

            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex w-fit items-center gap-2 rounded-full bg-[#E8A33D] hover:bg-[#c48322] text-[#000000] px-5 py-3
                 font-semibold transition-all duration-150 ease-in"
              >
                <Play size={16} className="text-black"/>
                <span className="text-black">Watch Recipe</span>
                <ExternalLink size={14} className="text-black"/>
              </a>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <section className="mt-16">
          <h2 className="font-serif text-3xl font-semibold text-[#E8A33D]">
            Ingredients
          </h2>

          <p className="mt-2 text-[#6B6656]">
            Ingredients required for this recipe.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <p className="font-semibold text-[#E8A33D]">
                  {index + 1}. {item.ingredient}
                </p>

                <p className="mt-1 text-sm text-[#6B6656]">
                  {item.measure}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="mt-16 pb-12">
          <h2 className="font-serif text-3xl font-semibold text-[#E8A33D]">
            Instructions
          </h2>

          <div className="mt-7 rounded-3xl bg-white p-7 shadow-sm">
            <p className="whitespace-pre-line leading-8 text-[#10100f] dark:text-[#E8A33D]">
              {meal.strInstructions || "No instructions available."}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}