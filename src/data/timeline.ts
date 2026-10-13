/**
 * Career timeline (About section). Newest entry first.
 * Add a new job or course by adding one object to the top of the list.
 */

export type TimelineKind = 'work' | 'internship' | 'education'

export interface TimelineItem {
  kind: TimelineKind
  title: string
  org: string
  period: string
  /** Mark the current role so it gets the live "running" indicator. */
  current?: boolean
  points: string[]
  tags?: string[]
}

export const timeline: TimelineItem[] = [
  {
    kind: 'work',
    title: 'Full Stack Engineer',
    org: 'Inthera Consulting Group',
    period: 'Jan 2026 - Present',
    current: true,
    points: [
      'Build features for Inflow, a multi-tenant SaaS platform for projects, tasks, tickets and time tracking (React + TypeScript frontend, Django REST Framework backend).',
      'Built hashed API-key auth with scopes and plan-based rate limiting (30 / 150 / 300 requests per minute) using Redis-backed DRF throttling.',
      'Centralised scattered role checks into a permission catalogue with JWT sessions and RBAC, without changing existing access behaviour.',
      'Added React.lazy code splitting across 14 routes, cutting about 800 KB from the first load.',
    ],
    tags: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    kind: 'internship',
    title: 'DevOps Intern',
    org: 'Inthera Consulting Group',
    period: 'Oct 2025 - Dec 2025',
    points: [
      'Containerised the development stack (Django, PostgreSQL, Redis) with Docker and Docker Compose, including migrations, health checks and environment config.',
      'Shipped changes through a GitHub Actions CI/CD pipeline and tested REST APIs with Postman and automated test suites.',
      'Worked in Agile sprints with Jira and Confluence, using pull requests and code reviews on GitHub.',
    ],
    tags: ['Docker', 'Docker Compose', 'GitHub Actions', 'Linux', 'Postman'],
  },
  {
    kind: 'education',
    title: 'B.E. Electronics and Communication Engineering',
    org: 'K.L.N College of Engineering',
    period: '2021 - 2025',
    points: [
      'CGPA 7.79. Coursework in Software Engineering, Web Development, DBMS, SDLC and DevOps.',
      'Final-year project: image-based pest detection for tea plantations using an ESP32 module.',
    ],
    tags: ['C', 'Embedded', 'IoT', 'Web Development'],
  },
]
