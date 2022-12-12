export { piniaStore } from './store'
export { vueAdapater } from './adapter'
export type { EvmState, EvmActions } from './store/type'

export { useEvents } from './adapter/stores/events'
export { useWallet } from './adapter/stores/wallet'

/// rewrite this like plugin for pinia or vue
export { setActivePinia } from 'pinia'
