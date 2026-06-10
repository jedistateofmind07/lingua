import '@testing-library/jest-dom'

// This jsdom build doesn't provide localStorage; add a minimal in-memory shim so
// zustand's persist middleware works in tests (real browsers have it).
if (globalThis.localStorage == null) {
  const store = new Map<string, string>()
  const mock: Storage = {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => {
      store.set(key, String(value))
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size
    }
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: mock,
    writable: true,
    configurable: true
  })
}
