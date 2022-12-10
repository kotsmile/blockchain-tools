import type {
  ContractsJSONStruct,
  ContractsDefinition,
  AppChainIds,
} from '../modules/contracts/type'
import type { StoresDefinition } from '../modules/store/type'
import type { EvmConfig } from './type'

import contractsModule, { init as initContracts } from '../modules/contracts'
import eventsModule, { init as initEvents } from '../modules/events'
import chainModule, { init as initChain } from '../modules/chain'
import storeModule, { init as initStore } from '../modules/store'

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
    ...contractsModule(config),
    ...eventsModule(config),
    ...chainModule(config),
    ...storeModule(config),
  })
}
