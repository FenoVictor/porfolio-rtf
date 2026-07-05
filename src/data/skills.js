// Compétences techniques, basées sur le CV réel de l'utilisateur, regroupées
// par catégorie (l'ordre du tableau = l'ordre d'affichage : Frontend,
// Backend, Langages, Base de données, Outils). `featured: true` = affichée
// en badge flottant autour de la photo dans le Hero. L'icône réelle de
// chaque outil est résolue par id dans SkillIcon.jsx.
export const skills = [
  // Frontend
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    description: { fr: 'Bibliothèque JavaScript', en: 'JavaScript library' },
    level: 85,
    featured: true,
    position: 'top-right',
  },
  {
    id: 'html-css',
    name: 'HTML5 / CSS3',
    category: 'Frontend',
    description: { fr: 'Structure & style des pages web', en: 'Web page structure & styling' },
    level: 90,
    featured: true,
    position: 'bottom-right',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: { fr: 'Framework CSS utilitaire', en: 'Utility-first CSS framework' },
    level: 85,
    featured: false,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    description: { fr: 'Langage de programmation', en: 'Programming language' },
    level: 90,
    featured: true,
    position: 'left',
  },

  // Backend
  {
    id: 'php',
    name: 'PHP',
    category: 'Backend',
    description: { fr: 'Langage back-end orienté web', en: 'Web-oriented back-end language' },
    level: 70,
    featured: false,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    description: {
      fr: 'Environnement d’exécution JS côté serveur',
      en: 'Server-side JS runtime environment',
    },
    level: 75,
    featured: false,
  },
  {
    id: 'rest-api',
    name: 'API REST',
    category: 'Backend',
    description: { fr: 'Conception d’API web', en: 'Web API design' },
    level: 75,
    featured: false,
  },
  {
    id: 'mvc',
    name: 'Architecture MVC',
    category: 'Backend',
    description: { fr: 'Organisation du code en couches', en: 'Layered code organization' },
    level: 75,
    featured: false,
  },

  // Langages
  {
    id: 'cpp',
    name: 'C++',
    category: 'Langages',
    description: { fr: 'Programmation orientée performance', en: 'Performance-oriented programming' },
    level: 65,
    featured: false,
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'Langages',
    description: { fr: 'Développement d’applications desktop', en: 'Desktop application development' },
    level: 65,
    featured: false,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Langages',
    description: { fr: 'Langage de requêtes', en: 'Query language' },
    level: 75,
    featured: false,
  },

  // Base de données
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Base de données',
    description: {
      fr: 'Système de gestion de base de données relationnelle',
      en: 'Relational database management system',
    },
    level: 75,
    featured: false,
  },
  {
    id: 'relational-modeling',
    name: 'Modélisation relationnelle',
    category: 'Base de données',
    description: { fr: 'Conception de schémas de données', en: 'Data schema design' },
    level: 70,
    featured: false,
  },

  // Outils
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Outils',
    description: { fr: 'Éditeur de code', en: 'Code editor' },
    level: 85,
    featured: false,
  },
  {
    id: 'visual-studio',
    name: 'Visual Studio',
    category: 'Outils',
    description: { fr: 'Environnement de développement C# / C++', en: 'C# / C++ development environment' },
    level: 70,
    featured: false,
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'Outils',
    description: {
      fr: 'Gestion de versions & collaboration',
      en: 'Version control & collaboration',
    },
    level: 80,
    featured: false,
  },
]
