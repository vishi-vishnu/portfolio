/**
 * Projects section.
 *
 * To add a project:
 *   1. Put a cover image in public/projects/ (1600 x 1000 works best, .webp or .png)
 *   2. Copy one object below, paste it where you want it in the list, and edit the fields.
 * That's it. Filters, cards, the details modal and the hero stats update automatically.
 *
 * Fields
 *   status     'live' | 'completed' | 'in-progress' | 'planned' | 'academic'
 *              (only statuses listed in VISIBLE_STATUSES below show a badge on the card)
 *   categories which filter tabs show it ('devops', 'fullstack', 'frontend', 'iot')
 *   stack      tech names. Logos come from src/data/techIcons.ts
 *   featured   true = big highlighted card at the top
 *   links      any of live / github. Leave out what you don't have.
 */

export type ProjectStatus = 'live' | 'completed' | 'in-progress' | 'planned' | 'academic'

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'devops', label: 'DevOps & Cloud' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'iot', label: 'IoT & ECE' },
] as const

export type ProjectCategoryId = Exclude<(typeof projectCategories)[number]['id'], 'all'>

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  image: string
  imageAlt: string
  year: string
  status: ProjectStatus
  categories: ProjectCategoryId[]
  stack: string[]
  links?: { live?: string; github?: string }
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'projectdesk',
    title: 'ProjectDesk',
    tagline: 'Final-year project management platform with a full DevOps pipeline',
    description:
      'A web app that runs the final-year project process for a college department. Students form teams and upload review files, guides give feedback and marks, and coordinators track every team live. Backed by a CI/CD pipeline with tests, security scanning, a Docker image on GHCR and a Kubernetes rollout test.',
    highlights: [
      'Join-code teams, topic approval, versioned PDF / PPT / image uploads across four review stages, threaded guide feedback and marks.',
      'Role-based access for students, guides and coordinators enforced server-side with Firestore security rules.',
      'GitHub Actions pipeline: lint, type checks, unit tests, security-rules tests, Playwright end-to-end tests and CodeQL scanning.',
      'Multi-stage Docker image pushed to GHCR, Kubernetes rollout tested on kind, Terraform validation and post-deploy smoke tests.',
      'Live on Vercel with seeded demo data, light and dark themes, and real-time updates.',
    ],
    image: '/projects/projectdesk.webp',
    imageAlt: 'ProjectDesk student dashboard showing review progress, stages and team members',
    year: '2026',
    status: 'live',
    categories: ['devops', 'fullstack'],
    stack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Docker', 'GHCR', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Playwright', 'CodeQL', 'Vercel'],
    links: {
      live: 'https://projectdesk-three.vercel.app/dashboard',
      github: 'https://github.com/vishi-vishnu/projectdesk',
    },
    featured: true,
  },
  {
    id: 'social-media-app',
    title: 'Social Media Web App',
    tagline: 'Real-time posts and likes with Google sign-in on Firebase',
    description:
      'A real-time social media web app where people sign in with Google, share short posts and like each other\'s posts. Built with React and TypeScript on Firebase Authentication and Firestore, with a GitHub Actions pipeline that deploys to Firebase Hosting and creates preview builds for pull requests.',
    highlights: [
      'Google sign-in and sign-out with Firebase Authentication; the navbar changes with the user\'s login state.',
      'Firestore-backed post feed with like and unlike actions per user.',
      'Create-post form validated with React Hook Form and Yup.',
      'Component-driven React UI with React Router pages, written in TypeScript.',
      'GitHub Actions deploys to Firebase Hosting on every merge, with preview builds for pull requests.',
    ],
    image: '/projects/social-media-app.webp',
    imageAlt: 'Illustration of a social feed with Google sign-in, posts and like counts powered by Firebase',
    year: '2024',
    status: 'completed',
    categories: ['fullstack', 'frontend'],
    stack: ['React', 'TypeScript', 'Firebase Auth', 'Firestore', 'React Router', 'React Hook Form', 'Yup', 'GitHub Actions', 'Firebase Hosting'],
    links: {
      github: 'https://github.com/vishi-vishnu/react-course/tree/Firebase-Social-Media-project',
    },
  },
  {
    id: 'dockerized-cicd',
    title: 'Dockerized CI/CD Pipeline',
    tagline: 'Push to main, and it tests, builds, ships and self-heals on AWS EC2',
    description:
      'A GitHub Actions pipeline that lints and tests the app, builds a multi-stage Docker image, pushes it to Docker Hub tagged with the commit SHA and deploys it to an AWS EC2 instance over SSH. A post-deploy health check rolls back to the previous image automatically if the new container fails.',
    highlights: [
      'Every push to main runs lint, tests, Docker build, push and deploy with zero manual steps.',
      'Images tagged with the commit SHA, so every deploy is traceable and easy to roll back.',
      'Multi-stage builds and layer caching keep images small and builds fast.',
      'Credentials stored in GitHub Secrets; health check with automatic rollback to the last good tag.',
    ],
    image: '/projects/dockerized-cicd.webp',
    imageAlt: 'Pipeline diagram: GitHub push, Actions lint and test, Docker build, Docker Hub, AWS EC2 deploy with health check and rollback',
    year: '2026',
    status: 'in-progress',
    categories: ['devops'],
    stack: ['Docker', 'GitHub Actions', 'Docker Hub', 'AWS EC2', 'Nginx', 'Bash', 'Linux'],
  },
  {
    id: 'cloud-resume',
    title: 'Cloud Resume on AWS (Serverless)',
    tagline: 'My resume as a serverless AWS app, built with Terraform and CI/CD',
    description:
      'My take on the Cloud Resume Challenge: a resume site on a private S3 bucket served through CloudFront over HTTPS, with a live visitor counter powered by API Gateway, Lambda and DynamoDB. All infrastructure in Terraform, and every push deploys through GitHub Actions with a CloudFront cache invalidation.',
    highlights: [
      'Private S3 bucket reachable only through CloudFront using Origin Access Control.',
      'Visitor counter: browser calls API Gateway, a Python Lambda updates DynamoDB.',
      'Least-privilege IAM role for the Lambda function.',
      'Terraform for every resource; GitHub Actions syncs the build, invalidates the cache and smoke-tests the live URL.',
    ],
    image: '/projects/cloud-resume.webp',
    imageAlt: 'AWS serverless architecture: CloudFront, S3, API Gateway, Lambda, DynamoDB managed by Terraform',
    year: '2026',
    status: 'planned',
    categories: ['devops'],
    stack: ['AWS S3', 'CloudFront', 'API Gateway', 'AWS Lambda', 'DynamoDB', 'Terraform', 'GitHub Actions', 'Python', 'React'],
  },
  {
    id: 'travel-landing',
    title: 'TravelX Landing Page',
    tagline: 'Responsive travel landing page with GSAP scroll animations',
    description:
      'A fully responsive landing page for a travel brand, built from scratch with smooth sliding effects, interactive cards and optimised assets for fast loads on every screen size.',
    highlights: [
      'Built from scratch with semantic HTML5, modern CSS and vanilla JavaScript.',
      'GSAP and ScrollTrigger animations for sliding section reveals.',
      'Optimised images and assets for roughly 30% faster load time.',
      'Consistent layout from small phones to wide desktops.',
    ],
    image: '/projects/travel-landing.webp',
    imageAlt: 'TravelX landing page hero with a coastal road and a ferry on turquoise water',
    year: '2024',
    status: 'live',
    categories: ['frontend'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    links: {
      live: 'https://vishi-vishnu.github.io/Travel-Landing-Page/',
      github: 'https://github.com/vishi-vishnu/Travel-Landing-Page',
    },
  },
  {
    id: 'digital-agency',
    title: 'Digital Agency Website',
    tagline: 'Multi-section agency site built on Bootstrap',
    description:
      'A responsive website for a digital agency with service, project and contact sections, illustrated hero, wave dividers and clean card layouts.',
    highlights: [
      'Responsive Bootstrap grid with a collapsible mobile navbar.',
      'Illustrated hero, wave section dividers and Font Awesome icons.',
      'Reusable section layouts for services, projects and contact.',
    ],
    image: '/projects/digital-agency.webp',
    imageAlt: 'Digital agency website hero in purple with an illustration of people working on a website',
    year: '2024',
    status: 'live',
    categories: ['frontend'],
    stack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    links: {
      live: 'https://vishi-vishnu.github.io/Digital-Agency/',
      github: 'https://github.com/vishi-vishnu/Digital-Agency',
    },
  },
  {
    id: 'shoe-store',
    title: 'Responsive Shoe Store',
    tagline: 'Product landing page with scroll animations',
    description:
      'A bold product landing page for a sneaker store, with a dark theme, gradient buttons and animated product reveal using the AOS library.',
    highlights: [
      'Dark product showcase with gradient call-to-action buttons.',
      'AOS scroll animations for a smooth product reveal.',
      'Responsive layout for mobile and desktop.',
    ],
    image: '/projects/shoe-store.webp',
    imageAlt: 'Shoe store landing page with an orange sneaker on a dark background',
    year: '2024',
    status: 'live',
    categories: ['frontend'],
    stack: ['HTML5', 'CSS3', 'AOS'],
    links: {
      live: 'https://vishi-vishnu.github.io/Responsive-shoes-store/',
      github: 'https://github.com/vishi-vishnu/Responsive-shoes-store',
    },
  },
  {
    id: 'tea-pest-detection',
    title: 'Tea Plantation Pest Detection',
    tagline: 'ESP32-based insect detection with pesticide recommendations',
    description:
      'Final-year ECE project. Insects damage tea crops, and spotting them early is slow when done by hand. We used an ESP32 microcontroller with a camera to capture leaf images, ran image-based detection to identify the insect, and recommended a suitable pesticide for it.',
    highlights: [
      'ESP32 microcontroller with a camera module captures images in the field.',
      'Image-based detection identifies common tea plantation pests.',
      'Recommends a suitable pesticide for the detected insect.',
      'Helps farmers act early and avoid blanket spraying.',
    ],
    image: '/projects/tea-pest-detection.webp',
    imageAlt: 'Diagram: ESP32 camera captures a tea leaf, detection identifies the pest and recommends a pesticide',
    year: '2025',
    status: 'academic',
    categories: ['iot'],
    stack: ['ESP32', 'Embedded C', 'Python', 'IoT'],
  },
]

/** Which statuses get a badge on the card. Add 'in-progress' etc. here if you want them shown. */
export const VISIBLE_STATUSES: ProjectStatus[] = ['live']

export function showStatus(status: ProjectStatus) {
  return VISIBLE_STATUSES.includes(status)
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  completed: 'Completed',
  'in-progress': 'In progress',
  planned: 'Planned',
  academic: 'Academic',
}
