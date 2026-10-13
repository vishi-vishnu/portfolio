/**
 * Personal details used across the site (hero, about, contact, footer, SEO).
 * Edit this file to change your name, roles, links or bio. No component changes needed.
 */

export const profile = {
  name: 'Vishnu Kumar G K',
  shortName: 'Vishnu',
  initials: 'VK',
  handle: 'vishnu', // shown in the terminal prompt: vishnu@cloud:~$

  /** Rotating titles in the hero. The first one is the primary role. */
  roles: ['DevOps Engineer', 'Full Stack Engineer', 'Cloud & CI/CD Builder'],

  headline: 'I build web apps, containerize them and ship them through CI/CD.',
  intro:
    'DevOps-focused engineer with full stack roots. I work across React and Django on the app side, and Docker, GitHub Actions, AWS and Linux on the delivery side, so code goes from commit to production with tests, checks and zero manual steps.',

  location: 'India',
  availability: 'Open to DevOps & Full Stack roles',

  email: 'vishi08vishnu@gmail.com',
  /** Leave empty to keep your number off the public site. */
  phone: '' as string,

  resume: '/Vishnu_Kumar_GK_Resume.pdf',

  socials: {
    github: 'https://github.com/vishi-vishnu',
    linkedin: 'https://www.linkedin.com/in/vishnu081/',
  },

  /** About section. Each paragraph is a string. */
  about: [
    "I'm an Electronics and Communication engineer who moved into software, and I've spent the last year building and shipping a multi-tenant SaaS platform at Inthera Consulting Group. That work taught me the full path: React and TypeScript screens, Django REST APIs, Redis-backed rate limiting, and the Docker Compose setup that runs it all.",
    "Beyond code, I'm a creative person with a keen interest in AI and good design. I'm expanding my expertise into the DevOps domain, working with AWS cloud services, containerization with Docker, and automation through Linux and shell scripting. This combination lets me deploy AI models efficiently and build scalable infrastructure.",
    "I'm passionate about creating intelligent systems that are not only powerful but also reliable, scalable and production-ready. Whether it's building AI solutions or automating deployment pipelines, I focus on quality and efficiency.",
  ],

  /** Highlighted separately at the end of the About text. */
  goal: 'My goal is to leverage both AI and cloud technologies to create innovative solutions that make a real impact.',

  /** Hero numbers. Update these by hand when they change. */
  stats: {
    yearsInIndustry: 1,
    technologies: 15,
  },

  /** The three focus cards in the About section. */
  focus: [
    {
      key: 'cloud',
      title: 'Cloud & DevOps',
      text: 'Docker multi-stage builds, GitHub Actions CI/CD, GHCR, AWS (EC2, S3, IAM, CloudWatch), Nginx, Linux, Kubernetes and Terraform basics.',
    },
    {
      key: 'web',
      title: 'Web & Frontend',
      text: 'Responsive, fast interfaces in React, TypeScript, Tailwind and Bootstrap. Code splitting, reusable components and clean UX.',
    },
    {
      key: 'fullstack',
      title: 'Full Stack & APIs',
      text: 'Django REST Framework, JWT and RBAC, API keys with scopes, Redis rate limiting, PostgreSQL, Firebase and webhooks.',
    },
  ],

  certifications: [
    { name: 'Discover DevOps', issuer: 'Microsoft' },
    { name: 'AWS Cloud Practitioner Essentials', issuer: 'AWS' },
    { name: 'Programming with JavaScript', issuer: 'Meta · Coursera' },
    { name: 'React.js Basics', issuer: 'Meta · Coursera' },
    { name: 'Web Development', issuer: 'Open Weaver · ICT Academy' },
  ],

  languages: ['English', 'Tamil', 'Sourastra'],
} as const

export type Profile = typeof profile
