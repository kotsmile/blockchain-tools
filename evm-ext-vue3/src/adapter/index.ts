import type { adapter } from 'evm-ext'

import { useEvent } from './stores/event'
import { useWallet } from './stores/wallet'

const stores = {
  event: useEvent,
  wallet: useWallet,
}

export const vueAdapater: adapter.Adapter = () => ({
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
