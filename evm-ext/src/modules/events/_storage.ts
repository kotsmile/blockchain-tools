import type { CallbackFunction, EventType, Filter } from './type'

export type Storage = {
  event: {
    listeners: {
      id: number
      event: EventType
      once: boolean
      callback: CallbackFunction
      filters: Filter<any>[]
    }[]
    listenerId: number
  }
}
