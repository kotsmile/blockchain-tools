import type { adapter } from 'evm-ext'

import { useEvent } from './stores/event'
import { useWallet } from './stores/wallet'

export const vueAdapater: adapter.Adapter = () => ({
  state: {
    event: useEvent(),
    wallet: useWallet(),
  },
})
