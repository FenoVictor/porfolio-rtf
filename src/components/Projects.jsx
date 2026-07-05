import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Solveur Mathématique JavaScript",
    description:
      "Application web permettant de résoudre des équations du second degré et des systèmes linéaires avec la méthode de Cramer.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Résolution d'équations",
      "Gestion des cas Δ < 0, Δ = 0, Δ > 0",
      "Interface interactive",
    ],
    gradient: "from-blue-600 to-purple-600",
  },
  {
    title: "Portfolio Personnel Dynamique",
    description:
      "Création d'un portfolio web responsive permettant de présenter mes compétences, projets et mon parcours informatique.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Design responsive",
      "Navigation fluide",
      "Présentation professionnelle",
    ],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Panneau Publicitaire Animé",
    description:
      "Création d'une animation web simulant un panneau LED avec affichage dynamique.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Animations CSS",
      "Transitions dynamiques",
      "Adaptation aux écrans",
    ],
    gradient: "from-green-600 to-teal-600",
  },
  {
    title: "Résolution Matricielle - Méthode de Cramer",
    description:
      "Application permettant de résoudre des systèmes linéaires à 2 ou 3 inconnues.",
    technologies: ["JavaScript", "Algorithmique"],
    features: [
      "Calcul matriciel",
      "Gestion des coefficients",
      "Interface utilisateur simple",
    ],
    gradient: "from-orange-600 to-red-600",
  },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-black text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Mes projets
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-12 rounded-full"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <TiltCard className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-colors h-full">
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${project.gradient} mb-6`} />

                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {project.title}
                </h3>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-sm text-blue-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <ul className="mt-6 text-gray-400 space-y-2">
                  {project.features.map((feature) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-blue-400">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
