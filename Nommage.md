# Conventions de nommage — Portfolio Victor Feno

Ce document liste les règles de nommage appliquées dans tout le projet.
L'objectif : un code prévisible, cohérent, et facile à relire pour n'importe
quel développeur qui rejoint le projet (ou un recruteur qui regarde le repo).

---

## 1. Composants React — `PascalCase`

Chaque composant a son propre fichier, nommé exactement comme le composant
qu'il exporte.

```
src/components/Navbar.jsx        -> export default function Navbar()
src/components/Hero.jsx          -> export default function Hero()
src/components/About.jsx         -> export default function About()
src/components/Skills.jsx        -> export default function Skills()
src/components/Experience.jsx    -> export default function Experience()
src/components/Projects.jsx      -> export default function Projects()
src/components/Contact.jsx       -> export default function Contact()
src/components/Footer.jsx        -> export default function Footer()
src/components/SkillBadge.jsx    -> export default function SkillBadge()
```

Règle : un composant = un fichier = un export par défaut du même nom.

---

## 2. Nom des dossiers — `camelCase`

Tous les dossiers du projet suivent le camelCase (les dossiers ici sont des
mots simples, donc la casse ne change rien visuellement, mais la règle
s'applique dès qu'un dossier a un nom composé, ex. futur `formComponents/`,
`apiServices/`).

```
src/components/
src/data/
src/assets/
```

---

## 3. Variables et tableaux — `camelCase`

Toutes les variables JS, y compris les tableaux de données exportés depuis
`src/data/`, sont en camelCase.

```js
export const navLinks = [...]
export const socialLinks = [...]
export const skills = [...]
export const experiences = [...]
export const projects = [...]

const featuredSkills = skills.filter(...)
const isMenuOpen = useState(false)
```

---

## 4. IDs HTML — `kebab-case`

Chaque `id` posé dans le HTML/JSX suit le kebab-case, pour rester lisible en
CSS/JS natif et cohérent avec les conventions HTML classiques.

```
id="nav-logo"
id="nav-links"
id="lang-switch-btn"
id="settings-btn"
id="mobile-menu-toggle"
id="mobile-menu"
id="cta-view-projects"
id="cta-download-cv"
id="hero-social-links"
id="about-highlights"
id="skills-grid"
id="experience-timeline"
id="projects-grid"
id="contact-form"
id="contact-name"
id="contact-email"
id="contact-message"
id="contact-submit-btn"
id="footer-social-links"
```

---

## 5. Classes CSS — Tailwind uniquement

Pas de CSS custom en dehors de `src/index.css` (directives Tailwind + une
poignée d'utilitaires globaux comme `.text-gradient-brand`). Le style vient
des classes utilitaires Tailwind directement dans le JSX, avec des tokens de
design centralisés dans `tailwind.config.js` (`accent-purple`, `accent-blue`,
`bg-primary`, `bg-secondary`, etc.) plutôt que des couleurs codées en dur.

---

## 6. Fichiers et assets — `kebab-case`

Tous les fichiers dans `src/assets/` suivent le kebab-case, avec une
extension adaptée à leur usage réel (`.webp` pour les photos compressées,
`.png` pour les captures d'écran, `.pdf` pour les documents).

```
src/assets/victor-profile.webp
src/assets/rtf-logo.webp
src/assets/portfolio-preview.png
src/assets/cv-victor-feno.pdf
src/assets/solveur-math.png
```

> Les fichiers `portfolio-preview.png`, `solveur-math.png` et
> `cv-victor-feno.pdf` fournis dans ce projet sont des **placeholders**
> générés automatiquement. Remplacez-les par vos vraies captures d'écran et
> votre vrai CV avant mise en ligne, en gardant exactement les mêmes noms de
> fichiers (ou en mettant à jour les références dans `src/data/projects.js`
> et `src/components/Hero.jsx`).

---

## 7. Données séparées des composants — `src/data/`

Aucune donnée de contenu (liens de nav, réseaux sociaux, compétences,
expériences, projets) n'est écrite en dur dans un composant. Tout vit dans
`src/data/*.js`, sous forme de tableaux d'objets exportés en `camelCase` :

```
src/data/navLinks.js
src/data/socialLinks.js
src/data/skills.js
src/data/experiences.js
src/data/projects.js
```

Les composants ne font qu'importer et afficher ces données. Pour ajouter un
projet ou une expérience, il suffit d'ajouter une entrée dans le tableau
correspondant — aucun composant à toucher.

---

## 9. Sections de page — `id` = ancre de navigation

Chaque section principale a un `id` en kebab-case qui sert d'ancre pour la
Navbar (`href="#a-propos"`, etc.) :

```
#accueil
#a-propos
#competences
#experiences
#projets
#contact
```

---

## 10. Thème (clair/sombre) et langue (FR/EN)

- `src/context/ThemeContext.jsx` : fournit `theme` (`'dark' | 'light'`) et
  `toggleTheme()`. Le thème est appliqué via l'attribut `data-theme` sur
  `<html>`, et les couleurs correspondantes sont définies en variables CSS
  dans `src/index.css` (`:root` = sombre, `[data-theme='light']` = clair).
  Choix persistant dans `localStorage`.
- `src/context/LanguageContext.jsx` : fournit `language` (`'fr' | 'en'`),
  `toggleLanguage()` et un helper `t('section.cle')` pour lire une chaîne
  dans `src/data/translations.js`. Choix persistant dans `localStorage`.
- Le contenu **statique** de l'interface (titres de section, libellés,
  boutons) vit dans `src/data/translations.js`.
- Le contenu **dynamique** (compétences, expériences, projets) reste dans
  son fichier `data/*.js` respectif, avec des champs bilingues sous la forme
  `{ fr: '...', en: '...' }` plutôt qu'une chaîne simple.

