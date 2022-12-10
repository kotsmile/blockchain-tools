import type { EvmConfig } from '../../config/type'

export default (config: EvmConfig) => {
  return {
    get: config.plugin().getValue,
    set: config.plugin().setValue,
    update: config.plugin().updateValue,
  }
}

export type { Namespace, Key, Value } from './schema'
