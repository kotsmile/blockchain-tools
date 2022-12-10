import type {
  ContractsJSONStruct,
  ContractsDefinition,
  AppChainIds,
} from '../modules/contracts/type'
import type { StoresDefinition } from '../modules/store/type'
import type { EvmConfig } from './type'

import contracts_module, { init as initContracts } from '../modules/contracts'
import events_module, { init as initEvents } from '../modules/events'
import chain_module, { init as initChain } from '../modules/chain'
import store_module, { init as initStore } from '../modules/store'

export const defineEvmConfig = <
  ContractsJSON extends ContractsJSONStruct,
  ChainIds extends AppChainIds<ContractsJSON>,
  DefaultChainId extends ChainIds[number],
  Contracts extends ContractsDefinition<ContractsJSON, ChainIds[number]>,
  Stores extends StoresDefinition
>(
  config: EvmConfig<ContractsJSON, ChainIds, DefaultChainId, Contracts, Stores>
) => {
  return () => ({
    init: () => {
      initContracts(config)
      initStore(config)
      initEvents(config)
      initChain(config)
    },
    config,
    ...contracts_module(config),
    ...events_module(config),
    ...chain_module(config),
    ...store_module(config),
  })
}
