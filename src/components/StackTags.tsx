import { cn } from '@/lib/utils'

interface StackTagsProps {
  items: string[]
  label: string
  className?: string
}

export default function StackTags({ items, label, className }: StackTagsProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item} className="stack-tag">
          {item}
        </li>
      ))}
    </ul>
  )
}
