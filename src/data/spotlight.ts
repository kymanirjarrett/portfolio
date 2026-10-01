export interface SpotlightTile {
  id: string
  title: string
  subtitle: string
  description: string
  href: string
  /** Button text that says exactly where the tile goes. */
  action: string
  isRoute: boolean
}

export const spotlightTiles: SpotlightTile[] = [
  {
    id: 'vigil',
    title: 'Vigil',
    subtitle: 'ETL observability platform',
    description: 'ETL observability for AWS Glue, with anomaly alerts and a full security layer.',
    href: '/projects/vigil',
    action: 'Read the case study',
    isRoute: true,
  },
  {
    id: 'clausify',
    title: 'Clausify',
    subtitle: 'AI contract analysis',
    description: 'Clause-level contract risk scoring with a RAG pipeline. In active development.',
    href: '/projects/clausify',
    action: 'Read the case study',
    isRoute: true,
  },
  {
    id: 'smucker',
    title: 'The J.M. Smucker Co.',
    subtitle: 'Software Engineer Intern',
    description:
      'Keyless OIDC deployments, a Glue job rewrite that stopped silent data corruption, and a Lambda runtime modernization.',
    href: '/experience',
    action: 'See my experience',
    isRoute: true,
  },
  {
    id: 'itsc',
    title: 'UC IT Solutions Center',
    subtitle: 'Software Engineer Intern',
    description: 'A referral platform for a Fortune 500 client with 2,000+ users.',
    href: '/experience',
    action: 'See my experience',
    isRoute: true,
  },
  {
    id: 'leadership',
    title: 'Leadership',
    subtitle: 'Campus organizations and residence life',
    description: 'ColorStack, UBSA, Bearcat Buddies, and a floor of 30 residents.',
    href: '/leadership',
    action: 'See my leadership',
    isRoute: true,
  },
  {
    id: 'bearcat',
    title: 'Bearcat Buddies',
    subtitle: 'Recruitment automation',
    description: 'A pen-and-paper recruitment process, replaced with Power Automate.',
    href: '#projects',
    action: 'See the project',
    isRoute: false,
  },
]
