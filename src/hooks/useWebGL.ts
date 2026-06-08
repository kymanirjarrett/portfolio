import { useEffect, useState } from 'react'

export function useWebGL(): boolean {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
      setSupported(!!ctx)
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
