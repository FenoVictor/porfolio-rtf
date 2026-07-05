// Projets présentés dans la section Projets. `image` pointe vers un fichier
// dans src/assets/. `link` et `repo` peuvent être laissés à '#' en attendant
// les vraies URLs de démo / dépôt. `title` et `description` sont bilingues.
export const projects = [
  {
    id: 'portfolio-dev',
    image: 'portfolio-preview.png',
    stack: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'Portfolio Développeur',
      en: 'Developer Portfolio',
    },
    description: {
      fr: 'Ce portfolio même : une vitrine personnelle full stack pensée pour un design distinctif, un code organisé et des données découplées des composants.',
      en: 'This very portfolio: a personal full-stack showcase built for a distinctive design, organized code, and data decoupled from components.',
    },
  },
  {
    id: 'vondrona',
    image: 'vondrona-preview.svg',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.IO'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'Vondrona — Réseau Social ENI',
      en: 'Vondrona — ENI Social Network',
    },
    description: {
      fr: 'Mini réseau social pour les étudiants de l\'ENI Toliara avec publications, réactions, groupes, événements et messagerie en temps réel via Socket.IO.',
      en: 'Mini social network for ENI Toliara students featuring posts, reactions, groups, events and real-time messaging via Socket.IO.',
    },
  },
  {
    id: 'devhub',
    image: 'devhub-preview.svg',
    stack: ['Node.js', 'Express', 'MySQL', 'JWT', 'Helmet'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'DevHub — Plateforme Développeurs',
      en: 'DevHub — Developer Platform',
    },
    description: {
      fr: 'API backend pour une plateforme collaborative de développeurs intégrant profils, abonnements, et authentification sécurisée avec GitHub et Trello en roadmap.',
      en: 'Backend API for a collaborative developer platform with profiles, subscriptions, secure auth, and GitHub/Trello integration on the roadmap.',
    },
  },
  {
    id: 'porfolio-animated',
    image: 'porfolio-preview.svg',
    stack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'Porfolio — Version Animée',
      en: 'Porfolio — Animated Version',
    },
    description: {
      fr: 'Version animée de mon portfolio avec un hero en style terminal, des cartes 3D flottantes, des orbes lumineuses et une esthétique cyberpunk.',
      en: 'Animated version of my portfolio with a terminal-style hero, floating 3D tilt cards, glowing orbs and a cyberpunk aesthetic.',
    },
  },
  {
    id: 'stagelink',
    image: 'stagelink-preview.svg',
    stack: ['React', 'Laravel', 'MySQL', 'TanStack Query', 'Sanctum'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'StageLink — Plateforme de Stages',
      en: 'StageLink — Internship Platform',
    },
    description: {
      fr: 'Plateforme connectant étudiants et entreprises : dépôt d\'offres, candidatures, profils entreprise et administration, avec trois rôles utilisateur.',
      en: 'Platform connecting students and companies: job postings, applications, company profiles and admin dashboard with three user roles.',
    },
  },
  {
    id: 'todo-list',
    image: 'todo-list-preview.svg',
    stack: ['React', '@dnd-kit', 'Framer Motion', 'Tailwind CSS'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'To-Do List — Gestionnaire de Tâches',
      en: 'To-Do List — Task Manager',
    },
    description: {
      fr: 'Application moderne de gestion de tâches avec glisser-déposer, filtres, recherche, catégories, animations fluides et persistance locale.',
      en: 'Modern task management app with drag-and-drop, filters, search, categories, smooth animations and local storage persistence.',
    },
  },
  {
    id: 'solveur-math',
    image: 'solveur-math.png',
    stack: ['JavaScript', 'HTML', 'CSS'],
    link: '#',
    repo: '#',
    featured: true,
    title: {
      fr: 'Solveur Math',
      en: 'Math Solver',
    },
    description: {
      fr: 'Application web qui résout des expressions et équations mathématiques étape par étape, avec un affichage pédagogique du raisonnement.',
      en: 'Web app that solves math expressions and equations step by step, with a teaching-friendly display of the reasoning.',
    },
  },
]
