// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";
// import IngredientsPage from "../pages/IngredientsPage"

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {

  // const navigate = useNavigate();

  // const handleViewIngredients = () => {
  //   // navigate(`/meals/${meal.idMeal}/ingredients`);
  //     navigate(`/ingredients/${meal.idMeal}`);
  // };

  return (
    <article className="group flex gap-5 border-b border-[#E4DFD3] py-6 last:border-0">

      {/* Meal Image */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#EFEAE0] shadow-sm sm:h-32 sm:w-32">
        {meal.strMealThumb ? (
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[#9C9787]">
            No photo
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/5" />
      </div>

      {/* Meal Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {meal.strCategory && (
          <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#B87820]">
            {meal.strCategory}
          </span>
        )}

        <h3 className="font-serif text-lg font-medium leading-tight text-[#2B2620] transition-colors duration-300 group-hover:text-[#4C6650] sm:text-xl">
          {meal.strMeal}
        </h3>

        {meal.strInstructions && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B6656]">
            {meal.strInstructions}
          </p>
        )}
        
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {meal.strCategory && (
            <span className="rounded-full bg-[#EFEAE0] px-3 py-1 text-[11px] font-medium text-[#4C6650]">
              {meal.strCategory}
            </span>
          )}

          {meal.strArea && (
            <span className="rounded-full bg-[#EFEAE0] px-3 py-1 text-[11px] font-medium text-[#4C6650]">
              {meal.strArea}
            </span>
          )}
        </div>
      </div>

        {/* Ingredients Button */}
        <div className=" items-center sm:flex text-[#6B6656] dark:text-white">
          <Link
            to={`/ingredients/${meal.idMeal}`}
          >
            <button
              type="button"
              aria-label={`View ingredients for ${meal.strMeal}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DFD3] text-lg
               transition-all duration-200 hover:-translate-y-0.5 bg-[#E8A33D] hover:border-[#E8A33D] hover:bg-[#E8A33D] dark:hover:text-white hover:shadow-md mr-1 dark:text-white"
              >
              <h1 className="text-2xl">→</h1>
            </button>
            </Link>
        </div>
    </article>
  );
}
