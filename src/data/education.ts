export interface Degree {
  name: string
  track?: string
}

export interface Education {
  school: string
  url: string
  degrees: Degree[]
  graduation: string
  gpa: string
  /** Semesters on the Dean's List, oldest first. */
  deansList: string[]
}

export const education: Education = {
  school: 'University of Cincinnati',
  url: 'https://www.uc.edu',
  degrees: [
    { name: 'B.Sc. in Information Technology', track: 'Software Application Development' },
    { name: 'B.Sc. in Cybersecurity' },
  ],
  graduation: 'May 2028',
  gpa: '3.7',
  deansList: ['Fall 2024', 'Summer 2025', 'Spring 2026', 'Fall 2026'],
}
