import type { EvmConfig } from '../../config/type'
import { entries } from '../../utils'

import { useEvents_config } from '../events/event.storage'

import { storeLifecycles } from './type'
import { log, onLifecycle } from './utils'

export const init = async (config: EvmConfig) => {
  const { stores } = config
  if (!stores) return

  const useEvents = useEvents_config(config)
  const { addListener } = useEvents()

  for (const [name, store] of entries(stores)) {
    log(`Initiate ${name} store`)
    for (const l of storeLifecycles) addListener(l, store[onLifecycle(l)])
  }
}
