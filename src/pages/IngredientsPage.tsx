import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  ExternalLink,
  MapPin,
  Play,
} from "lucide-react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string | null;
  strCountry: string | null;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
}

export default function IngredientsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError("");
        setMeal(null);

        if (!id) {
          throw new Error("Meal ID is missing from the URL.");
        }

        const API_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:8080/api/v1";

        const url = `${API_URL}/meals/${id}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        const mealData = result.data || result;

        if (!mealData || !mealData.idMeal) {
          throw new Error("Meal data was not found.");
        }

        setMeal(mealData);
      } catch (error) {
        console.error("Failed to fetch meal:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load meal."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F4EE] px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#C9CBB8] border-t-[#1f3d2e]" />

          <h1 className="font-serif text-xl font-semibold text-[#1f3d2e]">
            Loading meal...
          </h1>

          <p className="mt-2 text-sm text-[#6B6656]">
            Please wait while we fetch the recipe.
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !meal) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl border border-[#E4DFD3] bg-white p-10 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <span className="text-2xl font-bold text-red-500">
                !
              </span>
            </div>

            <h1 className="mt-6 font-serif text-3xl font-semibold text-[#1f3d2e]">
              Meal not found
            </h1>

            <p className="mt-4 text-[#6B6656]">
              {error || "Unable to load this meal."}
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1f3d2e] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#284D3A] hover:shadow-md"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // INGREDIENTS
  // =========================

  const ingredients = Array.from(
    { length: 20 },
    (_, index) => {
      const ingredient =
        meal[`strIngredient${index + 1}`];

      const measure =
        meal[`strMeasure${index + 1}`];

      if (
        !ingredient ||
        typeof ingredient !== "string" ||
        !ingredient.trim()
      ) {
        return null;
      }

      return {
        ingredient: ingredient.trim(),
        measure:
          typeof measure === "string"
            ? measure.trim()
            : "",
      };
    }
  ).filter(
    (
      item
    ): item is {
      ingredient: string;
      measure: string;
    } => item !== null
  );

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-10 text-[#2B2620]">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1f3d2e] transition-colors hover:text-[#E8A33D]"
        >
          <ArrowLeft size={17} />
          Back to Recipes
        </button>

        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-3xl border border-[#E4DFD3] bg-white shadow-sm">
            {meal.strMealThumb ? (
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="aspect-square w-full object-cover transition duration-500 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-[#C9CBB8] text-[#6B6656]">
                No image available
              </div>
            )}
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            {meal.strCategory && (
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-10 bg-[#E8A33D]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
                  {meal.strCategory}
                </p>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl font-semibold leading-tight text-[#1f3d2e] md:text-5xl">
              {meal.strMeal}
            </h1>

            {/* Description */}
            <p className="mt-5 leading-7 text-[#6B6656]">
              Discover everything you need to prepare this
              delicious recipe, from ingredients to step-by-step
              cooking instructions.
            </p>

            {/* Country / Area */}
            <div className="mt-6 flex flex-wrap gap-3">
              {meal.strCountry && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E4DFD3] bg-white px-4 py-2 text-sm text-[#6B6656]">
                  <MapPin
                    size={15}
                    className="text-[#E8A33D]"
                  />
                  {meal.strCountry}
                </span>
              )}

              {meal.strArea && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E4DFD3] bg-white px-4 py-2 text-sm text-[#6B6656]">
                  <ChefHat
                    size={15}
                    className="text-[#1f3d2e]"
                  />
                  {meal.strArea}
                </span>
              )}
            </div>

            {/* Tags */}
            {meal.strTags && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8A8577]">
                  Tags
                </p>

                <div className="flex flex-wrap gap-2">
                  {meal.strTags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#1f3d2e]/10 px-3 py-1.5 text-xs font-medium text-[#1f3d2e]"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* YouTube */}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#1f3d2e]/20 bg-white px-5 py-3 text-sm font-semibold text-[#1f3d2e] shadow-sm transition-all duration-200 hover:border-[#E8A33D] hover:bg-[#E8A33D] hover:text-white hover:shadow-md dark:border-[#E8A33D]/40 dark:bg-[#1C241E] dark:text-[#F4F1E8] dark:hover:bg-[#E8A33D] dark:hover:text-[#1f3d2e]"
              >
                <Play size={16} />
                Watch Recipe
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* =========================
            INGREDIENTS
        ========================== */}

        <section className="mt-16">
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-[#E8A33D]" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
                What You Need
              </p>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-[#1f3d2e]">
              Ingredients
            </h2>

            <p className="mt-2 text-[#6B6656]">
              Ingredients required for this recipe.
            </p>
          </div>

          {ingredients.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ingredients.map(
                ({ ingredient, measure }, index) => (
                  <div
                    key={`${ingredient}-${index}`}
                    className="group rounded-2xl border border-[#E4DFD3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8A33D] hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F4EE] text-sm font-bold text-[#1f3d2e] transition-colors group-hover:bg-[#E8A33D] group-hover:text-white">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-semibold text-[#2B2620]">
                          {ingredient}
                        </p>

                        <p className="mt-1 text-sm text-[#6B6656]">
                          {measure || "As required"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E4DFD3] bg-white p-6 text-[#6B6656] shadow-sm">
              No ingredients available.
            </div>
          )}
        </section>

        {/* =========================
            INSTRUCTIONS
        ========================== */}

        <section className="mt-16 pb-12">
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-[#E8A33D]" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
                Step by Step
              </p>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-[#1f3d2e]">
              Instructions
            </h2>

            <p className="mt-2 text-[#6B6656]">
              Follow these instructions to prepare your meal.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E4DFD3] bg-white p-7 shadow-sm md:p-9">
            {meal.strInstructions ? (
              <p className="whitespace-pre-line leading-8 text-[#4F4A40]">
                {meal.strInstructions}
              </p>
            ) : (
              <p className="text-[#6B6656]">
                No instructions available.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}