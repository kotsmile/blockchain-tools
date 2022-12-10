import { defineStore } from 'pinia'
import type { modules, utils } from 'evm-ext'

type WalletState = modules.wallet.WalletState['wallet']

export const useWallet = defineStore('$wallet', {
  state: () =>
    <WalletState>{
      wallet: '',
      signer: (() => null) as () => utils.ISigner,
      chainId: '' as utils.chain.ChainId,
      realChainId: null as string | null,
      chainIds: [] as utils.chain.ChainId[],
      DEFAULT_CHAINID: '' as utils.chain.ChainId,
      preserveConnection: true,
      login: false,
      loading: false,
      walletType: null as modules.wallet.WalletType | null,
      walletHandler: (() => null) as () => modules.wallet.WalletHandler | null,
    },
  actions: {},
})
