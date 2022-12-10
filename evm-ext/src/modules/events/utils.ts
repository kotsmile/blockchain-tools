import { capitalize, concat } from '../../utils'
import type { Events, EventType, RawEventType } from './type'

const MODULE_LABEL = '[Event Module]'

export const log = (message: string) => {
  console.log(
    `%c${MODULE_LABEL} ${message}`,
    `
      color: white; 
      background: #B11B1B; 
      font-weight: bold;
    `
  )
}

export const emitMsg = <Event extends EventType>(
  event: Event,
  args: Events[Event]['args'],
  amount: number
) => {
  console.log(
    `%c${MODULE_LABEL} ${event} x${amount}`,
    `
      color: white; 
      background: #B11B1B; 
      font-weight: bold;
    `
  )
}

export const toBeforeEvent = <E extends RawEventType>(event: E) =>
  concat('before', capitalize(event))
export const toAfterEvent = <E extends RawEventType>(event: E) =>
  concat('after', capitalize(event))
