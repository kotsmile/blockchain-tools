import { expect } from 'chai'

import { defineEvmConfig } from '../../config'
import state_config from '../../modules/state'
import type { Adapter } from '../../adapter'

export let testState: any = {}
export const testPlugin: Adapter = () => ({
  getValue(n, k) {
    if (!testState[n]) testState[n] = {}
    return testState[n][k] as any
  },
  setValue(n, k, v) {
    if (!testState[n]) testState[n] = {}
    return (testState[n][k] = v)
  },
  updateValue(n, k, c) {
    if (!testState[n]) testState[n] = {}
    return (testState[n][k] = c(testState[n][k]))
  },
})

const useTestEvm = defineEvmConfig({
  adapter: testPlugin,
})
const { config: testConfig } = useTestEvm()

describe('State module', () => {
  beforeEach(() => (testState = {}))
  it('should set value', () => {
    const State = state_config(testConfig)

    const n = 'hello'
    const k = 'world'
    const v = 'test'

    State.set<any, any, any>(n, k, v)

    expect(testState[n][k]).eq(v)
  })
  it('should get value', () => {
    const State = state_config(testConfig)

    const n = 'hello'
    const k = 'world'
    const v = 'test'

    testState[n] = { [k]: v }

    expect(State.get<any, any, any>(n, k)).eq(v)
  })
  it('should update value', () => {
    const State = state_config(testConfig)

    const n = 'hello'
    const k = 'world'
    const v = 'test'
    const newV = 'test2'

    testState[n] = { [k]: v }

    expect(
      State.update<any, any, any>(n, k, (old) => {
        if (old === v) return newV
        return ''
      })
    ).eq(newV)
  })
})
