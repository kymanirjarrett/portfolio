export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function fibonacci3D(count: number): [number, number, number][] {
  const points: [number, number, number][] = []
  const phi = Math.PI * (Math.sqrt(5) - 1)
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i
    points.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius])
  }
  return points
}
