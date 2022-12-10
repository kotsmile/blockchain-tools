import type { adapter } from 'evm-ext'

import { useEvent } from './stores/event'
import { useWallet } from './stores/wallet'

const stores = {
  event: useEvent,
  wallet: useWallet,
}

export const vueAdapater: adapter.Adapter = () => ({
  getValue(n, k) {
    // console.log('[get]', n, k)
    // @ts-ignore
    return stores[n]()[k]
  },
  setValue(n, k, v) {
    // console.log('[set]', n, k, v)
    return (stores[n]()[k] = v)
  },
  updateValue(n, k, c) {
    // console.log('[update]', n, k, c(stores[n]()[k]))
    return (stores[n]()[k] = c(stores[n]()[k]))
  },
})
