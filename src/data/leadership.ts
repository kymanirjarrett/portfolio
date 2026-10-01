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
    highlights: [
      'Responsible for a floor of 30 residents, planning and coordinating several community engagements per month.',
    ],
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
      '4+ signature events per semester with 100+ attendees each, reaching up to 300 for major events like Akwaaba.',
    ],
  },
  {
    role: 'Lead Tutor',
    org: 'Bearcat Buddies',
    highlights: [
      'Primary point of contact for a tutor group, serving as the liaison between tutors and the Center for Community Engagement.',
      'Introduces a new tutoring strategy each week, checks in with tutors after every session, and follows up with anyone who is absent.',
      'Manages session materials and sign-in sheets, and passes tutor feedback back to the Center for Community Engagement.',
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
]
