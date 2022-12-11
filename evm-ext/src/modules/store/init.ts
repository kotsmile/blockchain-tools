import type { EvmConfig } from '../../config/type'
import { entries } from '../../utils'

import { useEvents_config } from '../events/event.state'

import { storeLifecycles } from './type'
import { log, onLifecycle } from './utils'

export const init = async (config: EvmConfig) => {
  const { stores } = config
  if (!stores) return

  const useEvents = useEvents_config(config)
  const { addListener, addListenerOnce } = useEvents()

  for (const [name, store] of entries(stores)) {
    log(`Initiate ${name} store`)
    for (const lifecycle of storeLifecycles) {
      if (lifecycle === 'init') addListenerOnce(lifecycle, store[onLifecycle(lifecycle)])
      else addListener(lifecycle, store[onLifecycle(lifecycle)])
    }
  }

  log('Initiated')
}
