export interface LeadershipItem {
  role: string
  org: string
  highlights: string[]
}

/** The home page shows the first four; /leadership shows all. */
export const HOME_LEADERSHIP_COUNT = 4

export const leadership: LeadershipItem[] = [
  {
    role: 'Resident Assistant',
    org: 'Resident Education & Development',
    highlights: ['Responsible for a floor of 70 residents, planning 2+ programs a month.'],
  },
  {
    role: 'Secretary',
    org: 'Bearcat Buddies Advisory Council',
    highlights: [
      "Keeps the council's records and built the recruitment and attendance automation.",
    ],
  },
  {
    role: 'Corporate Outreach Chair',
    org: 'ColorStack @ UC',
    highlights: [
      '20+ active employer relationships.',
      '10+ exclusive opportunities sourced per semester.',
      '2+ technical workshops per semester with 30+ attendance.',
    ],
  },
  {
    role: 'Programming Chair',
    org: 'United Black Student Association',
    highlights: [
      'Runs programming and event strategy, including The RoundTable, a recruiting dinner pairing members with hiring managers.',
      '4+ signature events per semester with 40+ attendance.',
    ],
  },
  {
    role: 'Secretary',
    org: 'Caribbean Coalition',
    highlights: [
      'Maintained all organizational records, meeting minutes & correspondence, and collaborated with other executive board members on event planning & coordination.',
      'Coordinated meeting logistics (scheduling, agenda preparation, and distribution of materials), improving meeting efficiency and participation.',
    ],
  },
  {
    role: 'Ambassador',
    org: 'Bearcat Buddies',
    highlights: [
      'Served as a liaison between the Bearcat Buddies program and university partners, fostering positive relationships by representing at campus events & outreach activities.',
      "Assisted in recruiting, onboarding, and training new volunteers, helping to expand the program's reach and impact in local schools.",
    ],
  },
  {
    role: 'Tutor',
    org: 'Bearcat Buddies',
    highlights: [
      'Provided one-on-one and small group academic tutoring to K-12 students in Cincinnati Public Schools, reinforcing foundational concepts in core subject areas and supporting student learning outcomes.',
      'Maintained consistent communication with program coordinators and school partners to align tutoring sessions with student academic needs and semester timelines.',
    ],
  },
]
