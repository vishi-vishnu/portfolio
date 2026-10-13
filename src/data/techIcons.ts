/**
 * Tech icon registry.
 *
 * Every skill and every project "stack" chip looks its logo up here by name.
 * To add a new technology:
 *   1. Find its icon on https://react-icons.github.io/react-icons (search the name, "Si" icons are brand logos)
 *   2. Import it below and add one line to TECH: 'Name': { icon: SiSomething, color: '#hex' }
 * Unknown names still work: they fall back to a generic code icon.
 */
import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiArduino,
  SiBootstrap,
  SiC,
  SiCelery,
  SiConfluence,
  SiCss,
  SiDjango,
  SiDocker,
  SiEspressif,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGreensock,
  SiGithub,
  SiGithubactions,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJsonwebtokens,
  SiKubernetes,
  SiLinux,
  SiN8N,
  SiNginx,
  SiOpencv,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVite,
  SiYaml,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { VscVscode } from 'react-icons/vsc'
import { LuCode, LuContainer, LuCpu, LuDatabase, LuFlaskConical, LuShieldCheck, LuWebhook, LuCloud, LuLayers } from 'react-icons/lu'

export interface TechMeta {
  icon: IconType
  /** Brand colour. Use 'currentColor' for black/white logos so they follow the theme. */
  color: string
}

export const TECH: Record<string, TechMeta> = {
  // Cloud & DevOps
  Docker: { icon: SiDocker, color: '#2496ED' },
  'Docker Compose': { icon: SiDocker, color: '#2496ED' },
  'Docker Hub': { icon: SiDocker, color: '#2496ED' },
  GHCR: { icon: LuContainer, color: '#8B5CF6' },
  Kubernetes: { icon: SiKubernetes, color: '#326CE5' },
  Terraform: { icon: SiTerraform, color: '#844FBA' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  'CI/CD': { icon: SiGithubactions, color: '#2088FF' },
  AWS: { icon: FaAws, color: '#FF9900' },
  'AWS EC2': { icon: FaAws, color: '#FF9900' },
  'AWS S3': { icon: FaAws, color: '#569A31' },
  'AWS Lambda': { icon: FaAws, color: '#FF9900' },
  CloudFront: { icon: LuCloud, color: '#8C4FFF' },
  'API Gateway': { icon: LuWebhook, color: '#E7157B' },
  DynamoDB: { icon: LuDatabase, color: '#4053D6' },
  CloudWatch: { icon: FaAws, color: '#E7157B' },
  Nginx: { icon: SiNginx, color: '#009639' },
  Linux: { icon: SiLinux, color: '#FCC624' },
  Bash: { icon: SiGnubash, color: '#4EAA25' },
  YAML: { icon: SiYaml, color: '#CB171E' },
  Vercel: { icon: SiVercel, color: 'currentColor' },
  CodeQL: { icon: LuShieldCheck, color: '#22C55E' },
  Playwright: { icon: LuFlaskConical, color: '#2EAD33' },

  // Frontend
  React: { icon: SiReact, color: '#61DAFB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  Angular: { icon: SiAngular, color: '#DD0031' },
  Vite: { icon: SiVite, color: '#646CFF' },
  'Framer Motion': { icon: SiFramer, color: 'currentColor' },
  AOS: { icon: LuLayers, color: '#F97316' },
  GSAP: { icon: SiGreensock, color: '#88CE02' },

  // Backend
  Python: { icon: SiPython, color: '#3776AB' },
  Django: { icon: SiDjango, color: '#44B78B' },
  'Django REST Framework': { icon: SiDjango, color: '#E0484F' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  Redis: { icon: SiRedis, color: '#FF4438' },
  Celery: { icon: SiCelery, color: '#A9CC54' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },
  JWT: { icon: SiJsonwebtokens, color: '#D63AFF' },
  'REST APIs': { icon: LuWebhook, color: '#22D3EE' },

  // Tools & workflow
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: 'currentColor' },
  'Git & GitHub': { icon: SiGithub, color: 'currentColor' },
  n8n: { icon: SiN8N, color: '#EA4B71' },
  Jira: { icon: SiJira, color: '#2684FF' },
  Confluence: { icon: SiConfluence, color: '#2684FF' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  'VS Code': { icon: VscVscode, color: '#007ACC' },

  // Embedded / ECE
  ESP32: { icon: SiEspressif, color: '#E7352C' },
  'Embedded C': { icon: SiC, color: '#A8B9CC' },
  C: { icon: SiC, color: '#A8B9CC' },
  Arduino: { icon: SiArduino, color: '#00878F' },
  OpenCV: { icon: SiOpencv, color: '#5C3EE8' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  IoT: { icon: LuCpu, color: '#34D399' },
}

const FALLBACK: TechMeta = { icon: LuCode, color: 'var(--accent)' }

export function getTech(name: string): TechMeta {
  return TECH[name] ?? FALLBACK
}
