import type { EvmConfig } from '../../config/type'

export default (config: EvmConfig) => {
  type Funcs = ReturnType<typeof config['plugin']>
  return {
    get: config.plugin().getValue,
    set: config.plugin().setValue,
    update: config.plugin().updateValue,
  }
}

export type { Namespace, Key, Value } from './schema'
