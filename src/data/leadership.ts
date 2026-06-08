export interface LeadershipItem {
  role: string
  org: string
  highlights: string[]
}

export const leadership: LeadershipItem[] = [
  {
    role: 'Programming Chair',
    org: 'United Black Student Association (UBSA)',
    highlights: [
      'Owns programming and event strategy for the organization.',
      'Hosts "The RoundTable" — a recruiting dinner pairing members with hiring managers.',
      '4+ signature events per semester, 40+ average attendance.',
    ],
  },
  {
    role: 'Corporate Outreach Chair',
    org: 'ColorStack @ UC',
    highlights: [
      '20+ active employer relationships maintained.',
      '10+ exclusive opportunities sourced per semester.',
      '2+ technical workshops per semester with 30+ attendance.',
    ],
  },
  {
    role: 'Secretary',
    org: 'Bearcat Buddies Advisory Council',
    highlights: [
      'Responsible for records and authored Semester Reset & Maintenance Guide for operational continuity.',
      'Built the Power Automate recruitment automation pipeline replacing manual paper processes.',
    ],
  },
  {
    role: 'Resident Assistant',
    org: 'Resident Education & Development, University of Cincinnati',
    highlights: [
      'Supports community building and student welfare in residential halls.',
    ],
  },
]
