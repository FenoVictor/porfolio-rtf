// Parcours académique, basé sur le CV réel de l'utilisateur.
// type : 'formation' | 'stage' | 'projet-academique' (le libellé affiché
// vient de translations.js). `title` et `description` sont bilingues.
export const experiences = [
  {
    id: 'projet-solveur-math',
    type: 'projet-academique',
    organization: 'Travail personnel / En groupe / ENI',
    period: '2025 — 2026',
    title: {
      fr: 'Développeur — Projet académique',
      en: 'Developer — Academic project',
    },
    description: {
      fr: 'Conception et développement d’une application web, site vitrine, résolvant des problèmes mathématiques pas à pas, avec une interface claire pensée pour les étudiants.',
      en: 'Design and development of a web application, a showcase site, solving math problems step by step, with a clear interface built for students.',
    },
  },
  {
    id: 'eni-l2',
    type: 'formation',
    organization: 'École Nationale de l’Informatique (ENI) Toliara',
    period: '2025 — 2026',
    title: {
      fr: 'Licence 2 — Informatique',
      en: 'Bachelor 2 — Computer Science',
    },
    description: {
      fr: 'Deuxième année du cursus Informatique à l’ENI Toliara, avec un approfondissement du développement web, des bases de données et de l’algorithmique.',
      en: 'Second year of the Computer Science program at ENI Toliara, going deeper into web development, databases and algorithmics.',
    },
  },
  {
    id: 'eni-l1',
    type: 'formation',
    organization: 'École Nationale de l’Informatique (ENI) Toliara',
    period: '2024 — 2025',
    title: {
      fr: 'Licence 1 — Informatique',
      en: 'Bachelor 1 — Computer Science',
    },
    description: {
      fr: 'Première année du cursus Informatique, complétée par une formation aux ateliers Solidarité e-Toly.',
      en: 'First year of the Computer Science program, complemented by training at the Solidarité e-Toly workshops.',
    },
  },
  {
    id: 'baccalaureat',
    type: 'formation',
    organization: 'Baccalauréat — Série D',
    period: '2023 — 2024',
    title: {
      fr: 'Baccalauréat, série D',
      en: 'High school diploma, science track',
    },
    description: {
      fr: 'Obtention du baccalauréat scientifique, série D, point de départ de mon parcours en informatique.',
      en: 'Obtained a science-track high school diploma, the starting point of my journey into computer science.',
    },
  },
]
