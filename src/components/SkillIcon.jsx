import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiPhp,
  SiNodedotjs,
  SiMysql,
  SiGit,
  SiGithub,
  SiCplusplus,
  SiDotnet,
} from 'react-icons/si'
import { Waypoints, Table2, Network, Code, AppWindow, LayoutGrid } from 'lucide-react'

// Icônes "réelles" (logos de marque via react-icons/si) associées à chaque
// compétence par son id. Pour les concepts/outils sans logo officiel
// disponible dans cette librairie (API REST, modélisation relationnelle,
// VS Code, Visual Studio), on garde une icône lucide neutre dans la couleur
// de marque correspondante. C# est représenté par le logo .NET, la
// plateforme sur laquelle il repose (pas de logo C# officiel disponible).
const singleIcons = {
  react: { Icon: SiReact, color: '#61dafb' },
  tailwind: { Icon: SiTailwindcss, color: '#38bdf8' },
  javascript: { Icon: SiJavascript, color: '#f7df1e' },
  php: { Icon: SiPhp, color: '#777bb4' },
  nodejs: { Icon: SiNodedotjs, color: '#5fa04e' },
  mysql: { Icon: SiMysql, color: '#4479a1' },
  cpp: { Icon: SiCplusplus, color: '#00599c' },
  csharp: { Icon: SiDotnet, color: '#512bd4' },
  vscode: { Icon: Code, color: '#007acc' },
  'visual-studio': { Icon: AppWindow, color: '#5c2d91' },
  'rest-api': { Icon: Waypoints, color: '#a855f7' },
  mvc: { Icon: LayoutGrid, color: '#a855f7' },
  sql: { Icon: Table2, color: '#a855f7' },
  'relational-modeling': { Icon: Network, color: '#a855f7' },
}

function SkillIcon({ skillId, size = 20 }) {
  if (skillId === 'html-css') {
    return (
      <span className="flex -space-x-1 text-[10px] font-bold">
        <span className="rounded bg-orange-500 px-1 py-0.5 text-white">5</span>
        <span className="rounded bg-blue-500 px-1 py-0.5 text-white">3</span>
      </span>
    )
  }

  if (skillId === 'git-github') {
    return (
      <span className="flex items-center gap-0.5">
        <SiGit size={size * 0.8} color="#f05032" />
        <SiGithub size={size * 0.8} className="text-text-primary" />
      </span>
    )
  }

  const entry = singleIcons[skillId]
  if (!entry) return null
  const { Icon, color } = entry
  return <Icon size={size} color={color} />
}

export default SkillIcon
