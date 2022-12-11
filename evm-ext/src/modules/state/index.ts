import type { EvmConfig } from '../../config/type'

export default (config: EvmConfig) => {
  return config.adapterr().state
}

export type { State, Namespace, Key, Value } from './schema'
