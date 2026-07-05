# Portfolio — RANDRIATSITOHAINA Tsimamandro Feno

Portfolio personnel développé avec **React + Vite + Tailwind CSS**, conçu
pour une candidature de stage développeur full stack.

## Stack

- React 18
- Vite
- Tailwind CSS
- lucide-react (icônes)

## Démarrage

```bash
npm install
npm run dev
```

Le site est disponible sur `http://localhost:5173`.

Build de production :

```bash
npm run build
npm run preview
```

## Structure du projet

```
├── Nommage.md            # Conventions de nommage détaillées du projet
├── public/
├── src/
│   ├── assets/            # Images, CV (voir Nommage.md, section 6)
│   ├── components/        # Composants React (PascalCase)
│   ├── data/               # Contenu du site (navLinks, skills, projects...)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
└── vite.config.js
```

## Personnaliser le contenu

Toutes les informations affichées (nav, réseaux sociaux, compétences,
expériences, projets) se modifient uniquement dans `src/data/`, sans jamais
toucher aux composants. Voir `Nommage.md` pour le détail des conventions.

## Assets à remplacer avant mise en ligne

- `src/assets/victor-profile.webp` — déjà en place
- `src/assets/portfolio-preview.png` — placeholder, à remplacer par une vraie capture
- `src/assets/solveur-math.png` — placeholder, à remplacer par une vraie capture
- `src/assets/cv-victor-feno.pdf` — placeholder, à remplacer par le vrai CV
