import type {
  ContractsJSONStruct,
  ContractsDefinition,
  AppChainIds,
} from '../modules/contracts/type'
import type { StoresDefinition } from '../modules/store/type'
import type { EvmConfig } from './type'

import contractsModule from '../modules/contracts'
import eventModule from '../modules/events'
import chainModule from '../modules/chain'

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
    config,
    ...contractsModule(config),
    ...eventModule(config),
    ...chainModule(config),
  })
}
