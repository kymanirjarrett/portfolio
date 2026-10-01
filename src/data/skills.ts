export interface SkillCategory {
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'C#'],
  },
  {
    label: 'Frameworks & libraries',
    skills: [
      'Spring Boot',
      'Spring Data JPA',
      'React',
      'Angular',
      'Node.js',
      'Express',
      'FastAPI',
      'ASP.NET MVC',
      'Tailwind CSS',
    ],
  },
  {
    label: 'Cloud & data',
    skills: [
      'AWS (Glue, S3, Athena, Lambda, Step Functions, CloudFormation)',
      'Azure',
      'Apache Spark',
      'PostgreSQL',
      'MySQL',
    ],
  },
  {
    label: 'AI & developer tools',
    skills: ['LangChain', 'RAG', 'Git', 'GitHub Actions (CI/CD)', 'Docker'],
  },
]
