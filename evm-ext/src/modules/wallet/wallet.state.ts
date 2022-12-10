import type { ISigner } from '../../utils'
import type { ChainId } from '../../utils/chain'

import type { WalletType, WalletHandler } from './wallets/base'

export type WalletState = {
  wallet: {
    wallet: string
    signer: ISigner
    chainId: ChainId
    realChainId: ChainId | null
    chainIds: ChainId[]
    DEFAULT_CHAINID: string
    login: boolean
    loading: boolean
    walletType: WalletType | null
    walletHandler: WalletHandler | null
  }
}
