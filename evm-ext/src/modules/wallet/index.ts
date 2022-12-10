import type { EvmConfig } from '../../config/type'

import { useWallet_config } from './wallet.state'
export type { WalletState } from './wallet.state'

export { init } from './init'

export default (config: EvmConfig) => {
  return {
    useWallet: useWallet_config(config),
  }
}

export type {
  ChangeChainCallbackFunction,
  ChangeWalletCallbackFunction,
  ConnectFunction,
  UpdateStoreStateFunction,
  WalletHandler,
  WalletType,
} from './wallets/base'
