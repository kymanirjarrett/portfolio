import '@testing-library/jest-dom'
import { afterEach } from 'vitest'

/**
 * jsdom has no IntersectionObserver. This stand-in records every observer so a
 * test can decide what is "on screen" with `setAllIntersecting`.
 */
class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds = [0]
  private elements = new Set<Element>()

  constructor(private callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this)
  }

  observe(el: Element) {
    this.elements.add(el)
  }
  unobserve(el: Element) {
    this.elements.delete(el)
  }
  disconnect() {
    this.elements.clear()
  }
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  trigger(isIntersecting: boolean) {
    const entries = [...this.elements].map(
      (target) =>
        ({
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
        }) as IntersectionObserverEntry
    )
    if (entries.length) this.callback(entries, this)
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver

export function setAllIntersecting(isIntersecting: boolean) {
  MockIntersectionObserver.instances.forEach((o) => o.trigger(isIntersecting))
}

afterEach(() => {
  MockIntersectionObserver.instances = []
})
