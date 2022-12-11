export { piniaStore } from './store'
export { vueAdapater } from './adapter'
export type { EvmState, EvmActions } from './store/type'

export { useEvent } from './adapter/stores/event'
export { useWallet } from './adapter/stores/wallet'

/// rewrite this like plugin for pinia or vue
export { setActivePinia } from 'pinia'
