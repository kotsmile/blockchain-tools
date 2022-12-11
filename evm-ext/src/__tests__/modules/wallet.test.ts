import { expect } from 'chai'

import { defineEvmConfig } from '../../config'

import state_config from '../../modules/state'
import type { State } from '../../modules/state'

import type { Adapter } from '../../adapter'
import { useWallet_config } from '../../modules/wallet/wallet.state'

export let testState: any = {
  wallet: {},
  event: {},
}

export const testAdapter: Adapter = () => ({
  state: <any>{
    wallet: new Proxy({} as State['wallet'], {
      get: (_, k: keyof State['wallet']) => testState.wallet[k],
      set: (_, k: keyof State['wallet'], v: string) => {
        testState.wallet[k] = v
        return true
      },
    }),
    event: new Proxy({} as State['event'], {
      get: (_, k: keyof State['event']) => testState.event[k],
      set: (_, k: keyof State['event'], v: string) => {
        testState.event[k] = v
        return true
      },
    }),
  },
})

const useTestEvm = defineEvmConfig({
  adapter: testAdapter,
})
const { config: testConfig, init } = useTestEvm()

describe('Wallet State', () => {
  it('should connect with walletconnect', async () => {
    await init()

    const useWallet = useWallet_config(testConfig)
    const { connect } = useWallet()

    // await connect('walletconnect')
  })
})
