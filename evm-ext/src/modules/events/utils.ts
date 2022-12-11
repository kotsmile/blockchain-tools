import { capitalize, concat, generateLog } from '../../utils'
import type { Events, EventType, RawEventType } from './type'

export const { log, warn, error } = generateLog('[Events Module]', '#B11B1B')

export const emitMsg = <Event extends EventType>(
  event: Event,
  args: Events[Event]['args'],
  amount: number
) => log(`Emit ${event} x${amount}`)

export const toBeforeEvent = <E extends RawEventType>(event: E) =>
  concat('before', capitalize(event))
export const toAfterEvent = <E extends RawEventType>(event: E) =>
  concat('after', capitalize(event))
