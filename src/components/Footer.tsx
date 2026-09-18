import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

const links = [
  ["/MealsPage", "All Meals"],
  ["/CategoryPage", "Categories"],
  ["/SearchPage", "Search Recipes"],
  ["/MenuPage", "Menu"],
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const windowToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative overflow-hidden border-t border-white/10 bg-[#2E2A1E] text-[#C9CBB8] transition-colors duration-300 dark:bg-[#2E2A1E]"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#E8A33D]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#8FAF8F]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <motion.div variants={fadeUp} className="max-w-sm">
            <Link
              to="/hompage"
              className="font-serif text-2xl font-semibold text-[#F7F4EE]"
            >
              Butcher&apos;s{" "}
              <span className="text-[#E8A33D]">Kitchen</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[#C9CBB8]/80">
              Explore delicious recipes from around the world, discover new
              meals, and find something special to cook today.
            </p>

            {/* <div className="mt-6 flex gap-3">
              {["IG", "FB", "X"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm hover:border-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#1f3d2e]"
                >
                  {social}
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Explore */}
          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7F4EE]">
              Explore
            </h3>

            <div className="mt-5 space-y-3 text-sm">
              {links.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={windowToTop}
                  className="group flex w-fit items-center gap-2 transition-colors hover:text-[#E8A33D]"
                >
                  <span className="h-px w-0 bg-[#E8A33D] transition-all duration-300 group-hover:w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7F4EE]">
              Reach us
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#C9CBB8]/50">
                  Email
                </span>
                <a
                  href="mailto:hello@butchers-kitchen.app"
                  className="hover:text-[#E8A33D]"
                >
                  hello@butchers-kitchen.app
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-[#C9CBB8]/50">
                  Opening Hours
                </span>
                <span>Mon-Sat, 9am-8pm</span>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-[#C9CBB8]/50">
                  Explore
                </span>
                <Link to="/hompage" className="hover:text-[#E8A33D]">
                  Butcher&apos;s Kitchen
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <motion.div
          variants={fadeUp}
          className="mx-auto flex max-w-7xl justify-center px-6 py-5 text-xs text-[#C9CBB8]/60"
        >
          © {new Date().getFullYear()} Butcher&apos;s Kitchen. All rights
          reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
}