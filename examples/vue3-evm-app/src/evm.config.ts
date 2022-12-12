import { defineEvmConfig, modules, utils } from 'evm-ext'
import { vueAdapater, piniaStore } from 'evm-ext-vue3'

import contractsJSON from '@/contracts/contracts.json'
import type { Token } from '@/contracts/typechain'

const { contractType } = modules.contracts

export const useEvm = defineEvmConfig({
  contractsJSON,
  chainIds: ['97'],
  DEFAULT_CHAINID: '97',
  rpc: utils.rpc.universalRpc(),
  contracts: {
    shared: {
      token: {
        name: 'Token',
        type: contractType<Token>(),
      },
    },
    on: {},
  },
  stores: {
    token: piniaStore(import('@/store/contracts/token.evm').then((_) => _.useToken)),
  },
  adapter: vueAdapater,
})
