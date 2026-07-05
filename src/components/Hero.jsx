import { motion } from "framer-motion";

const floatingOrbs = [
  { size: 300, color: "bg-blue-600", top: "10%", left: "5%", delay: 0 },
  { size: 250, color: "bg-purple-600", top: "60%", right: "10%", delay: 1.5 },
  { size: 200, color: "bg-cyan-600", bottom: "10%", left: "40%", delay: 3 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, delay: orb.delay, ease: "easeOut" }}
          className={`absolute rounded-full blur-[150px] animate-float ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-300 to-purple-400 bg-clip-text text-transparent"
          >
            Victor Feno
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="mt-4 text-3xl text-blue-400"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-gray-300 text-lg leading-relaxed max-w-lg"
          >
            Je ne code pas seulement des applications,
            je donne vie aux idées grâce au code,
            à la créativité et à la technologie.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex gap-5">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-blue-600 font-medium cursor-pointer inline-block transition-shadow"
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, background: "white", color: "black" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-gray-600 font-medium cursor-pointer inline-block transition-colors"
            >
              Me contacter
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="bg-[#111] border border-gray-700 rounded-2xl shadow-2xl p-6 font-mono"
        >
          <div className="flex gap-2 mb-5">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="w-3 h-3 rounded-full bg-yellow-500"
            />
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="w-3 h-3 rounded-full bg-green-500"
            />
          </div>

          <p className="text-green-400">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              victor@portfolio
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-gray-500"
            >
              :~
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-blue-400"
            >
              $
            </motion.span>
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-3 text-gray-300"
          >
            <span className="text-blue-400">&gt;</span>&nbsp; whoami
          </motion.p>
          <motion.p
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-2 text-white overflow-hidden whitespace-nowrap border-r-2 border-blue-400"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="mt-5 text-gray-300"
          >
            <span className="text-blue-400">&gt;</span>&nbsp; skills
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="text-purple-400 mt-2"
          >
            React | Node.js | PHP | MySQL | Git
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.8 }}
            className="mt-5 text-gray-300"
          >
            <span className="text-blue-400">&gt;</span>&nbsp; status
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 5.3, type: "spring", stiffness: 200 }}
            className="text-green-400 mt-2"
          >
            Available for internship ✓
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
