// Tiny external store: which station is active and how far through it we are.
// Hands read it every frame; React only re-renders when the station changes.
type Listener = () => void

const state = { index: 0, local: 0 }
const listeners = new Set<Listener>()

export const drive = {
  get: () => state,
  set(index: number, local: number) {
    const changed = index !== state.index
    state.index = index
    state.local = local
    if (changed) listeners.forEach((l) => l())
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
