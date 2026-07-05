import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const timeline = [
  { year: "2024", text: "Début du parcours en développement informatique" },
  { year: "2025", text: "Création de projets web et approfondissement des technologies Full Stack" },
  { year: "2026", text: "Recherche d'un stage pour appliquer mes compétences" },
];

const stats = [
  { label: "Projets", value: 4, suffix: "+" },
  { label: "Technologies", value: 8, suffix: "+" },
  { label: "Passion", value: "∞" },
];

function AnimatedCounter({ to, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= to) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function About() {
  return (
    <section id="about" className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-4"
        >
          À propos de moi
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-12 rounded-full"
        />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-colors"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-300 leading-relaxed"
            >
              Je suis Victor Feno, développeur Full Stack passionné par la création d'applications web modernes.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-5 text-gray-300 leading-relaxed"
            >
              J'aime transformer des idées en solutions numériques en combinant une interface intuitive, une logique backend solide et une base de données bien structurée.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-5 text-gray-300 leading-relaxed"
            >
              Actuellement à la recherche d'un stage, je souhaite rejoindre une équipe professionnelle afin de développer mes compétences et contribuer à des projets innovants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-800"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {typeof stat.value === "number" ? (
                      <AnimatedCounter to={stat.value} suffix={stat.suffix || ""} />
                    ) : (
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative border-l border-blue-500/30 pl-8 space-y-12">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.2 + 0.1, type: "spring", stiffness: 200 }}
                    className="absolute -left-[2.35rem] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-black shadow-lg shadow-blue-500/30"
                  />
                  {i < timeline.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      transition={{ duration: 0.5 }}
                      className="absolute -left-[1.85rem] top-5 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"
                    />
                  )}
                  <h3 className="text-blue-400 font-bold text-lg">{entry.year}</h3>
                  <p className="text-gray-300 mt-1">{entry.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
