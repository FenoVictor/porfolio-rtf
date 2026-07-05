import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "#", icon: "GH" },
  { label: "LinkedIn", href: "#", icon: "LI" },
  { label: "Twitter", href: "#", icon: "TW" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-gray-800/50 text-gray-400 py-8 relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-sm"
        >
          © 2026 Victor Feno - Full Stack Developer
        </motion.p>

        <div className="flex gap-4">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              whileHover={{ scale: 1.2, color: "#60a5fa" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-sm hover:border-blue-500 transition-colors"
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="text-sm text-gray-500 hover:text-blue-400 transition-colors cursor-pointer"
        >
          ↑ Haut de page
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;
