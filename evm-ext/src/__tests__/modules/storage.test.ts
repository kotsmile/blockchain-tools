import { defineEvmConfig } from '../../config'
import storage_config from '../../modules/storage'
import type { Plugin } from '../../plugin'

export const testStorage: any = {}
export const testPlugin: Plugin = () => ({
  getValue(n, k) {
    if (!testStorage[n]) testStorage[n] = {}
    return testStorage[n][k] as any
  },
  setValue(n, k, v) {
    if (!testStorage[n]) testStorage[n] = {}
    return (testStorage[n][k] = v)
  },
  updateValue(n, k, c) {
    if (!testStorage[n]) testStorage[n] = {}
    return (testStorage[n][k] = c(testStorage[n][k]))
  },
})

// const useEvm = defineEvmConfig({
//   plugin: testPlugin,
// })
