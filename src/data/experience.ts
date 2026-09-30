export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  bullets: string[]
  stack: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'smucker',
    role: 'Cloud Data Engineer Intern',
    company: 'The J.M. Smucker Company',
    period: 'May – Aug 2026',
    bullets: [
      'Migrated a production CloudFormation repository from GitLab to GitHub Actions and wrote the template that provisions an OIDC identity provider and IAM roles, so deployments authenticate to AWS with no stored keys.',
      'Owned a new data field across every layer of a partner-driven ingestion pipeline (AppFlow, Glue, Athena), and rewrote a Glue ETL job after testing exposed CSV edge cases that were silently corrupting data.',
      "Moved an enterprise notification service's Lambdas off an end-of-life Python runtime (3.9 to 3.12), rebuilding prebuilt layers and centralizing the runtime version in a single GitHub Actions variable.",
      "Gave a 15-minute talk to Smucker's engineering center of excellence arguing that architecture is a handoff mechanism, not an aesthetic.",
    ],
    stack: [
      'CloudFormation',
      'GitHub Actions',
      'IAM / OIDC',
      'AWS Glue',
      'Athena',
      'AppFlow',
      'Lambda',
      'S3',
      'Step Functions',
      'Python',
    ],
  },
  {
    id: 'itsc',
    role: 'Software Engineer Intern',
    company: 'UC IT Solutions Center',
    period: 'Aug 2025 – May 2026',
    bullets: [
      'Built a multi-service referral platform for a Fortune 500 client with 2,000+ users: service-specific React forms with per-service Zod validation, document uploads, a six-stage referral lifecycle, and role-based permissions middleware.',
      'Engineered the referral processing workflow through every layer of a Clean Architecture stack (Liquibase, Sequelize, use cases, repositories, Express controllers, TanStack hooks), writing student, service, and enrollment records in one transaction with upserts to prevent duplicates.',
      'Cut data processing time 30% by moving computation server-side through optimized queries, typed projections, and PostgreSQL views, and sped up releases 20% through bi-weekly stakeholder demos.',
    ],
    stack: [
      'React',
      'TypeScript',
      'TanStack',
      'Zod',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'Liquibase',
      'Inversify',
    ],
  },
  {
    id: 'toyz',
    role: 'Software Development Intern',
    company: 'Toyz Electronics',
    period: 'Jan – May 2025',
    bullets: [
      'Owned the student directory for DahVarsity AI, a gamified STEAM platform with 5,000+ registered users: a three-level React drill-down from schools to rosters to student profiles.',
      "Built a player card carousel that renders in-game profile data from the game's backend API through reusable, prop-driven components.",
      "Turned the CEO's feature concepts into shipped UI in weekly sprints with the CTO, PM, and four partner universities, including integration testing against the Unreal Engine game.",
    ],
    stack: ['React', 'JavaScript', 'REST APIs'],
  },
]
