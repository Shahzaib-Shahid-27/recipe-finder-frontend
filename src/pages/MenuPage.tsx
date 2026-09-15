import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import MealCard from "../components/MealCard";
import { mealsService } from "../services/mealsService";
import type { Meal } from "../types/meal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function MenuPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    mealsService
      .getAllMeals()
      .then((data) => mounted && setMeals(data))
      .catch((err) => {
        console.error("Failed to load meals:", err);
        if (mounted) setError("Couldn't load the menu. Please try again later.");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F4EE] transition-colors duration-500 dark:bg-[#121914]">
      {/* Header */}
      <motion.section
        className="mx-auto max-w-7xl px-6 pb-8 pt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-3 flex items-center gap-3">
          <motion.div
            className="h-px bg-[#E8A33D]"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.6 }}
          />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
            Butcher&apos;s Kitchen
          </span>
        </div>

        <h1 className="font-serif text-4xl font-semibold text-[#1F3D2E] dark:text-[#F4F1E8] md:text-5xl">
          Today&apos;s Menu
        </h1>

        <p className="mt-3 max-w-2xl text-[#6B6656] dark:text-[#B8B5A8]">
          Seasonal recipes, delicious flavors, and meals ready when you are.
        </p>
      </motion.section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        {loading && (
          <motion.div
            className="rounded-2xl border border-[#E4DFD3] bg-white p-8 text-center dark:border-[#30382F] dark:bg-[#1C241E]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="mx-auto mb-4 h-4 w-32 rounded-full bg-[#C9CBB8]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <p className="text-sm text-[#6B6656] dark:text-[#B8B5A8]">
              Loading meals...
            </p>
          </motion.div>
        )}

        {!loading && error && (
          <motion.div
            className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </motion.div>
        )}

        {!loading && !error && meals.length === 0 && (
          <motion.div
            className="rounded-2xl border border-[#E4DFD3] bg-white p-10 text-center dark:border-[#30382F] dark:bg-[#1C241E]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-sm text-[#6B6656] dark:text-[#B8B5A8]">
              No meals on the menu yet. Check back soon.
            </p>
          </motion.div>
        )}

        {!loading && !error && meals.length > 0 && (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {meals.map((meal) => (
              <motion.div
                key={meal.idMeal}
                variants={cardVariants}
                whileHover={{ y: -7, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group rounded-2xl border border-[#E4DFD3] bg-white p-2 shadow-sm transition-shadow duration-300 hover:border-[#E8A33D] hover:shadow-xl dark:border-[#30382F] dark:bg-[#1C241E] dark:hover:border-[#E8A33D]"
              >
                <motion.div
                  className="overflow-hidden rounded-xl border border-[#F0ECE3] bg-[#FDFCF9] dark:border-[#30382F] dark:bg-[#202A22]"
                  whileHover={{ borderColor: "#E8A33D" }}
                >
                  <MealCard meal={meal} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}