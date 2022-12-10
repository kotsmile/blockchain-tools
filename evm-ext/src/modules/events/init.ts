import type { EvmConfig } from '../../config/type'

import state_module from '../state'

export const init = async (config: EvmConfig) => {
  const { update, set } = state_module(config)

  // initiate state
  set('event', 'listenerId', 1)
  update('event', 'listeners', () => [])
}
