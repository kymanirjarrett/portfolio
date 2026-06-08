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
    role: 'Front-End Software Development Intern',
    company: 'Toyz Electronics',
    period: 'Jan – May 2025',
    featured: true,
    bullets: [
      'Designed and implemented a static web application functioning as a dynamic marketplace, showcasing user-generated content from video games to create interactive portfolios tailored for over 5,000 students and professionals, utilizing ReactJS and C#.',
      'Collaborated with four renowned universities to develop an immersive game experience, assisting in building the next-generation version of Dah-Varsity AI with Unreal Engine.',
    ],
    stack: ['React', 'JavaScript', 'C#', 'Unreal Engine'],
  },
  {
    id: 'ucsi',
    role: 'Administrative & Logistics Associate',
    company: 'Center for Student Involvement, University of Cincinnati',
    period: 'Apr 2024 – Aug 2025',
    featured: true,
    bullets: [
      'Efficiently processed & logged 30+ packages and mail items weekly, facilitating timely delivery to clubs & staff.',
      'Maintained 100% accuracy in tracking & inventory of equipment used by over 100 student organizations daily.',
      'Assisted with event planning & coordination and provided exceptional customer service through professional interactions by phone & in person.',
    ],
    stack: [],
  },
  {
    id: 'handshake',
    role: 'Handshake Creator',
    company: 'Handshake',
    period: 'Jul 2025',
    featured: false,
    bullets: [
      'Filmed high-quality content following platform guidelines; produced 3 pieces per week spanning text posts and videos on career topics and the college experience.',
      'Acted as a liaison between Handshake and the university, representing the organization at on-campus events and fostering community.',
    ],
    stack: [],
  },
  {
    id: 'turbotax',
    role: 'Technical Product Expert',
    company: 'Intuit TurboTax',
    period: 'Mar 2024 – Apr 2025',
    featured: false,
    bullets: [
      'Provided real-time chat & phone support to customers preparing & filing taxes, delivering expert guidance on troubleshooting software navigation and technical issues related to account access and product performance.',
      'Resolved tickets efficiently in a high-volume remote environment while maintaining strict confidentiality and adhering to all data privacy protocols.',
    ],
    stack: [],
  },
]
