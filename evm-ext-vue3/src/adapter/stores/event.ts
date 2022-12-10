import { defineStore } from 'pinia'
import type { modules } from 'evm-ext'

type EventState = modules.events.EventsState['event']

export const useEvent = defineStore('$event', {
  state: () =>
    <EventState>{
      listeners: [] as {
        id: number
        event: modules.events.EventType
        once: boolean
        callback: modules.events.CallbackFunction
        filters: modules.events.Filter<any>[]
      }[],
      listenerId: 1,
    },
  actions: {},
})
