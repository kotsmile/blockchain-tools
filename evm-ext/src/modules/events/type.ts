import { capitalize } from '../../utils'
import type { StoreLifecycle } from '../store'

export type CallbackFunction = (...args: any) => any

export type RawEvents = {
  onChainChange: { args: { chainId: string; natural: boolean } }
  onWalletChange: { args: { wallet: string } }
  errorChainId: { args: { chainId: string } }
  contractTransaction: { args: { signature: string; params: any } }
  custom: { args: { name: string; args: any } }
} & {
  [key in StoreLifecycle]: { args: {} }
}

export type BeforeEvent<E extends string> = `before${Capitalize<E>}`
export type AfterEvent<E extends string> = `after${Capitalize<E>}`

export type Events = {
  [E in keyof RawEvents as E | BeforeEvent<E> | AfterEvent<E>]: RawEvents[E]
}

export type RawEventType = keyof RawEvents
export type EventType = keyof Events
export type Filter<Event extends EventType> = (args: Events[Event]['args']) => boolean

export function toBeforeEvent<E extends RawEventType>(event: E) {
  return `before${capitalize(event)}` as `before${Capitalize<E>}`
}

export function toAfterEvent<E extends RawEventType>(event: E) {
  return `after${capitalize(event)}` as `after${Capitalize<E>}`
}
