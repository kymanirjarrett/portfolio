export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  kind: string
  description: string
  /** Extra line shown when space allows. */
  context?: string
  stack: string[]
  caseStudy: string | null
  liveUrl: string | null
  repoUrl: string | null
  inDevelopment: boolean
}

export const projects: Project[] = [
  {
    id: 'vigil',
    title: 'Vigil',
    kind: 'ETL observability platform',
    description:
      'Vigil is an ETL observability platform I built to monitor AWS Glue pipelines in real time. It catches duration spikes and repeated failures, sends alerts before they cascade downstream, and runs on a security foundation with role-based access, audit logging, and row-level security on every table.',
    stack: [
      'React',
      'Vite',
      'Python',
      'FastAPI',
      'PostgreSQL (Supabase)',
      'Alembic',
      'boto3',
      'AWS Glue',
      'JWT',
      'SendGrid',
      'Vercel',
      'Render',
    ],
    caseStudy: '/projects/vigil',
    liveUrl: 'https://vigil-three-amber.vercel.app',
    repoUrl: 'https://github.com/kymanirjarrett/vigil',
    inDevelopment: false,
  },
  {
    id: 'clausify',
    title: 'Clausify',
    kind: 'AI contract analysis',
    description:
      'Clausify is an AI contract analysis platform for freelancers and small businesses. Upload a contract and it scores the risk of every clause against industry-standard language, using a RAG pipeline built with LangChain and the Groq API. It runs on Spring Boot and MySQL with an Angular front end, and only ever stores the extracted text, never the contract itself. Currently in active development.',
    stack: [
      'Spring Boot',
      'Spring Data JPA',
      'MySQL',
      'Angular',
      'Tailwind CSS',
      'LangChain',
      'Groq',
    ],
    caseStudy: '/projects/clausify',
    liveUrl: null,
    repoUrl: 'https://github.com/kymanirjarrett/clausify',
    inDevelopment: true,
  },
  {
    id: 'bearcat-buddies',
    title: 'Bearcat Buddies recruitment automation',
    kind: 'Power Automate system',
    description:
      "I replaced Bearcat Buddies' pen-and-paper recruitment process with a Power Automate system that credits every sign-up to the ambassador who recruited them, sends automatic welcome emails, and tracks quotas and attendance on a live dashboard. I also wrote the reset guide so whoever comes after me can run it without any technical background.",
    context: "Bearcat Buddies is UC's largest tutoring pathway into Cincinnati Public Schools.",
    stack: ['Power Automate', 'SharePoint', 'Excel', 'QR codes'],
    caseStudy: null,
    liveUrl: null,
    repoUrl: null,
    inDevelopment: false,
  },
]
