import type { EvmConfig } from '../../config/type'
import type { ISigner } from '../../utils'
import type { ChainId } from '../../utils/chain'

import type { WalletType, WalletHandler } from './wallets/base'

import state_module from '../state'
import { wallets } from './wallets'
import { useEvents_config } from '../events/event.state'

export type WalletState = {
  wallet: {
    wallet: string
    signer: () => ISigner
    chainId: ChainId
    realChainId: ChainId | null
    chainIds: ChainId[]
    DEFAULT_CHAINID: string
    login: boolean
    loading: boolean
    walletType: WalletType | null
    walletHandler: () => WalletHandler | null
  }
}

const THIS = (config: EvmConfig) => useWallet_config(config)()

export const useWallet_config = (config: EvmConfig) => {
  return () => ({
    async updateStoreState(
      signer: ISigner,
      wallet: string | null,
      chainId: string | null,
      login = true
    ) {
      if (!wallet || !chainId) return
      const { set, update } = state_module(config)

      // if (this.preserveConnection) setPreservedConnection(this.walletType, login)

      set('wallet', 'signer', () => signer ?? null)
      set('wallet', 'wallet', wallet)
      set('wallet', 'realChainId', chainId as ChainId)

      // if (this.chainIds.includes(chainId as ChainId)) this.chainId = chainId as ChainId
      // else useEvent().emit('errorChainId', { chainId })

      set('wallet', 'login', login)
    },
    async connect(
      walletType: WalletType | null,
      init = false,
      chainId?: ChainId,
      privateKey?: string
    ) {
      if (!walletType) {
        //   await this.loadAll({ init: true })
        return
      }

      const useEvents = useEvents_config(config)

      console.log(THIS(config).updateStoreState)
      const { set, update, get } = state_module(config)

      get('wallet', 'walletHandler')()?.clear()

      const walletHandler = new wallets[walletType](
        config.chainIds,
        get('wallet', 'chainId'),
        THIS(config).updateStoreState,
        (wallet) => {
          useEvents().emit('onWalletChange', { wallet })
          // if (storeSettings.options?.updateOnWalletChange) this.loadAll({ login: true })
        },
        (chainId) => {
          useEvents().emit('onChainChange', { chainId, natural: true })
          // if (storeSettings.options?.updateOnChainChange)
          //   this.loadAll({ init: true, login: true })
        },
        true, // TODO
        true // TODO
        // storeSettings.options?.preventDefaultChangeWallet,
        // storeSettings.options?.preventDefaultChangeChain
      )

      set('wallet', 'walletType', walletType)

      // if (this.walletType === 'native') {
      //   ;(this.walletHandler as Native).initPrivateKey(privateKey ?? '')
      // }

      if (!(await walletHandler?.connect())) return

      update('wallet', 'chainId', (oldChainId) => chainId ?? config.DEFAULT_CHAINID)
      // await this.loadAll({ init, login: true })
    },
  })
}
