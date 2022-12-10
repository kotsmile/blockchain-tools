import { expect } from 'chai'

import { defineEvmConfig } from '../../config'
import storage_config from '../../modules/storage'
import type { Adapter } from '../../adapter'

export let testStorage: any = {}
export const testPlugin: Adapter = () => ({
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

const useTestEvm = defineEvmConfig({
  adapter: testPlugin,
})
const { config: testConfig } = useTestEvm()

describe('Storage module', () => {
  beforeEach(() => (testStorage = {}))
  it('should set value', () => {
    const storage = storage_config(testConfig)

    const n = 'hello'
    const k = 'world'
    const v = 'test'

    storage.set<any, any, any>(n, k, v)

    expect(testStorage[n][k]).eq(v)
  })
  it('should get value', () => {
    const storage = storage_config(testConfig)

    const n = 'hello'
    const k = 'world'
    const v = 'test'

    testStorage[n] = { [k]: v }

    expect(storage.get<any, any, any>(n, k)).eq(v)
  })
  it('should update value', () => {
    const storage = storage_config(testConfig)

    const n = 'hello'
    const k = 'world'
    const v = 'test'
    const newV = 'test2'

    testStorage[n] = { [k]: v }

    expect(
      storage.update<any, any, any>(n, k, (old) => {
        if (old === v) return newV
        return ''
      })
    ).eq(newV)
  })
})
