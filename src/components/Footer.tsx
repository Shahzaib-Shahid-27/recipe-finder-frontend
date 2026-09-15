import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1F3D2E] text-[#C9CBB8]">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#E8A33D]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#8FAF8F]/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid gap-12 md:grid-cols-3">

          {/* =========================
              BRAND
          ========================== */}

          <div className="max-w-sm">

            <Link
              to="/hompage"
              className="group inline-block font-serif text-2xl font-semibold tracking-tight text-[#F7F4EE]"
            >
              Butcher's
              <span className="text-[#E8A33D] transition-colors group-hover:text-yellow-300 ml-1">
                Kitchen
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[#C9CBB8]/80">
              Explore delicious recipes from around the world,
              discover new meals, and find something special
              to cook today.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D]/40 hover:bg-[#E8A33D] hover:text-[#1F3D2E]"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D]/40 hover:bg-[#E8A33D] hover:text-[#1F3D2E]"
              >
                FB
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D]/40 hover:bg-[#E8A33D] hover:text-[#1F3D2E]"
              >
                X
              </a>

            </div>
          </div>

          {/* =========================
              EXPLORE
          ========================== */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7F4EE]">
              Explore
            </p>

            <ul className="mt-5 space-y-3 text-sm">

              {/* Meals */}
              <li>
                <Link
                  to="/MealsPage"
                  className="group flex w-fit items-center gap-2 transition-colors duration-300 hover:text-[#E8A33D]"
                >
                  <span className="h-px w-0 bg-[#E8A33D] transition-all duration-300 group-hover:w-4" />
                  All Meals
                </Link>
              </li>

              {/* Categories */}
              <li>
                <Link
                  to="/CategoryPage"
                  className="group flex w-fit items-center gap-2 transition-colors duration-300 hover:text-[#E8A33D]"
                >
                  <span className="h-px w-0 bg-[#E8A33D] transition-all duration-300 group-hover:w-4" />
                  Categories
                </Link>
              </li>

              {/* Search */}
              <li>
                <Link
                  to="/SearchPage"
                  className="group flex w-fit items-center gap-2 transition-colors duration-300 hover:text-[#E8A33D]"
                >
                  <span className="h-px w-0 bg-[#E8A33D] transition-all duration-300 group-hover:w-4" />
                  Search Recipes
                </Link>
              </li>

              {/* Menu */}
              <li>
                <Link
                  to="/MenuPage"
                  className="group flex w-fit items-center gap-2 transition-colors duration-300 hover:text-[#E8A33D]"
                >
                  <span className="h-px w-0 bg-[#E8A33D] transition-all duration-300 group-hover:w-4" />
                  Menu
                </Link>
              </li>

            </ul>

          </div>

          {/* =========================
              CONTACT
          ========================== */}

          <div id="contact">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7F4EE]">
              Reach us
            </p>

            <ul className="mt-5 space-y-4 text-sm">

              {/* Email */}
              <li>

                <span className="mb-1 block text-xs uppercase tracking-wider text-[#C9CBB8]/50">
                  Email
                </span>

                <a
                  href="mailto:hello@Butcher's Kitchen.app"
                  className="transition-colors duration-300 hover:text-[#E8A33D]"
                >
                  hello@Butcher's Kitchen.app
                </a>

              </li>

              {/* Opening Hours */}
              <li>
                <span className="mb-1 block text-xs uppercase tracking-wider text-[#C9CBB8]/50">
                  Opening hours
                </span>

                <span>
                  Mon'Sat, 9am'8pm
                </span>
              </li>

              {/* Website */}
              <li>

                <span className="mb-1 block text-xs uppercase tracking-wider text-[#C9CBB8]/50">
                  Explore
                </span>

                <Link
                  to="/hompage"
                  className="transition-colors duration-300 hover:text-[#E8A33D]"
                >
                  Butcher's Kitchen
                </Link>

              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* =========================
          BOTTOM BAR
      ========================== */}

      <div className="relative border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 py-5 text-xs text-[#C9CBB8]/60 sm:flex-row lg:px-8">

          <p>
            © {new Date().getFullYear()} Butcher's Kitchen.
            All rights reserved.
          </p>

          {/* <p className="flex items-center gap-1">
            Made with
            <span className="text-[#E8A33D]">
              ♥
            </span>
            for good food.
          </p> */}

        </div>

      </div>

    </footer>
  );
}