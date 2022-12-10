import type { plugin } from 'evm-ext'

import { useEvent } from './stores/event'

const stores = {
  event: useEvent,
}

export const vuePlugin: plugin.Plugin = () => ({
  getValue(n, k) {
    return stores[n]()[k]
  },
  setValue(n, k, v) {
    return (stores[n]()[k] = v)
  },
  updateValue(n, k, c) {
    return (stores[n]()[k] = c(stores[n]()[k]))
  },
})
