import type { EvmConfig } from '../../config/type'
import { useEvents_config } from './event.storage'

export default (config: EvmConfig) => {
  return {
    useEvents: useEvents_config(config),
  }
}

export type { Storage } from './event.storage'
export type {
  AfterEvent,
  BeforeEvent,
  CallbackFunction,
  EventType,
  Events,
  Filter,
  RawEventType,
  RawEvents,
} from './type'
export { toAfterEvent, toBeforeEvent } from './utils'
