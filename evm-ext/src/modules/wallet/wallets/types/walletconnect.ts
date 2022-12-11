import {
  ChainId,
  chainIds as allChainIds,
  extraRpcs,
  getChainDescription,
  getChainHex,
  getChainName,
  getChainScanner,
} from '../../../../utils/chain'
import type { EvmConfig } from '../../../../config/type'

import type {
  ChangeChainCallbackFunction,
  ChangeWalletCallbackFunction,
  UpdateStoreStateFunction,
} from '../base'

import { WalletHandler } from '../base'

import WalletConnectProvider from '@walletconnect/web3-provider'
import { keyOf, safe } from '../../../../utils'
import { getRpc_config } from '../../../chain/node'

export class Walletconnect extends WalletHandler {
  public appName!: string

  constructor(
    public config: EvmConfig,
    public chainIds: readonly ChainId[],
    public defaultChainId: ChainId,
    public updateStoreState: UpdateStoreStateFunction,
    public changeWalletCallback?: ChangeWalletCallbackFunction,
    public changeChainCallback?: ChangeChainCallbackFunction,
    public preventDefaultChangeWallet?: boolean,
    public preventDefaultChangeChain?: boolean
  ) {
    super(
      config,
      chainIds,
      defaultChainId,
      updateStoreState,
      changeWalletCallback,
      changeChainCallback,
      preventDefaultChangeWallet,
      preventDefaultChangeChain
    )
    const rpc = {} as { [key: number]: string }
    // for (const chainTag of keyOf(allChainIds)) rpc[allChainIds[chainTag]] = ''

    for (const chainTag of keyOf(allChainIds)) {
      const chainId =
        `${allChainIds[chainTag]}` as `${typeof allChainIds[typeof chainTag]}`

      rpc[parseInt(chainId)] = getRpc_config(config)(chainId)
    }

    console.log({ rpc })

    this.nativeProvider = new WalletConnectProvider({
      rpc,
      chainId: parseInt(defaultChainId),
      qrcode: true,
      pollingInterval: 150000,
    })
    // })
  }

  async connect(): Promise<boolean> {
    try {
      await this.nativeProvider.enable().catch(console.error)

      this.appName = this.nativeProvider.wc._peerMeta.name
      await this.updateProviderState()

      if (!this.chainId) return false

      if (
        !(this.chainIds as string[]).includes(this.chainId) &&
        !this.preventDefaultChangeChain
      ) {
        await this.switchChain(this.defaultChainId)
      }

      this.nativeProvider.once('accountsChanged', this.changeWalletHanlder?.bind(this))
      this.nativeProvider.once('chainChanged', this.changeChainHandler?.bind(this))

      const disconnectHandler = async () => {
        if (!this.actual) return
        this.updateStoreState(null, '', this.defaultChainId, false)
        this.nativeProvider.once('disconnect', async () => await disconnectHandler())
      }

      this.nativeProvider.once('disconnect', async () => await disconnectHandler())
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
    }
  }
  clear() {
    super.clear()
    this.nativeProvider.removeListener('disconnect', async () => {
      this.updateStoreState(null, '', this.defaultChainId, false)
    })
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    console.log('switch')
    if ((await this.getChainId()) === (chainId as string)) {
      console.log('here')
      return false
    }
    if (this.appName.includes('Trust Wallet')) {
      return false
    }

    console.log('Sending request to change chain')

    const [res, err] = await safe(
      this.nativeProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: getChainHex(chainId) }],
      })
    )
    if (err) {
      const errorMessage = (err as any).message.replace(/ "[^]*"/, '')
      switch (errorMessage) {
        case 'User rejected the request.':
          return false
        case 'Unrecognized chain ID. Try adding the chain using wallet_addEthereumChain first.':
          await this.addChain(chainId)
          return true
      }
    }
    return true

    // return new Promise<string>(async (resolve, reject) => {
    //   // When succesful this request throw: Response data is invalid
    //   this.nativeProvider
    //     .request({
    //       method: 'wallet_switchEthereumChain',
    //       params: [{ chainId: getChainHex(chainId) }],
    //     })
    //     .catch(async (error: any) => {
    //       const errorMessage = error.message.replace(/ "[^]*"/, '')
    //       switch (errorMessage) {
    //         case 'User rejected the request.':
    //           resolve('User rejected chain')
    //           break
    //         case 'Unrecognized chain ID. Try adding the chain using wallet_addEthereumChain first.':
    //           await this.addChain(chainId)
    //           resolve('success')
    //       }
    //     })
    //   resolve('success')
    // })
  }
  async addChain(chainId: ChainId): Promise<boolean> {
    console.log('Add chain')

    try {
      const param = {
        chainId: getChainHex(chainId),
        chainName: getChainName(chainId),
        nativeCurrency: {
          name: getChainDescription(chainId).symbol,
          symbol: getChainDescription(chainId).symbol,
          decimals: 18,
        },
        rpcUrls: [getRpc_config(this.config)(chainId)],
        blockExplorerUrls: getChainScanner(chainId) ? [getChainScanner(chainId)] : null,
      }
      const resp = await this.nativeProvider.request({
        method: 'wallet_addEthereumChain',
        params: [param],
      })
      console.log(resp)
      return true
    } catch (addError) {
      console.log(addError)
      return false
    }
  }

  async disconnect() {
    this.clear()
    await this.nativeProvider.disconnect()
    return true
  }

  async getSigner() {
    return this.provider?.getSigner() ?? null
  }

  async getAddress() {
    return (await this.getSigner())?.getAddress() ?? null
  }
}
