import { EvmConfig } from '../../config/type'

import { entries } from '../../utils/tools'

export default (config: EvmConfig) => {
  return {
    init: async () => {
      // init event object
      // subscribe stores on events
      // trigger event 'onLogin'

      const stores = config.stores
      for (const [name, store] of entries(stores)) {
        console.log('init', name)
        await store.onInit()
      }
    },
  }
}
