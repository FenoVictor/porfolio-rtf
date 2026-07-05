import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { href: "#hero", label: "Accueil" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-gray-800/50 shadow-lg shadow-blue-900/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.a
          href="#hero"
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          VF.dev
        </motion.a>

        <div className="hidden md:flex gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
        >
          <motion.div
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className="absolute w-6 h-0.5 bg-white rounded"
          />
          <motion.div
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="absolute w-6 h-0.5 bg-white rounded"
          />
          <motion.div
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className="absolute w-6 h-0.5 bg-white rounded"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-gray-800"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white text-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
