export interface SpotlightTile {
  id: string
  title: string
  subtitle: string
  description: string
  href: string
  isRoute: boolean
  accentColor: string
}

export const spotlightTiles: SpotlightTile[] = [
  {
    id: 'vigil',
    title: 'Vigil',
    subtitle: 'ETL Observability Platform',
    description: 'Production-grade pipeline monitoring with statistical anomaly detection and automated alerting.',
    href: '/projects/vigil',
    isRoute: true,
    accentColor: '#3B49DF',
  },
  {
    id: 'clausify',
    title: 'Clausify',
    subtitle: 'AI Legal SaaS',
    description: 'RAG-powered contract risk scoring with clause-level AI analysis and negotiation summaries.',
    href: '/projects/clausify',
    isRoute: true,
    accentColor: '#7C3AED',
  },
  {
    id: 'smucker',
    title: 'J.M. Smucker Co.',
    subtitle: 'Cloud & Data Engineering',
    description: 'Enterprise AWS ETL modernization — CloudFormation migration, CI/CD pipelines, and partner data integration.',
    href: '/experience',
    isRoute: true,
    accentColor: '#0891B2',
  },
  {
    id: 'itsc',
    title: 'ITSC',
    subtitle: 'Full-Stack Engineering',
    description: 'Fortune 500 apps built with React + Node + Postgres — 30% faster data processing, 20% faster releases.',
    href: '/experience',
    isRoute: true,
    accentColor: '#059669',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    subtitle: 'UBSA · ColorStack · RA',
    description: '20+ employer relationships, 4+ events/semester, 40+ attendance — building community and opening doors.',
    href: '/leadership',
    isRoute: true,
    accentColor: '#D97706',
  },
  {
    id: 'bearcat',
    title: 'Bearcat Buddies',
    subtitle: 'Recruitment Automation',
    description: 'Power Automate pipeline replacing paper processes — QR attribution, auto emails, SharePoint dashboards.',
    href: '#projects',
    isRoute: false,
    accentColor: '#E11D48',
  },
]
