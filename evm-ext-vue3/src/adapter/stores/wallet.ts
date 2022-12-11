import { defineStore } from 'pinia'
import type { modules } from 'evm-ext'

type WalletState = modules.wallet.WalletState['wallet']

export const useWallet = defineStore<'$wallet', WalletState>('$wallet', {
  state: () => ({
    wallet: '',
    signer: () => null,
    chainId: '1',
    realChainId: null,
    chainIds: [],
    DEFAULT_CHAINID: '1',
    preserveConnection: true,
    login: false,
    loading: false,
    walletType: null,
    walletHandler: () => null,
  }),
})
