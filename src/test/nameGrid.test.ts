import { describe, expect, it } from 'vitest'
import {
  buildCells,
  CELL_COUNT,
  generateGraph,
  GRAPH_SEED,
  GRID_COLS,
  layoutWord,
} from '@/lib/nameGrid'

// The approved layout from the design handoff, verbatim.
const EXPECTED = [
  '..........#...#.#...#.#...#..###..#...#.###..........',
  '..........#..#..#...#.##.##.#...#.##..#..#...........',
  '..........#.#....#.#..#.#.#.#...#.#.#.#..#...........',
  '..........##......#...#.#.#.#####.#..##..#...........',
  '..........#.#.....#...#...#.#...#.#...#..#...........',
  '..........#..#....#...#...#.#...#.#...#..#...........',
  '..........#...#...#...#...#.#...#.#...#.###..........',
]

describe('layoutWord', () => {
  it('sets KYMANI exactly as the approved 53 × 7 layout', () => {
    expect(layoutWord('KYMANI')).toEqual(EXPECTED)
  })

  it('fills a full contribution-graph grid', () => {
    const rows = layoutWord('KYMANI')
    expect(rows).toHaveLength(7)
    rows.forEach((row) => expect(row).toHaveLength(GRID_COLS))
  })
})

describe('generateGraph', () => {
  it('is the same for the same seed', () => {
    expect(generateGraph(GRAPH_SEED)).toEqual(generateGraph(GRAPH_SEED))
  })

  it('differs for a different seed', () => {
    expect(generateGraph(GRAPH_SEED)).not.toEqual(generateGraph(GRAPH_SEED + 1))
  })

  it('covers every level from 0 to 4, weighted toward the low end', () => {
    const graph = generateGraph(GRAPH_SEED)
    expect(graph).toHaveLength(CELL_COUNT)
    const counts = [0, 1, 2, 3, 4].map((level) => graph.filter((l) => l === level).length)
    counts.forEach((count) => expect(count).toBeGreaterThan(0))
    expect(counts[0] + counts[1]).toBeGreaterThan(CELL_COUNT / 2)
    expect(counts[4]).toBeLessThan(counts[1])
  })
})

describe('buildCells', () => {
  it('marks the same cells as the layout, column by column', () => {
    const cells = buildCells()
    expect(cells).toHaveLength(CELL_COUNT)
    cells.forEach(({ col, row, name }) => expect(name).toBe(EXPECTED[row][col] === '#'))
  })
})
