/**
 * The KJ pixel mark: a mirrored K sharing its spine with a J, drawn on the same
 * 7-row grid as a contribution graph. Built from the bitmap instead of a static
 * SVG file so it inherits the current text color.
 */
const MARK = [
  '##...##..',
  '.##..##..',
  '..##.##..',
  '...####..',
  '..##.##..',
  '.##..##.#',
  '##...####',
]

const CELL = 8.5
const PITCH = 10
const WIDTH = (MARK[0].length - 1) * PITCH + CELL
const HEIGHT = (MARK.length - 1) * PITCH + CELL

interface PixelMarkProps {
  /** Also draw the empty cells faintly, so the mark reads as a patch of graph. */
  grid?: boolean
  className?: string
}

export default function PixelMark({ grid = false, className }: PixelMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {MARK.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === '#' || grid ? (
            <rect
              key={`${x}-${y}`}
              x={x * PITCH}
              y={y * PITCH}
              width={CELL}
              height={CELL}
              rx={1.8}
              opacity={cell === '#' ? undefined : 0.12}
            />
          ) : null
        )
      )}
    </svg>
  )
}
