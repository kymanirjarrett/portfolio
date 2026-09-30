import {
  siAngular,
  siApachespark,
  siDocker,
  siDotnet,
  siExpress,
  siFastapi,
  siGithub,
  siGithubactions,
  siJavascript,
  siLangchain,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons'
import { awsLogo, azureLogo } from '@/lib/deviconLogos'

export interface SphereLogo {
  name: string
  /** SVG path data, drawn in a single color. */
  path: string
  viewBox: string
}

const SIMPLE_ICONS_VIEWBOX = '0 0 24 24'

function simple(name: string, icon: { path: string }): SphereLogo {
  return { name, path: icon.path, viewBox: SIMPLE_ICONS_VIEWBOX }
}

// Logos are bundled from the simple-icons package instead of fetched from
// cdn.simpleicons.org, so a renamed or removed slug fails the build instead of
// silently disappearing from the sphere.
export const sphereLogos: SphereLogo[] = [
  simple('Python', siPython),
  simple('TypeScript', siTypescript),
  simple('JavaScript', siJavascript),
  simple('Java', siOpenjdk),
  simple('Spring Boot', siSpringboot),
  simple('React', siReact),
  simple('Angular', siAngular),
  simple('Vite', siVite),
  simple('Node.js', siNodedotjs),
  simple('Express', siExpress),
  simple('FastAPI', siFastapi),
  simple('.NET', siDotnet),
  { name: 'AWS', ...awsLogo },
  { name: 'Azure', ...azureLogo },
  simple('Apache Spark', siApachespark),
  simple('PostgreSQL', siPostgresql),
  simple('MySQL', siMysql),
  simple('Supabase', siSupabase),
  simple('LangChain', siLangchain),
  simple('Docker', siDocker),
  simple('GitHub', siGithub),
  simple('GitHub Actions', siGithubactions),
  simple('Tailwind CSS', siTailwindcss),
]
