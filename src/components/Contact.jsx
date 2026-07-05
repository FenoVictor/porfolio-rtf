import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "victortsimamandro@gmail.com",
    href: "mailto:victortsimamandro@gmail.com",
  },
  {
    icon: "📱",
    label: "Téléphone",
    value: "+261 37 66 474 77",
    href: "tel:+261376647477",
  },
  {
    icon: "📍",
    label: "Localisation",
    value: "Betania Tanambao",
  },
];

function Contact() {
  return (
    <section id="contact" className="bg-black text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Contactez-moi
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 text-lg text-center max-w-xl mx-auto"
        >
          Vous avez un projet, une opportunité de stage ou une collaboration ?
          Je serais heureux d'échanger avec vous.
        </motion.p>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                className="flex items-center gap-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors group"
              >
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-300">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 space-y-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="text-sm text-gray-400 block mb-2">Nom</label>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-sm text-gray-400 block mb-2">Email</label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="text-sm text-gray-400 block mb-2">Message</label>
              <textarea
                placeholder="Votre message..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </motion.div>
            <motion.button
              type="submit"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium transition-shadow"
            >
              Envoyer le message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
