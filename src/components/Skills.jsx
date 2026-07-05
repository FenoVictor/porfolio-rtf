import { motion } from "framer-motion";

const skills = [
  {
    title: "Frontend",
    icon: "⚡",
    gradient: "from-blue-500 to-blue-300",
    items: [
      { name: "React.js", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    gradient: "from-purple-500 to-purple-300",
    items: [
      { name: "PHP", level: 75 },
      { name: "Node.js", level: 70 },
      { name: "API REST", level: 80 },
      { name: "Architecture MVC", level: 75 },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    gradient: "from-cyan-500 to-cyan-300",
    items: [
      { name: "MySQL", level: 80 },
      { name: "SQL", level: 85 },
      { name: "Modélisation relationnelle", level: 75 },
    ],
  },
  {
    title: "Tools",
    icon: "🛠️",
    gradient: "from-green-500 to-green-300",
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

function Skills() {
  return (
    <section id="skills" className="bg-black text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Mes compétences
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-12 rounded-full"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}>
                  {skill.title}
                </h3>
              </div>

              <div className="space-y-4">
                {skill.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-gray-500">{item.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.gradient} shadow-lg`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
