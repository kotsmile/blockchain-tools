import type { adapter } from 'evm-ext'

import { useEvents } from './stores/events'
import { useWallet } from './stores/wallet'

export const vueAdapater: adapter.Adapter = () => ({
  state: {
    events: useEvents(),
    wallet: useWallet(),
  },
})
