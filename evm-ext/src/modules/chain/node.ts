import { providers } from 'ethers'

import type { ChainId } from '../../utils/chain'
import { getChainTag } from '../../utils/chain'

import type { EvmConfig } from '../../config/type'

export const getRpc_config = <C extends EvmConfig>(config: C) => {
  return (chainId: ChainId) => config.rpc(getChainTag(chainId))
}

export const getProvider_config = <C extends EvmConfig>(config: C) => {
  return (chainId: ChainId) =>
    new providers.JsonRpcProvider(getRpc_config(config)(chainId))
}
