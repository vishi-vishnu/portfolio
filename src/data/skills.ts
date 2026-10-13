/**
 * Skills section.
 *
 * To add a skill: add one line to `skills` below.
 *   { name: 'Ansible', category: 'devops', level: 65 }
 * If the logo is not showing, add the name to src/data/techIcons.ts (one line).
 *
 * To add a whole new category: add it to `skillCategories` and use its id.
 */

export const skillCategories = [
  { id: 'devops', label: 'Cloud & DevOps' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'tools', label: 'Tools & Workflow' },
] as const

export type SkillCategoryId = (typeof skillCategories)[number]['id']

export interface Skill {
  name: string
  category: SkillCategoryId
  /** Proficiency 0-100. Shown as a bar and a label. */
  level: number
  /** Optional short note shown under the name. */
  note?: string
  /** Shows a "learning" tag. Use for skills you are actively growing. */
  learning?: boolean
}

export const skills: Skill[] = [
  // Cloud & DevOps
  { name: 'Docker', category: 'devops', level: 82, note: 'Multi-stage builds, Compose' },
  { name: 'GitHub Actions', category: 'devops', level: 80, note: 'CI/CD pipelines' },
  { name: 'Linux', category: 'devops', level: 75, note: 'Shell, services, permissions' },
  { name: 'Bash', category: 'devops', level: 70, note: 'Automation scripts' },
  { name: 'AWS', category: 'devops', level: 72, note: 'EC2, S3, IAM, CloudWatch', learning: true },
  { name: 'Nginx', category: 'devops', level: 70, note: 'Reverse proxy, static hosting' },
  { name: 'Kubernetes', category: 'devops', level: 65, note: 'Deployments, kind', learning: true },
  { name: 'Terraform', category: 'devops', level: 65, note: 'IaC basics', learning: true },
  { name: 'Vercel', category: 'devops', level: 80, note: 'Deploys, previews' },

  // Frontend
  { name: 'React', category: 'frontend', level: 78, note: 'Hooks, routing, code splitting' },
  { name: 'TypeScript', category: 'frontend', level: 75 },
  { name: 'JavaScript', category: 'frontend', level: 76 },
  { name: 'HTML5', category: 'frontend', level: 85 },
  { name: 'CSS3', category: 'frontend', level: 84 },
  { name: 'Tailwind CSS', category: 'frontend', level: 78 },
  { name: 'Bootstrap', category: 'frontend', level: 80 },
  { name: 'Angular', category: 'frontend', level: 65, note: 'Basics' },

  // Backend & data
  { name: 'Python', category: 'backend', level: 68, note: 'Basics, scripting' },
  { name: 'Django', category: 'backend', level: 74, note: 'Models, middleware' },
  { name: 'Django REST Framework', category: 'backend', level: 74, note: 'APIs, throttling, auth' },
  { name: 'PostgreSQL', category: 'backend', level: 70 },
  { name: 'Redis', category: 'backend', level: 65, note: 'Caching, rate limits' },
  { name: 'Firebase', category: 'backend', level: 75, note: 'Auth, Firestore, rules' },
  { name: 'JWT', category: 'backend', level: 72, note: 'Sessions, RBAC' },

  // Tools & workflow
  { name: 'Git & GitHub', category: 'tools', level: 85, note: 'Branching, PRs, reviews' },
  { name: 'n8n', category: 'tools', level: 75, note: 'Workflow automation' },
  { name: 'Jira', category: 'tools', level: 80, note: 'Agile, Scrum boards' },
  { name: 'Confluence', category: 'tools', level: 75, note: 'Docs, runbooks' },
  { name: 'Postman', category: 'tools', level: 80, note: 'API testing' },
  { name: 'VS Code', category: 'tools', level: 85 },
]

/** Plain-English label for a proficiency number. */
export function levelLabel(level: number): string {
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  return 'Working knowledge'
}
