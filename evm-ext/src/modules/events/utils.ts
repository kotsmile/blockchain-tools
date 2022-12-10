import { capitalize } from '../../utils'
import type { Events, EventType, RawEventType } from './type'

const MODULE_LABEL = '[Event Module]'

export const log = (message: string) => {
  console.log(
    `%c[Event Module] ${message}`,
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
    `%c${MODULE_LABEL}`,
    `%c${event} x${amount}`,
    `
      color: black;
      background: white;
      font-weight: bold;
    `,
    `
      color: white; 
      background: #B11B1B; 
      font-weight: bold;
    `
  )
}

export function toBeforeEvent<E extends RawEventType>(event: E) {
  return `before${capitalize(event)}` as `before${Capitalize<E>}`
}

export function toAfterEvent<E extends RawEventType>(event: E) {
  return `after${capitalize(event)}` as `after${Capitalize<E>}`
}
