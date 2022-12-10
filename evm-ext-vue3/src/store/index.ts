import type { EvmState, EvmActions } from './type'
import type { modules } from 'evm-ext'
import { log } from '../utils'

export const piniaStore = (useStorePromise: Promise<() => EvmState & EvmActions>) => {
  return new Proxy({} as modules.store.StoreDefinition, {
    get: (_, key: keyof modules.store.StoreDefinition) => {
      return async () => {
        log(`Trigger pinia store ${key}`)

        const store = (await useStorePromise)()
        if (key === 'isLoading') return store.loading

        const response = store[key]?.()
        return response ?? true
      }
    },
  })
}
