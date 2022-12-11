import type { EvmConfig } from '../../config/type'

import state_module from '../state'

export const init = async (config: EvmConfig) => {
  const state = state_module(config)

  // initiate state
  state.event.listenerId = 1
  state.event.listeners = []
}
