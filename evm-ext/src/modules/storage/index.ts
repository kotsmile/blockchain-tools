import type { EvmConfig } from '../../config/type'

export default (config: EvmConfig) => {
  return {
    get: config.adapter().getValue,
    set: config.adapter().setValue,
    update: config.adapter().updateValue,
  }
}

export type { Namespace, Key, Value } from './schema'
