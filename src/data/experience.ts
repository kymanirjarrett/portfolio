export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  featured: boolean
  bullets: string[]
  stack: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'smucker',
    role: 'Cloud Data Engineer',
    company: 'The J.M. Smucker Company',
    period: 'May – Aug 2026',
    featured: true,
    bullets: [
      'Led migration of Sales Marketing & Analytics CloudFormation templates to GitHub with production-grade deployment workflows, replacing the existing CI/CD pipeline.',
      'Drove partner-driven identification integration across a full raw → curated → published ETL pipeline using AppFlow, Glue, and Athena validation.',
      'Coordinated Lambda runtime upgrades across cross-functional teams using YAML IaC CloudFormation.',
    ],
    stack: ['AWS Glue', 'S3', 'Athena', 'Lambda', 'Step Functions', 'CloudFormation', 'AppFlow', 'GitHub Actions', 'Informatica IICS', 'Python', 'boto3'],
  },
  {
    id: 'itsc',
    role: 'Full Stack Software Engineer',
    company: 'UC IT Solutions Center',
    period: 'Aug 2025 – May 2026',
    featured: true,
    bullets: [
      'Built full-stack applications for Fortune 500 clients using ReactJS (Vite), TanStack, and Zod on the frontend.',
      'Designed Node/TypeScript + Express APIs with PostgreSQL (Sequelize), Inversify DI, and Liquibase migrations.',
      'Reduced data processing time by 30% and accelerated release cycles by 20% through Clean Architecture and SOLID principles.',
    ],
    stack: ['React', 'Vite', 'TanStack', 'Zod', 'Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Sequelize', 'Inversify', 'Liquibase'],
  },
  {
    id: 'toyz',
    role: 'Front-End Engineering Intern',
    company: 'Toyz Electronics',
    period: 'Jan – May 2025',
    featured: false,
    bullets: [
      'Built and shipped customer-facing UI features.',
    ],
    stack: ['React', 'JavaScript'],
  },
  {
    id: 'handshake',
    role: 'Handshake Creator',
    company: 'Handshake',
    period: 'Jul 2025',
    featured: false,
    bullets: [
      "Produced technical content for Handshake's student creator program.",
    ],
    stack: [],
  },
]
