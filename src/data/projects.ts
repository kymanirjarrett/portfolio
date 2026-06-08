export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  problem: string
  stack: string[]
  links: { label: string; href: string }[]
  liveUrl: string | null
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'vigil',
    title: 'Vigil',
    tagline: 'ETL Monitoring & Observability Platform',
    description:
      'Production-grade platform for monitoring AWS ETL pipelines with statistical anomaly detection, automated alerting, and 7/30-day trend analysis.',
    problem:
      'ETL pipeline failures are silent and costly. Vigil surfaces duration spikes, consecutive failures, and drift before they become incidents.',
    stack: ['React', 'Vite', 'Python', 'FastAPI', 'AWS', 'boto3', 'PostgreSQL', 'Supabase', 'JWT', 'SendGrid'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kymanirjarrett/vigil' },
    ],
    liveUrl: 'https://vigil-three-amber.vercel.app',
    featured: true,
  },
  {
    id: 'clausify',
    title: 'Clausify',
    tagline: 'AI-Powered Legal SaaS',
    description:
      'Contract risk analysis platform using a RAG pipeline for clause-level scoring, multi-version diff tracking, and AI-generated negotiation summaries.',
    problem:
      'Legal review is slow and expensive. Clausify lets non-lawyers understand contract risk and negotiate confidently with AI-backed clause analysis.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'LangChain', 'Groq', 'pgvector', 'Supabase', 'AWS S3'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kymanirjarrett/clausify' },
    ],
    liveUrl: null,
    featured: true,
  },
  {
    id: 'bearcat-buddies',
    title: 'Bearcat Buddies Automation',
    tagline: 'Recruitment Pipeline Automation',
    description:
      'Microsoft Power Automate pipeline replacing a manual paper process: per-member QR-code attribution, automated welcome emails, and a SharePoint Excel quota dashboard.',
    problem:
      'Manual paper-based recruitment tracking created attribution gaps and bottlenecks. This pipeline made onboarding instant and fully auditable.',
    stack: ['Microsoft Power Automate', 'SharePoint', 'Excel', 'QR Code Attribution'],
    links: [],
    liveUrl: null,
    featured: false,
  },
]
