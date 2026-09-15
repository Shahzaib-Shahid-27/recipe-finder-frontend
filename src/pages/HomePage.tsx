import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChefHat,
  Search,
  UtensilsCrossed,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F7F4EE] dark:bg-[#121914] text-[#2B2620]">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1F3D2E]/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#E8A33D]/10 blur-3xl" />

        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center md:py-32">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/40 bg-[#E8A33D]/10 px-5 py-2.5">
            <ChefHat
              size={17}
              className="text-[#E8A33D]"
            />

            <span className="text-sm font-semibold text-[#1F3D2E] dark:text-[#F4F1E8]">
              Discover delicious meals
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-tight tracking-tight text-[#1F3D2E] dark:text-[#F4F1E8] md:text-7xl">
            Find Your Next
            <span className="block text-[#E8A33D]">
              Favorite Meal
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#6B6656] dark:text-[#B8B5A8] md:text-lg">
            Explore recipes from around the world, discover
            delicious dishes, and find your next favorite meal
            to prepare at home.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap justify-center gap-4">

            {/* Explore Meals */}
             <Link
               to="/MealsPage"
              className="group inline-flex items-center gap-2 rounded-full border border-[#1F3D2E]/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#1F3D2E] dark:text-[#F4F1E8] shadow-sm transition-all duration-300 hover:border-[#E8A33D] hover:bg-[#E8A33D] hover:text-white hover:shadow-md"
            >
                <UtensilsCrossed size={17} />
                <h1 className="">Explore Meals</h1>
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Browse Categories */}
            <Link
              to="/CategoryPage"
              className="group inline-flex items-center gap-2 rounded-full border border-[#1F3D2E]/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#1F3D2E] dark:text-[#F4F1E8] shadow-sm transition-all duration-300 hover:border-[#E8A33D] hover:bg-[#E8A33D] hover:text-white hover:shadow-md"
            >
              <Search size={17} />

              Browse Categories

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>



          {/* Small feature row */}
          <div className="mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-[#E4DFD3] bg-white px-5 py-5 shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3D2E]/10">
                <ChefHat
                  size={19}
                  className="text-[#1F3D2E] dark:text-[#F4F1E8]"
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-[#2B2620]">
                Delicious Recipes
              </p>
            </div>

            <div className="rounded-2xl border border-[#E4DFD3] bg-white px-5 py-5 shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E8A33D]/15">
                <Search
                  size={19}
                  className="text-[#E8A33D]"
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-[#2B2620]">
                Easy to Discover
              </p>
            </div>

            <div className="rounded-2xl border border-[#E4DFD3] bg-white px-5 py-5 shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3D2E]/10">
                <UtensilsCrossed
                  size={19}
                  className="text-[#1F3D2E] dark:text-[#F4F1E8]"
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-[#2B2620]">
                Cook Something New
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}