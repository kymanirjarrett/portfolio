export interface SkillCategory {
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'C#', 'HTML5 / CSS3', 'YAML'],
  },
  {
    label: 'Cloud & Tools',
    skills: [
      'AWS Glue', 'AWS S3', 'AWS EC2', 'AWS Athena', 'AWS Lambda',
      'AWS Step Functions', 'CloudFormation', 'AppFlow',
      'Azure', 'Docker', 'PostgreSQL', 'Supabase',
      'GitHub', 'GitHub Actions', 'Microsoft Power Automate',
    ],
  },
  {
    label: 'Frameworks & Libraries',
    skills: [
      'React', 'Vite', 'Node.js', 'Express', 'FastAPI',
      'Next.js', 'boto3', 'LangChain', 'Sequelize',
      'Liquibase', 'Inversify', 'Tailwind CSS',
    ],
  },
  {
    label: 'Practices',
    skills: [
      'CI/CD', 'ETL Pipeline Development', 'RAG Pipeline Development',
      'Clean Architecture', 'Agile / Scrum', 'SOLID Principles',
    ],
  },
]

export const sphereLogos = [
  { name: 'Python', slug: 'python' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Java', slug: 'openjdk' },
  { name: 'React', slug: 'react' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express', slug: 'express' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Docker', slug: 'docker' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'GitHub', slug: 'github' },
  { name: 'GitHub Actions', slug: 'githubactions' },
  { name: 'Azure', slug: 'microsoftazure' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'HTML5', slug: 'html5' },
  { name: 'CSS3', slug: 'css3' },
]
