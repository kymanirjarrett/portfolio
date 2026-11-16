import { useMemo } from 'react'
import { buildCells, GRID_COLS, LEVEL_COLORS } from '@/lib/nameGrid'
import { cn } from '@/lib/utils'

interface NameGrid2DProps {
  /** Show the contribution graph instead of the name. */
  graph: boolean
  reduced: boolean
  className?: string
}

/**
 * The flat fallback for the 3D name: the same 53 × 7 grid as HTML squares.
 * Used without WebGL and while the 3D scene loads. Colors change column by
 * column from left to right, the 2D version of the 3D blocks rising.
 */
export default function NameGrid2D({ graph, reduced, className }: NameGrid2DProps) {
  const cells = useMemo(() => buildCells(), [])

  return (
    <div
      aria-hidden="true"
      data-testid="name-grid-2d"
      data-animated={reduced ? 'false' : 'true'}
      className={cn(
        'grid grid-flow-col grid-rows-7 gap-[0.25cqw] [container-type:inline-size]',
        className
      )}
      style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
    >
      {cells.map(({ col, row, name, level }) => {
        const color = graph ? LEVEL_COLORS[level] : LEVEL_COLORS[name ? 4 : 0]
        return (
          <span
            key={`${col}-${row}`}
            className="aspect-square rounded-[18%]"
            style={{
              backgroundColor: color,
              transition: reduced ? 'none' : 'background-color 380ms cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: reduced ? undefined : `${col * 9}ms`,
            }}
          />
        )
      })}
    </div>
  )
}
