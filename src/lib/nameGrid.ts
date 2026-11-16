/**
 * Data for the homepage name: "KYMANI" set in a 5 × 7 bitmap font on a 53 × 7
 * grid, the size of a GitHub contribution graph (53 weeks × 7 days), plus a
 * decorative graph the cells rise into on hover.
 */

export const GRID_COLS = 53
export const GRID_ROWS = 7
export const CELL_COUNT = GRID_COLS * GRID_ROWS // 371

export type Level = 0 | 1 | 2 | 3 | 4

/** 5 × 7 glyphs (the I is 3 wide). `#` is a filled cell. */
const FONT: Record<string, readonly string[]> = {
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  I: ['###', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
}

/**
 * Lays a word out on the grid: one empty column between letters, centered.
 * Returns one string per row, `#` for a name cell and `.` for an empty one.
 */
export function layoutWord(word: string, cols = GRID_COLS): string[] {
  const glyphs = [...word.toUpperCase()].map((ch) => {
    const glyph = FONT[ch]
    if (!glyph) throw new Error(`No glyph for "${ch}"`)
    return glyph
  })
  return Array.from({ length: GRID_ROWS }, (_, row) => {
    const line = glyphs.map((g) => g[row]).join('.')
    const left = Math.floor((cols - line.length) / 2)
    return '.'.repeat(left) + line + '.'.repeat(cols - line.length - left)
  })
}

/**
 * mulberry32: a tiny seeded random number generator. The same seed always
 * yields the same sequence, so the "random" graph is identical on every visit.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A decorative contribution graph, column-major like GitHub's (index = col * 7 + row).
 * Weights lean on levels 0 and 1 with few 4s, and each week gets its own
 * busyness so the graph has the streaks and lulls of a real one. Not real data.
 */
export function generateGraph(seed: number): Level[] {
  const rand = mulberry32(seed)
  const levels: Level[] = []
  for (let col = 0; col < GRID_COLS; col++) {
    const busy = 0.35 + rand() * 0.9 // per-week activity
    for (let row = 0; row < GRID_ROWS; row++) {
      const weekend = row === 0 || row === 6 ? 0.6 : 1
      const r = rand() * busy * weekend
      levels.push(r < 0.3 ? 0 : r < 0.62 ? 1 : r < 0.8 ? 2 : r < 0.93 ? 3 : 4)
    }
  }
  return levels
}

export interface GridCell {
  col: number
  row: number
  /** Part of the name at rest. */
  name: boolean
  /** Level in the decorative graph. */
  level: Level
}

/** "KJ" in ASCII. Any fixed number works; this one gives a pleasant spread. */
export const GRAPH_SEED = 0x4b4a

/** All 371 cells, column-major, with their resting and graph states. */
export function buildCells(word = 'KYMANI', seed = GRAPH_SEED): GridCell[] {
  const layout = layoutWord(word)
  const graph = generateGraph(seed)
  const cells: GridCell[] = []
  for (let col = 0; col < GRID_COLS; col++) {
    for (let row = 0; row < GRID_ROWS; row++) {
      cells.push({ col, row, name: layout[row][col] === '#', level: graph[col * GRID_ROWS + row] })
    }
  }
  return cells
}

/** Palette for each level, matching the `level-*` Tailwind tokens. */
export const LEVEL_COLORS = ['#E8E3D6', '#A7E3C4', '#4CC38A', '#1F9A6B', '#0E6B4F'] as const
