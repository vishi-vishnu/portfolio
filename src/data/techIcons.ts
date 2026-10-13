/**
 * Tech icon registry.
 *
 * Every skill and every project "stack" chip looks its logo up here by name.
 *
 * To add a new technology, use ONE of these:
 *   A) Full-colour logo (best): download the "original" SVG from https://devicon.dev,
 *      save it in src/assets/logos/, import it below and add:
 *        Ansible: { logo: ansibleLogo, icon: SiAnsible, color: '#EE0000' },
 *   B) Simple icon: find it on https://react-icons.github.io/react-icons (brand logos start with "Si"),
 *      import it and add:  Ansible: { icon: SiAnsible, color: '#EE0000' },
 *
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
  SiReacthookform,
  SiReactrouter,
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
import { LuCode, LuContainer, LuCpu, LuDatabase, LuFlaskConical, LuShieldCheck, LuWebhook, LuCloud, LuLayers, LuListChecks } from 'react-icons/lu'

// Full-colour logos (from devicon.dev, MIT licence)
import angularLogo from '../assets/logos/angular.svg'
import arduinoLogo from '../assets/logos/arduino.svg'
import bootstrapLogo from '../assets/logos/bootstrap.svg'
import confluenceLogo from '../assets/logos/confluence.svg'
import css3Logo from '../assets/logos/css3.svg'
import dockerLogo from '../assets/logos/docker.svg'
import firebaseLogo from '../assets/logos/firebase.svg'
import gitLogo from '../assets/logos/git.svg'
import githubactionsLogo from '../assets/logos/githubactions.svg'
import html5Logo from '../assets/logos/html5.svg'
import javascriptLogo from '../assets/logos/javascript.svg'
import jiraLogo from '../assets/logos/jira.svg'
import kubernetesLogo from '../assets/logos/kubernetes.svg'
import linuxLogo from '../assets/logos/linux.webp'
import playwrightLogo from '../assets/logos/playwright.svg'
import postgresqlLogo from '../assets/logos/postgresql.svg'
import postmanLogo from '../assets/logos/postman.svg'
import pythonLogo from '../assets/logos/python.svg'
import reactLogo from '../assets/logos/react.svg'
import redisLogo from '../assets/logos/redis.svg'
import tailwindLogo from '../assets/logos/tailwindcss.svg'
import terraformLogo from '../assets/logos/terraform.svg'
import typescriptLogo from '../assets/logos/typescript.svg'
import vscodeLogo from '../assets/logos/vscode.svg'

export interface TechMeta {
  /** Simple one-colour icon (also used as fallback). */
  icon: IconType
  /** Brand colour. Use 'currentColor' for black/white logos so they follow the theme. */
  color: string
  /** Optional full-colour logo image. Shown instead of `icon` when present. */
  logo?: string
}

export const TECH: Record<string, TechMeta> = {
  // Cloud & DevOps
  Docker: { icon: SiDocker, color: '#2496ED', logo: dockerLogo },
  'Docker Compose': { icon: SiDocker, color: '#2496ED', logo: dockerLogo },
  'Docker Hub': { icon: SiDocker, color: '#2496ED', logo: dockerLogo },
  GHCR: { icon: LuContainer, color: '#8B5CF6' },
  Kubernetes: { icon: SiKubernetes, color: '#326CE5', logo: kubernetesLogo },
  Terraform: { icon: SiTerraform, color: '#844FBA', logo: terraformLogo },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF', logo: githubactionsLogo },
  'CI/CD': { icon: SiGithubactions, color: '#2088FF', logo: githubactionsLogo },
  AWS: { icon: FaAws, color: '#FF9900' },
  'AWS EC2': { icon: FaAws, color: '#FF9900' },
  'AWS S3': { icon: FaAws, color: '#569A31' },
  'AWS Lambda': { icon: FaAws, color: '#FF9900' },
  CloudFront: { icon: LuCloud, color: '#8C4FFF' },
  'API Gateway': { icon: LuWebhook, color: '#E7157B' },
  DynamoDB: { icon: LuDatabase, color: '#4053D6' },
  CloudWatch: { icon: FaAws, color: '#E7157B' },
  Nginx: { icon: SiNginx, color: '#009639' },
  Linux: { icon: SiLinux, color: '#FCC624', logo: linuxLogo },
  Bash: { icon: SiGnubash, color: '#4EAA25' },
  YAML: { icon: SiYaml, color: '#CB171E' },
  Vercel: { icon: SiVercel, color: 'currentColor' },
  CodeQL: { icon: LuShieldCheck, color: '#22C55E' },
  Playwright: { icon: LuFlaskConical, color: '#2EAD33', logo: playwrightLogo },
  'Firebase Hosting': { icon: SiFirebase, color: '#FFCA28', logo: firebaseLogo },

  // Frontend
  React: { icon: SiReact, color: '#61DAFB', logo: reactLogo },
  TypeScript: { icon: SiTypescript, color: '#3178C6', logo: typescriptLogo },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E', logo: javascriptLogo },
  HTML5: { icon: SiHtml5, color: '#E34F26', logo: html5Logo },
  CSS3: { icon: SiCss, color: '#1572B6', logo: css3Logo },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4', logo: tailwindLogo },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3', logo: bootstrapLogo },
  Angular: { icon: SiAngular, color: '#DD0031', logo: angularLogo },
  Vite: { icon: SiVite, color: '#646CFF' },
  'Framer Motion': { icon: SiFramer, color: 'currentColor' },
  'React Router': { icon: SiReactrouter, color: '#F44250' },
  'React Hook Form': { icon: SiReacthookform, color: '#EC5990' },
  Yup: { icon: LuListChecks, color: '#22D3EE' },
  AOS: { icon: LuLayers, color: '#F97316' },
  GSAP: { icon: SiGreensock, color: '#88CE02' },

  // Backend
  Python: { icon: SiPython, color: '#3776AB', logo: pythonLogo },
  Django: { icon: SiDjango, color: '#44B78B' },
  'Django REST Framework': { icon: SiDjango, color: '#E0484F' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1', logo: postgresqlLogo },
  Redis: { icon: SiRedis, color: '#FF4438', logo: redisLogo },
  Celery: { icon: SiCelery, color: '#A9CC54' },
  Firebase: { icon: SiFirebase, color: '#FFCA28', logo: firebaseLogo },
  Firestore: { icon: SiFirebase, color: '#FFCA28', logo: firebaseLogo },
  'Firebase Auth': { icon: SiFirebase, color: '#FFCA28', logo: firebaseLogo },
  JWT: { icon: SiJsonwebtokens, color: '#D63AFF' },
  'REST APIs': { icon: LuWebhook, color: '#22D3EE' },

  // Tools & workflow
  Git: { icon: SiGit, color: '#F05032', logo: gitLogo },
  GitHub: { icon: SiGithub, color: 'currentColor' },
  'Git & GitHub': { icon: SiGit, color: '#F05032', logo: gitLogo },
  n8n: { icon: SiN8N, color: '#EA4B71' },
  Jira: { icon: SiJira, color: '#2684FF', logo: jiraLogo },
  Confluence: { icon: SiConfluence, color: '#2684FF', logo: confluenceLogo },
  Postman: { icon: SiPostman, color: '#FF6C37', logo: postmanLogo },
  'VS Code': { icon: VscVscode, color: '#007ACC', logo: vscodeLogo },

  // Embedded / ECE
  ESP32: { icon: SiEspressif, color: '#E7352C' },
  'Embedded C': { icon: SiC, color: '#A8B9CC' },
  C: { icon: SiC, color: '#A8B9CC' },
  Arduino: { icon: SiArduino, color: '#00878F', logo: arduinoLogo },
  OpenCV: { icon: SiOpencv, color: '#5C3EE8' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  IoT: { icon: LuCpu, color: '#34D399' },
}

const FALLBACK: TechMeta = { icon: LuCode, color: 'var(--accent)' }

export function getTech(name: string): TechMeta {
  return TECH[name] ?? FALLBACK
}
