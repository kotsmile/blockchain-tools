import type { modules } from 'evm-ext'

export type EvmState = {
  loading: boolean
}

export type EvmActions = Partial<
  Record<
    modules.store.OnStoreLifecycle<modules.store.StoreLifecycle>,
    modules.store.StoreLifecycleCallback
  >
>
